"use server"
import  { connectToDB } from "@/lib/utils/db/connectToDB"
import { Post } from "@/lib/models/post";

export async function addPost(formData) {

  const modulename = "***** SERVERACTIONS # ";
  const { title, markdownArticle} = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newPost = new Post({
      title, 
      markdownArticle,
      // slug: null
    })
    const savedPost = await newPost.save();    
    return { success: true, slug: newPost.slug }
  }
  catch(err) {
    console.log(`${modulename} Error during post creation: ${err}`);
    throw new Error(err.message || "Error during post creation")
  }
}
