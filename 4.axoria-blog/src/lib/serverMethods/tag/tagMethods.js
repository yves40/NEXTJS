import { Tag } from "@/lib/models/tag";
import slugify from "slugify";

export async function findOrCreateTag(tagName) {

  const tagSlug = slugify(tagName, { lower: true, strict: true});
  const tag = await Tag.findOne({slug: tagSlug}); // Tag already exists ? 
  if(!tag) {  // exists ? 
    tag = await Tag.create({ name: tagName, slug: tagSlug });
  }
  return tag._id;
} 
