"use server"

import mongoose from "mongoose";
import slugify from "slugify";

const modulename = "***** MODELS # ";
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  markdownArticle: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
},
{timestamps: true})

console.log(`${modulename} Post instanciated`);

postSchema.pre("save", async function (next) { 
  console.log(`${modulename} Check the slug`);  
  if(!this.slug) {  // slug passed by caller ?     
    let slugCandidate = slugify(this.title, { lower: true, strict:true, replacement: '_' });
    let slugExists = await Post.findOne({slug: slugCandidate}).exec();
    let counter = 1;  // Verify no collision with existing slug
    while(slugExists) {
      slugCandidate = `${slugCandidate}-${counter}`;
      slugExists = await Post.findOne({slug: slugCandidate}).exec();  // Recheck
      counter++;
    }
    this.slug = slugCandidate;
  }
  next(); // Now save the post by going to the next step
})

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);