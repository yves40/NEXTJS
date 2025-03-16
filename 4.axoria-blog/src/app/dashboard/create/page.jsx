"use client"

import { addPost } from "@/lib/serverActions/blog/postServerActions"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function () {

  const modulename = "***** BLOG # ";
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const serverValidationText = useRef(null);
  const router = useRouter();

  // -----------------------------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("tags", JSON.stringify(tags))  // To handle post creation without any tag !
                                                // post model now contains a tags array property
    serverValidationText.current.textContent = ""; // Reset message
    submitButtonRef.current.textContent = 'Saving post ...';
    submitButtonRef.current.disabled = true;  // Post sent, button is inactive
    try {
      const result = await addPost(formData);
      if(result.success) {
        submitButtonRef.current.textContent = 'Post saved ✅';
        let countdown = 3;
        serverValidationText.current.textContent = `Redirecting ${countdown}...`;
        const interval = setInterval(() => {
          countdown -= 1;
          serverValidationText.current.textContent = `Redirecting ${countdown}...`;
          if(countdown === 0) {
            clearInterval(interval);
            router.push(`/article/${result.slug}`); // In case of success route to display the article
          }
        }, 1000);
      }
    } 
    catch(error) {
      submitButtonRef.current.textContent = 'Submit';
      serverValidationText.current.textContent = `${error.message}`;
      submitButtonRef.current.disabled = false;
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
         py-3 px-4 rounded border-none mb-4" ref={submitButtonRef}>
          Submit
        </button>
        <p ref={serverValidationText}></p>
      </form>
    </main>
  )
}
