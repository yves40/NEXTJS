"use client"  // Must be specified to use WEB apis on client

import { useEffect, useRef, useState } from "react"
import { getPost } from "@/lib/serveraction"

function page() {

  const [inputValue, setInputValue] = useState("")
  const [status, setStatus] = useState('Paused')
  const [postindex, setPostIndex] = useState(1);
  const [postMessage, setPostMessage] = useState('');
  const msgref = useRef();
  
  // Track message call
  useEffect( () => {
    console.log('useEffect triggered');
  }, [postindex])
  
  async function handleGetArticle() {
    setStatus('Requesting')
    const post = await getPost(postindex);
    setStatus(`Done : got post with ID ${post.id}`);
    setPostIndex(postindex + 1);
    setPostMessage(post.title);
    // 1st method to update the message title : getElementById
    const mshandle = document.getElementById('msgid');
    mshandle.classList.remove('hidden');
    // 2nd method : just use useRef() ;-)
    msgref.current.classList.remove('hidden');
    msgref.current.style.color = 'red';
  }

  return (
    <div className=" m-10">
      <input type="text" className="border border-gray-600 mb-2 p-2" 
          value={inputValue}
          onChange={ e => setInputValue(e.target.value)}
          placeholder="Entrez du texte"/>
      <p>Tu as écrit ! {inputValue}</p>
      <button className=" bg-green-400 border-none rounded-2xl my-3 p-2 text-white"
       onClick={handleGetArticle}>Get Article</button>
       <p>Status : {status} </p>
       <p id="msgid" className="hidden">Post title : {postMessage}</p>
       <p ref={msgref} className="hidden">Post title : {postMessage}</p>
    </div>
  )
}

export default page