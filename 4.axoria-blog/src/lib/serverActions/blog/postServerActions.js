"use server"
import  { connectToDB } from "@/lib/utils/db/connectToDB"
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import slugify from "slugify";
import { marked  } from "marked";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";  // Used to sanitize the markdwon
import Prism, { highlight } from "prismjs"
import { markedHighlight } from "marked-highlight";
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import AppError from "@/lib/utils/errorHandling/customError";
import { sessionInfo } from "@/lib/serverMethods/session/sessionMethods";
import sharp from "sharp";
import crypto from "crypto";
import { writeFile, unlink } from "fs/promises";
import path from "path";

// This code is used to cleanup HTML from potential XSS attacks
// As it is executed on the server side, the first step is to create a DOM onto which 
// cleaning will take place.
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);  
const imgMaxWidth = 4200;
const imgMaxHeight = 2800;
const imgMinWidth = 128;
const imgMinHeight = 128;

const modulename = "***** SERVERACTIONS # ";
const DEBUGTAG = "***** DEBUG #";

export async function addPost(formData) { 
  
  const { title, markdownArticle, tags, imageFile} = Object.fromEntries(formData);
  const uploadPath = path.join(process.cwd(), "/public/blogimages/");

  try {
    
    // Some back end controls !!!
    
    if(typeof title !== 'string' || title.trim().length < 3) {
      throw new AppError('Provide a title please');
    }
    if(typeof markdownArticle !== 'string' || markdownArticle.trim().length === 0) {
      throw new AppError('Markdown is not optional');
    }
    await connectToDB();
    const session = await sessionInfo();
    console.log(session);
    
    if(!session.success) {
      throw new AppError('Authentication required');
    }
    // Manage image upload
    // 1st check image characteristics if transmitted    
    let uniqueFilename = '';    
    
    if(!(imageFile instanceof File)) {
      throw new AppError('Invalid image data');
    }

    console.log(`${modulename} the file candidate for upload: ${imageFile.name} / ${imageFile.name.length}`);
    
    if(imageFile.name !== 'undefined') {    // Any file chosen ? 
      const validImagesTypes = [ "image/jpeg", "image/png", "image/webp", "image/jpg"];
      if(!validImagesTypes.includes(imageFile.type)) {
        throw new AppError('Supported images types are png, jpg, jpeg, webp');
      }
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const { width, height } = await sharp(imageBuffer).metadata();
      if(width > imgMaxWidth || height > imgMaxHeight) {
        throw new AppError('Image too big');
      }
      if(width < imgMinWidth || height < imgMinHeight) {
        throw new AppError('Image too small');
      }
      uniqueFilename = `${crypto.randomUUID()}_${imageFile.name}`;  // Build a unique file name      
      // And for webp lib, check here : https://www.npmjs.com/package/webp-converter
      // Check https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it
      try {
        const thepath = path.join( uploadPath, uniqueFilename);
        await writeFile(thepath, imageBuffer);
      }
      catch(error) {
        console.log(error.message);
        throw new AppError(`Unable to write the image file !!!`);
      }      
    }
    // Manage TAGS
    if(typeof tags !== 'string') {
      throw new AppError('Invalid data');
    }
    // Manage optional tags : if any they are passed as a JSON string
    const tagNamesArray = JSON.parse(tags);
    if(!Array.isArray(tagNamesArray)) {
      throw new AppError('tags must be a valid array');
    }

    // Promise.all() is used to wait for all Promises to finish
    // as the create() are started with parallelism
    const tagIds = await Promise.all(tagNamesArray.map(async (tagName) => {
      const normalizedTagName = tagName.trim().toLowerCase();
      let tag = await Tag.findOne({ name: normalizedTagName});  // Tag exists ? 
      if(!tag) {
        // No, create it
        tag = await Tag.create( { name: normalizedTagName, slug: slugify(normalizedTagName, { strict: true})});
      }
      return tag._id;
    }))

    // Manage the markdown content
    // Add code highlighting is any code in the markedownArticle content
    // Support html css and js.
    // Uses Prismjs libs
    marked.use(
      markedHighlight({
        highlight: (code, language) => {
          const validLanguage = Prism.languages[language] ? language : 'plaintext';
          return Prism.highlight(code, Prism.languages[validLanguage], validLanguage)
        }
      })
    )
    // Transforms the markdown into HTML syntax 
    let markdownHTMLResult = marked(markdownArticle);
    // Proceed to sanitization of the content ( XSS attacks )
    // To test create an article with this content in the markdown: 
    // <img src="x" onerror="alert('XSS')" style="display: none;"/>
    // after commenting the sanitize() line...
    markdownHTMLResult = DOMPurify.sanitize(markdownHTMLResult);
    // Save the post now
    const newPost = new Post({
      title, 
      markdownArticle,
      markdownHTMLResult,
      tags: tagIds,
      imageFile: uniqueFilename,
      author: session.userId
    })
    const savedPost = await newPost.save();    
    console.log(`${DEBUGTAG} Object saved ${JSON.stringify(newPost)}`);
    return { success: true, slug: newPost.slug }
  }
  catch(error) {
    console.log(`Error while creating the post ${error}`);
    if(error instanceof AppError) {
      throw error;      // Send this application error to the caller
    }
    throw new Error('An error occured while creating the post'); // Send a generic message for any non App error
  }
}

export async function deletePost(id) {

  const uploadPath = path.join(process.cwd(), "/public/blogimages/");

  console.log(`${modulename} deleting post with ID : ${id}`);

  try {
    await connectToDB();
    const user = await sessionInfo();
    if(!user) {
      throw new AppError('Authentication required');
    }
    const post = await Post.findById(id);
    if(!post) {
      throw new AppError(`Unable to delete post with ID : ${id} : NOT FOUND`);
    }
    await Post.findByIdAndDelete(id);
    // Don't forget to delete associated image if any
    if(post.imageFile.length !== 0) {
      const thepath = path.join( uploadPath, post.imageFile);
      await unlink(thepath, (error) => {
        throw new AppError(`Unable to delete the local image file !!!`);  
      });
      console.log(`${modulename} deleted associated file : ${post.imageFile}`);
    }
    return { success: true }
  }
  catch(error) {
    console.log(`Error while deleting the post ${error}`);
    if(error instanceof AppError) {
      throw error;      // Send this application error to the caller
    }
    throw new Error('An error occured while deleting the post'); // Send a generic message for any non App error
  }
}
