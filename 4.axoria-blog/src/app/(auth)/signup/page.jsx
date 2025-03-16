"use client"

import React, { useRef } from 'react'
import Link from 'next/link';

export default function page() {

    const pseudo = useRef('pseudo');
    const email = useRef('email');
    const password = useRef('password');
    const confpassword = useRef('confpassword');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Now registering');
        const formData = new FormData(e.target);
        const formdataObj = Object.fromEntries(formData);
        console.log(JSON.stringify(formdataObj));
        
    }

    return (
        <div className='u-main-container u-padding-content-container 
                    flex flex-col mx-auto text-center background-slate-500'>
            <h1 className=' text-lg mb-10'>Sign Up</h1>
            <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
                    m-4 p-4'>
                <form onSubmit={handleSubmit}>
                    <label className='f-label' htmlFor="pseudo">Pseudo</label>
                    <input className='f-auth-input' type="text" name="pseudo" id="pseudo" ref={pseudo} placeholder='Choose a pseudo'/>
                    <label className='f-label' htmlFor="email">E-mail</label>
                    <input className='f-auth-input' type="text" name="email" id="email" ref={email} placeholder='Your contact email'/>
                    <label className='f-label' htmlFor="password">Password</label>
                    <input className='f-auth-input' type="password" name="password" id="password" ref={password} placeholder='Your password'/>
                    <label className='f-label' htmlFor="confpassword">Confirm password</label>
                    <input className='f-auth-input' type="password" name="confpassword" id="confpassword" ref={confpassword} placeholder='Confirrm password'/>
                    <button className='w-full bg-blue-500 hover:bg-blue-800 text-white mt-6 rounded-lg border p-4'>Submit</button>
                </form>
            </div>
            <Link href={"/signin"} className=' mt-6 text-blue-500 underline'>Already have an account ? Log In</Link>
        </div>
    )
}
