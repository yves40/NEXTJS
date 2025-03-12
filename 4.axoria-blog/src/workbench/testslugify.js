import slugify from "slugify";

const slugCandidates = [
  "Un", "Deux", "Trois", "Mercredi",
  "Un chapeau", "Ce truc ne marche pas du tout"
]


slugCandidates.map(slug => {
  let newslug = slugify(slug, { lower: true, strict:true, replacement: '_' });
  console.log(`New slug is : ${newslug}`);
})