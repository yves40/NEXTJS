"use server"

export async function getImage() {

  const cat = await fetch('https://cataas.com/cat');
  return cat;

}