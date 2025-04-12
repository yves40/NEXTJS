"use server"

import { cookies } from "next/headers";
import { Session } from "../../models/session";
import { User } from "../../models/user";
import { connectToDB } from "../../utils/db/connectToDB";

const modulename = "SECURITY # ";

export async function sessionInfo() {

    const cookieStore = await cookies();
    const userCookieId = cookieStore.get("sessionId")?.value;

    if (!userCookieId) {  // No cookie yet !
        console.log(`${modulename} user KO : Navigator sessionCookie`);      
        return { success: false };
    }
    await connectToDB();
    // Check the user session in the DB
    console.log(`${modulename} Search user with ID ${userCookieId} in DB `);      
    const session = await Session.findOne({ userId: userCookieId });
    console.log(`${modulename} ${session ? session.userId : 'No user session in DB'}`);          
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
        return { success: true, userId: user._id.toString(), 
            userName: user.UserName,
            NormalizedUserName: user.normalizedUserName
         };
    }
}