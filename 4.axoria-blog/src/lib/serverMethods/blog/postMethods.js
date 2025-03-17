import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";

const modulename = "POST #";

export async function getPost(slug) {
    try 
    {
        // await connectToDB();
        console.log(`${modulename} Getting details for post ${slug}`);
        const post = await Post.findOne({slug});
        return post.populate({
            path: "tags",
            select: "name slug"
        });
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

