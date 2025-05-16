"use client"

import { useRef } from "react";
import Link from 'next/link';
import { login } from "@/lib/serverActions/session/sessionServerAction";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";

export default function page() {
  const {setIsAuthenticated} = useAuth();
  const userName = useRef('');
  const password = useRef('');
  const submitButton = useRef('');
  const serverInfo = useRef('');
  const router = useRouter();

  async function handleSubmit(e) {
      e.preventDefault();
      // const formData = new FormData(e.target);
      // const formdataObj = Object.fromEntries(formData);
      // console.log(JSON.stringify(formdataObj));
      serverInfo.current.textContent = "";
      submitButton.current.disabled = true;

      try {
        const result = await login(new FormData(e.target));
        if(result.success) {
          setIsAuthenticated({ loading: false, isConnected: true, userId: result.userId, userName: result.userName});
          router.push('/');
        }
      }
      catch(error) {
        console.error(error.message);
        submitButton.current.disabled = false;
        serverInfo.current.textContent = error.message;
      }
  }
      
      
  return (
    <div className='u-main-container u-padding-content-container 
      flex flex-col mx-auto text-center background-slate-500'>
      <h1 className='mb-10 text-2xl'>Sign In</h1>
      <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
          m-4 p-4'>
      <form onSubmit={handleSubmit}>
          <label className='f-label' htmlFor="userName">Name</label>
          <input className='f-auth-input' type="text" name="userName" id="userName" ref={userName} placeholder='Name or Pseudo'/>
          <label className='f-label' htmlFor="password">Password</label>
          <input className='f-auth-input' type="password" name="password" id="password" ref={password} placeholder='Your password'/>
          <button className='w-full bg-blue-500 hover:bg-blue-800 text-white mt-6 rounded-lg border p-4'
          ref={submitButton}>Submit</button>
      </form>
      </div>
    <p ref={serverInfo} className=' text-center my-4'>Status</p>
    <Link href={"/signup"} className=' mt-6 text-blue-500 underline'>Need an account ? Register</Link>
  </div>
)
}
