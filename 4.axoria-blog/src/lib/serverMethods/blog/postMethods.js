import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import { notFound } from "next/navigation";

const modulename = "POST #";

export async function getPost(slug) {
        await connectToDB();
        const post = await Post.findOne({slug});
        if(!post) return notFound();

        return post.populate({
            path: "tags",
            select: "name slug"
        });
}
export async function getPosts() {
        await connectToDB();
        const posts = await Post.find();
        return posts;    
}

