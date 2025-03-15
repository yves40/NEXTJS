"use client"

import { addPost } from "@/lib/serverActions/blog/postServerActions"
import { useState, useRef } from "react";

export default function () {

  const modulename = "***** BLOG # ";
  const [tags, setTags] = useState(["css", "javascript"]);
  const tagInputRef = useRef(null);
  // -----------------------------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // for(const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    try {
      const result = await addPost(formData);
      console.log(`${modulename}${result.success} : created with slug ${result.slug}`);
    } 
    catch(error) {
      console.log(`${modulename} post not created : ${error}`);
    }
    
  }
  // -----------------------------------------------------------------------------------
  function handleAddTag(e) {
    e.preventDefault();
    const newtag = tagInputRef.current.value.trim().toLowerCase();  // Check tag uniqueness
    if(newtag !== "" && !tags.includes(newtag) && tags.length <= 4){
      setTags([...tags, newtag]);
      tagInputRef.current.value = "";
    }

  }
  // -----------------------------------------------------------------------------------
  function handleRemoveTag(tagToRemove) {
    setTags(tags.filter( tag => tag !== tagToRemove));
  }
  // -----------------------------------------------------------------------------------
  function handleEnterOnTagInput(e) {
    if(e.key === "Enter") {
      e.preventDefault();
      handleAddTag(e);
    }
  }


  return (
    <main className='u-main-container bg-white p-7 mt-32 mb-44'>
      <h1 className=' text-4xl mb-4'>Write an article ✏️</h1>
      <form action="" onSubmit={handleSubmit} className=' mb-6'>
        <label htmlFor="title" className='f-label'>Title</label>
        <input type="text" name="title" className=" shadow border rounded w-full p-3 mb-7 text-gray-700
        focus:outline-slate-400" 
          id="title" required placeholder="Your article title"/>
        {/* Tags */}
        <div className=" mb-10">
          <label htmlFor="tag" className="f-label">Add a tag(s) (optional, max 5)</label>
          <div className="flex">
            <input type="text" className=" shadow border rounded p-3 text-gray-700 focus:outline-slate-400"
              id="tag" placeholder="Add a tag" ref={tagInputRef} onKeyDown={handleEnterOnTagInput}/>
            <button className=" bg-indigo-500 text-white font-bold p-4 rounded mx-4"
              onClick={handleAddTag} type="button"
              >Add</button>
            <div className=" flex items-center grow whitespace-nowrap overflow-y-auto shadow border rounded px-3">
              {tags.map((tag) => (
                <span key={tag} className=" inline-block whitespace-nowrap bg-gray-200 text-gray-700
                 rounded-full px-3 py-1 text-sm font-semibold mr-2">{tag} 
                  <button className=" text-red-500 ml-2" type="button" onClick={ () => handleRemoveTag(tag)}>&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <label htmlFor="markdownArticle" className="f-label">
          Write your article. Use markdown to get a smart view for users</label>
        <a className="block mb-4 text-blue-600" target="_blank" href="https://www.markdownguide.org/cheat-sheet/">
          How to use markdown syntax ?</a>
        <textarea name="markdownArticle" id="markdownArticle" 
          className=" min-h-44 text-xl shadow appearance-none border rounded w-full p-8
         text-gray-700 mb-4 focus:outline-slate-400"></textarea>
        <button className=" min-w-44 bg-indigo-500 hover:bg-indigo-700 text-white font-bold
         py-3 px-4 rounded border-none mb-4">
          Submit
        </button>
      </form>
    </main>
  )
}
