import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import { notFound } from "next/navigation";

const modulename = "POST #";

export async function getPost(slug) {
        await connectToDB();
        const post = await Post.findOne({slug});
        if(!post) return notFound();

        return await Post.findOne({slug})
                .populate({
                        path: "tags",
                        select: "name slug"
                })
                .populate({
                        path: "author",
                        select: "userName normalizedUserName"
                });
}
export async function getPosts() {
        await connectToDB();
        const posts = await Post.find();
        return posts;    
}

export async function getUserPost(userId) {
        await connectToDB();
        const posts = await Post.find({author: userId}).select("title _id slug");
        return posts;    
}

