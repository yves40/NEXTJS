"use server"

export async function getImage() {

  const cat = await fetch('https://cataas.com/cat');
  return cat;

}

export async function getPosts() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await resp.json();
  return posts;
}

export async function getPost(id) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await resp.json();
  return post;
}