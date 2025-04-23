import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Tag } from "@/lib/models/tag";

export async function getTags() {
  await connectToDB();
  // Seems to be pure mogoose stuff...the aggregate function
  // Get all tags documents associated to at leat 1 post
  const tags = await Tag.aggregate([
    {
      // Jointure Tag - Posts
      $lookup: {
        from: "posts",
        foreignField: "tags",
        localField: "_id",
        as: "postsWithTag"
      }
    },
    {
      // Add the retrieved property to the Tag object
      $addFields: {
        postCount: {$size: "$postsWithTag"}
      }
    },
    {
      // Do not get tags without post
      $match: { postCount: {$gt: 0}}
    },
    // Sort the result
    {
      $sort: { postCount: -1 }
    },
    {
      // Remove unwanted property for UI
      $project: { postsWithTag: 0 }
    }
  ]);  
  return tags;
}