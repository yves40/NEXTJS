
// This function compares 2 tags array, one from UI, one from DB
export function areTagsSimilar(userTagsArray, DBTagsArray) {
  
  if(userTagsArray.length !== DBTagsArray.length) return false;
  const sortedUserTagsArray = [...userTagsArray].sort();
  const sortedDBTagsArray = DBTagsArray.map(tag => tag.name).sort();

  return sortedUserTagsArray.every((tag,i) => tag === sortedDBTagsArray[i]);

}

export async function generateUniqueSlug(title) {
  let slugCandidate = slugify(title, { lower: true, strict:true, replacement: '_' });
  let slugExists = await Post.findOne({slug: slugCandidate}).exec();
  let counter = 1;  // Verify no collision with existing slug
  while(slugExists) {
    slugCandidate = `${slugCandidate}-${counter}`;
    slugExists = await Post.findOne({slug: slugCandidate}).exec();  // Recheck
    counter++;
  }
  return slugCandidate;
}