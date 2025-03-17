"use server"

import { cookies } from "next/headers";
import { Session } from "../models/session";
import { User } from "../models/user";
import { connectToDB } from "../utils/db/connectToDB";

const modulename = "SECURITY # ";

export async function sessionInfo() {

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
        console.log(`${modulename} user KO : Navigator sessionCookie`);      
        return { success: false };
    }
    await connectToDB();
    // Check the session
    console.log(`${modulename} Search for this user session in DB : ${sessionId}`);      
    const session = await Session.findById(sessionId);
    if(!session || session.expiresAt < new Date()) { // Inexistent or expired session ?
        console.log(`${modulename} user KO : DB sessionCookie`);      
        return { success: false };
    }
    // Check the user tied to this session
    const user = await User.findById(session.userId);
    if(!user) {
        console.log(`${modulename} user KO : DB user not found`);      
        return { success: false };
    }
    else {
        console.log(`${modulename} user OK`);      
        return { success: true, userId: user._id.toString() };
    }
}