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
import { areTagsSimilar, generateUniqueSlug } from "@/lib/utils/general/utils";
import { findOrCreateTag } from "@/lib/serverMethods/tag/tagMethods";
import { revalidatePath } from "next/cache";
 
// This code is used to cleanup HTML from potential XSS attacks
// As it is executed on the server side, the first step is to create a DOM onto which 
// cleaning will take place.
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);  
const imgMaxWidth = 4200;
const imgMaxHeight = 2800;
const imgMinWidth = 128;
const imgMinHeight = 128;
const uploadPath = path.join(process.cwd(), "/public/blogimages/");

const modulename = "***** postServerActions ##### ";
const DEBUGTAG = "***** DEBUG #";

export async function addPost(formData) { 
  
  const { title, markdownArticle, tags, imageFile } = Object.fromEntries(formData);

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
    
    if(!session.success) {
      throw new AppError('Authentication required');
    }
    // Manage image upload
    // 1st check image characteristics if transmitted    
    let uniqueFilename = '';    
    if(!(imageFile instanceof File)) {
      throw new AppError('Invalid image data');
    }    
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
        const tagSlug = slugify(normalizedTagName, { lower: true, strict: true});
        tag = await Tag.create( { name: normalizedTagName, slug: tagSlug});
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

export async function updatePost(formData) {
  
  const { postToUpdateStringified, title, markdownArticle, imageFile, tags, currentImageFile} = Object.fromEntries(formData);
  const postToUpdate = JSON.parse(postToUpdateStringified);

  try {
    await connectToDB();
    const session = await sessionInfo();
    if(!session.success) {
      throw new Error();
    }
    // Backend check procedure
    const updatedData = {};
    // Title
    if(typeof title !== "string") throw new Error();
    if(title.trim() !== postToUpdate.title) {
      updatedData.title = title;
      updatedData.slug = await generateUniqueSlug(title);
    }
    // Article
    if(markdownArticle.trim() !== postToUpdate.markdownArticle) {
      updatedData.markdownHTMLResult = DOMPurify.sanitize(marked(markdownArticle));
      updatedData.markdownArticle = markdownArticle;
    }
    // Image
    if(typeof imageFile !== "object") throw new Error();
    if(imageFile.name !== "undefined") { // user changed the image file (possibly selecting the same one) ?
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
      // Ok for all image checks : Delete previous imgae file and add the new one
      if(postToUpdate.imageFile.length !== 0) {
        const thepath = path.join( uploadPath, currentImageFile);
        await unlink(thepath, (error) => {
          throw new AppError(`Unable to delete the previous image file !!!`);  
        });
        console.log(`${modulename} deleted previous file : ${currentImageFile}`);
      }
      let uniqueFilename = '';    
      uniqueFilename = `${crypto.randomUUID()}_${imageFile.name}`;  // Build a unique file name      
      try {
        const thepath = path.join( uploadPath, uniqueFilename);
        await writeFile(thepath, imageBuffer);
      }
      catch(error) {
        console.log(error.message);
        throw new AppError(`Unable to write the new image file !!!`);
      }      
      updatedData.imageFile = uniqueFilename;      
    }
    // tags
    if(typeof tags !== 'string') throw new Error();
    const tagsNamesArray = JSON.parse(tags);  // Convert to js array
    if(!Array.isArray(tagsNamesArray)) throw new Error();
    // Now check for any change in tags
    if(!areTagsSimilar(tagsNamesArray, postToUpdate.tags)) {
      let tagIds = await Promise.all(tagsNamesArray.map(tag => findOrCreateTag(tag)));
      updatedData.tags = tagIds;
    }
    // Final update 
    if(Object.keys(updatedData).length === 0) throw new Error();
    const updatedPost = await Post.findOneAndUpdate(postToUpdate, updatedData, { new: true });
    revalidatePath(`/article/${postToUpdate.slug}`);  // Cleanup nextJS cache 

    return { success: true, slug: updatedPost.slug};
  }
  catch(error) {
    console.log(`Error while updating the post ${error}`);
    if(error instanceof AppError) {
      throw error;
    }
    throw new Error('An error occured while updating the post'); 
  }
}
