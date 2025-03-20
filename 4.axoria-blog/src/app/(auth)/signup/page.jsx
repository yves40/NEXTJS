"use client"

import React, { useRef } from 'react'
import Link from 'next/link';
import { register } from '@/lib/serverActions/session/sessionServerAction';
import { useRouter } from "next/navigation";

export default function page() {

    const userName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const confpassword = useRef('');
    const submitButton = useRef('');
    const serverInfo = useRef('');
    const router = useRouter();
    

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formdataObj = Object.fromEntries(formData);
        console.log(JSON.stringify(formdataObj));
        serverInfo.current.textContent = ""
        submitButton.current.disabled = true;   // No multiple server request when one is running
        try {
            const result = await register(new FormData(e.target));            
            submitButton.current.textContent = 'User saved ✅';
            let countdown = 3;
            serverInfo.current.textContent = `Redirecting ${countdown}...`;
            const interval = setInterval(() => {
                countdown -= 1;
                serverInfo.current.textContent = `Redirecting ${countdown}...`;
                if(countdown === 0) {
                clearInterval(interval);
                router.push(`/signin`); // In case of success route to login page
                }
            }, 1000);        
        }
        catch(error) {
            submitButton.current.textContent = 'Submit';
            submitButton.current.disabled = false;
            console.log(error);            
            serverInfo.current.textContent = error.message;
        }
    }

    return (
        <div className='u-main-container u-padding-content-container 
                    flex flex-col mx-auto text-center background-slate-500'>
            <h1 className='mb-10 text-2xl'>Sign Up</h1>
            <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
                    m-4 p-4'>
                <form onSubmit={handleSubmit}>
                    <label className='f-label' htmlFor="userName">Name</label>
                    <input className='f-auth-input' type="text" name="userName" id="userName" ref={userName} placeholder='Name or Pseudo'/>
                    <label className='f-label' htmlFor="email">E-mail</label>
                    <input className='f-auth-input' type="text" name="email" id="email" ref={email} placeholder='Your contact email'/>
                    <label className='f-label' htmlFor="password">Password</label>
                    <input className='f-auth-input' type="password" name="password" id="password" ref={password} placeholder='Your password'/>
                    <label className='f-label' htmlFor="confpassword">Confirm password</label>
                    <input className='f-auth-input' type="password" name="confpassword" id="confpassword" ref={confpassword} placeholder='Confirrm password'/>
                    <button className='w-full bg-blue-500 hover:bg-blue-800 text-white mt-6 rounded-lg border p-4'
                     ref={submitButton}>Submit</button>
                </form>
            </div>
            <p ref={serverInfo} className=' text-center my-4'>Status</p>
            <Link href={"/signin"} className=' mt-6 text-blue-500 underline'>Already have an account ? Log In</Link>
        </div>
    )
}
