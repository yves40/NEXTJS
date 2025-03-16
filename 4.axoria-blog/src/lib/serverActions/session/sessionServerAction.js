"use server"

import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import slugify from "slugify";
import bcrypt from 'bcryptjs';

export async function register(formData) {
    const { userName, email, password, confpassword } = Object.fromEntries(formData);
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

    try {
        if(userName < 3) {
            // throw new Error("Pseudo too short, at least 3 characters");
            return { success: false, message: 'User name too short, at least 3 characters' };
        }
        const validEmail = emailregex.test(email);
        if(!validEmail) {
            // throw new Error("Invalid email");
            return { success: false, message: 'Invalid email' };
        }
        if(password < 6) {
            // throw new Error("password must have at least 6 characters");
            return { success: false, message: 'password must have at least 6 characters' };
        }
        if(password !== confpassword) {
            // throw new Error("password and confirm password must be the same");
            return { success: false, message: 'password and confirm password must be the same' };
        }
    
        connectToDB();
        const user = await User.findOne({userName});
        if(user) {
            // throw new Error("User already exists, sory !");
            return { success: false, message: 'User already exists' };
        }
        const normalizedUserName = slugify(userName, {lower:true,strict:true});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            userName,
            normalizedUserName,
            email,
            password: hashedPassword
        })
        await newUser.save();
        console.log(`saved user to DB : ${JSON.stringify(newUser)}`);
        return { success: true };
    }
    catch(error) {
        throw new Error(error.message || 'An error occured while registering the user')
    }

}