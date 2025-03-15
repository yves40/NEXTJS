"use server"
import  { connectToDB } from "@/lib/utils/db/connectToDB"
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import slugify from "slugify";

export async function addPost(formData) { 

  const modulename = "***** SERVERACTIONS # ";
  const { title, markdownArticle, tags} = Object.fromEntries(formData);

  try {
    await connectToDB();
    // Manage optional tags : if any they are passed as a JSON string
    const tagNamesArray = JSON.parse(tags);
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
    
    const newPost = new Post({
      title, 
      markdownArticle,
      tags: tagIds
    })
    console.log(`***************** Object saved ${JSON.stringify(newPost)}`);
    const savedPost = await newPost.save();    
    return { success: true, slug: newPost.slug }
  }
  catch(err) {
    console.log(`${modulename} Error during post creation: ${err}`);
    throw new Error(err.message || "Error during post creation")
  }
}
