"use client"

import { addPost } from "@/lib/serverActions/blog/postServerActions"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { areTagsSimilar } from "@/lib/utils/general/utils";

export default function ClientEditForm({post}) {

  const modulename = "***** BLOG # ";
  const [tags, setTags] = useState(post.tags.map(tag => tag.name));
  const tagInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const serverValidationText = useRef(null);
  const imgUploadStatus = useRef(null);
  const router = useRouter();
  const imgMaxWidth = 4200;
  const imgMaxHeight = 2800;
  const imgMinWidth = 128;
  const imgMinHeight = 128;

  // -----------------------------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);    
    const readableFormData = Object.fromEntries(formData);  
    const areSametags = areTagsSimilar(tags, post.tags); // tags modifications detection
    if(readableFormData.imageFile.size === 0 && readableFormData.title.trim() === post.title
                                              && readableFormData.markdownArticle.trim() === post.markdownArticle
                                            && areSametags) {
      serverValidationText.current.textContent = "Make a change on the article before submitting";
      return;
    }
    else {
      serverValidationText.current.textContent = "";
      return;
    }

    formData.set("tags", JSON.stringify(tags))  // To handle post creation without any tag !
                                                // post model now contains a tags array property
    formData.set("slug", post.slug);
    // Some UI reset
    serverValidationText.current.textContent = ""; // Reset message
    submitButtonRef.current.textContent = 'Updating post ...';
    submitButtonRef.current.disabled = true;  // Post sent, button is inactive

    try {
      const result = await addPost(formData);
      if(result.success) {
        submitButtonRef.current.textContent = 'Post updated ✅';
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

  function handleFileChange(e) {
    const file = e.target.files[0]; // Mono file selector, so get the 1st one
    const validImagesTypes = [ "image/jpeg", "image/png", "image/webp", "image/jpg"];
    if(!validImagesTypes.includes(file.type)) {
      imgUploadStatus.current.textContent = 'Supported images types are png, jpg, jpeg, webp';
      e.target.value = "";  // Discard chosen image file
      return;
    }
    else {
      imgUploadStatus.current.textContent = ""; // reset in case a previous error occured      
    }
    // Now check image max size
    const img = new Image();
    img.addEventListener("load", checkImageSize);
    // ------------------------------------------------------------------------
    function checkImageSize() {
      if (img.width > imgMaxWidth || img.height > imgMaxHeight) {
        e.target.value = "";
        URL.revokeObjectURL(img.src); // Tell the browser to discard this file
        imgUploadStatus.current.textContent = `Image too big : ${img.width} / ${img.height}`;
        return;
      }
      if (img.width < imgMinWidth || img.height < imgMinHeight) {
        e.target.value = "";
        URL.revokeObjectURL(img.src); // Tell the browser to discard this file
        imgUploadStatus.current.textContent = `Image too small : ${img.width} / ${img.height}`;
        return;
      }
      imgUploadStatus.current.textContent = '';
      URL.revokeObjectURL(img.src); // Tell the browser to discard this file
    }
    // ------------------------------------------------------------------------
    img.src = URL.createObjectURL(file); // Now load the image
  }


  return (
    <main className='u-main-container bg-white p-7 mt-32 mb-44'>
      <h1 className=' text-4xl mb-4'>Edit that article ✏️</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className=' pb-6'>
        <label htmlFor="title" className='f-label'>Title</label>        
        <input 
          type="text" 
          name="title" 
          className=" shadow border rounded w-full p-3 mb-7 text-gray-700 focus:outline-slate-400" 
          id="title" 
          required 
          placeholder="Your article title"
          defaultValue={post.title}/>
        { /* the article image */ }
        <label htmlFor="imageFile" className="f-label">
          <span>Cover image {imgMaxWidth} x {imgMaxHeight} Max : {imgMinWidth} x {imgMinHeight} Max</span>
          <span className="block font-normal">{post.imageFile.length === 0 ? 'No image' : `Image file : ${post.imageFile}` }</span>
        </label>
        <input 
          name="imageFile"
          className=" shadow cursor-pointer border rounded w-full p-3
           text-gray-700 mb-2 focus:outline-none focus:shadow-outline"
          type="file" 
          id="imageFile" 
          placeholder="Upload your article image"
          onChange={handleFileChange}
        />
        <p className=" mb-7 text-red-700" ref={imgUploadStatus}></p>
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
        <textarea 
          name="markdownArticle" 
          id="markdownArticle" 
          className=" min-h-44 text-xl shadow appearance-none border rounded w-full p-8 text-gray-700 mb-4 focus:outline-slate-400"
          defaultValue={post.markdownArticle}>
        </textarea>
        <button className=" min-w-44 bg-indigo-500 hover:bg-indigo-700 text-white font-bold
         py-3 px-4 rounded border-none mb-4" ref={submitButtonRef}>
          Submit
        </button>
        <p ref={serverValidationText}></p>
      </form>
    </main>
  )
}
