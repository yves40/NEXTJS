"use server"

import { User } from "@/lib/models/user";
import { Session } from "@/lib/models/session";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import slugify from "slugify";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";


const modulename = "SECURITY # ";

// -----------------------------------------------------------------------------------------
// Register
// -----------------------------------------------------------------------------------------
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
        console.log(`${modulename} saved user to DB : ${JSON.stringify(newUser)}`);
        return { success: true };
    }
    catch(error) {
        throw new Error(error.message || 'An error occured while registering the user')
    }
}
// -----------------------------------------------------------------------------------------
// Login
// -----------------------------------------------------------------------------------------
export async function login(formData) {

    const { userName, password } = Object.fromEntries(formData);
    const DBExpirationDelay = 1 * 24 * 60 * 60 * 1000;  // One day expiration date for DBSession (msec )
    const CookieExpirationDelay = 1 * 24 * 60 * 60;              // One day expiration date for Cookie (sec)
    try {
        await connectToDB();
        const user = await User.findOne({ userName: userName });
        if(!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordOK = await bcrypt.compare(password, user.password);
        if(!isPasswordOK) {
            throw new Error('Invalid credentials');
        }
        // User authenticated. Create a session and a cookie or update an existing session
        // for this user ( in the DB )
        console.log(`${modulename} search a session with userId : ${user._id}`);        
        let session;
        const existingSession = await Session.findOne({
            userId: user._id,
            expiresAt: { $gt : new Date()} // Check the expire date of the existing session is not expired
        })
        console.log(`${modulename} Existing session ${existingSession ? existingSession._id : 'New session created'}`);       
        if(existingSession) {   // Update the existing session
            console.log(`${modulename} Updating existing session in Mongo for user ${user.userName}`);            
            session = await Session.findOneAndUpdate({ 
                userId: user._id,
                expiresAt: new Date(Date.now() + DBExpirationDelay)
            });
        }
        else {
            console.log(`${modulename} Creating a session in Mongo for user ${user.userName}`);            
            session = new Session( { 
                userId: user._id,
                expiresAt: new Date(Date.now() + DBExpirationDelay)
            })
            await session.save();   // Push to mongo
        }
        console.log(`${modulename} Set cookie for ${user.userName}`);            
        const cookieStore = await cookies();
        cookieStore.set('sessionId', session.userId.toString(), { 
            httpOnly: true, // No JS access
            secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
            path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
            maxAge: CookieExpirationDelay,   // One day persistence
            sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
        });
        return { success: true };
    }
    catch(error) {
        console.log('Error while login');
        throw new Error(error.message);        
    }
}