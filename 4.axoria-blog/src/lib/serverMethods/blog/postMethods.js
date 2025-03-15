import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";

export async function getPost(slug) {
    try 
    {
        await connectToDB();
        const post = await Post.findOne({slug}).populate({
            path: "tags",
            select: "name slug"
        });
        return post;
    }
    catch(error){
        console.log(`Error fetching the post ${slug}`, error);
        throw new Error(`Error fetching the post ${slug}`)
        
    }   
}
export async function getPosts() {
    try 
    {
        await connectToDB();
        const posts = await Post.find();
        return posts;
    }
    catch(error){
        console.log(`Error fetching all posts `, error);
        throw new Error(`Error fetching all posts ${slug}`)
        
    }   
    
}

