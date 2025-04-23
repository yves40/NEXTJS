import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import { User } from "@/lib/models/user";
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
export async function getPostsByTag(tag) {
        await connectToDB();
        const thetag = await Tag.findOne({slug: tag});
        if(!thetag) {      // Got a problem here
                notFound();
        }
        const posts = await Post.find({ tags: thetag._id})
        .populate({
                path: "author",
                select: "userName"
        })
        .select("title imageFile slug createdAt")
        .sort({createdAt: -1});
        return posts;
}


export async function getPostsByAuthor(normalizedUserName) {
        await connectToDB();
        const author = await User.findOne({normalizedUserName});
        if(!author) {      // Got a problem here
                notFound();
        }
        const posts = await Post.find({ author: author._id})
        .populate({
                path: "author",
                select: "userName normalizedUserName"
        })
        .select("title imageFile slug createdAt")
        .sort({createdAt: -1});
        return {author, posts};
}
