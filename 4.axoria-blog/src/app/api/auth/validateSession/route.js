// Routes exposées au middleware. 
// Car le middleware dans nextJS n'a pas accès directement aux routes de nodeJS
import { cookies } from "next/headers";
import { Session } from "@/lib/models/session";
import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    
    const sessionId = cookieStore.get("sessionId")?.value;
    if(!sessionId) {
      return NextResponse.json({authorized: false, status:401});
    }
    
    await connectToDB();
    const session = await Session.findOne({ userId: sessionId });
    if(!session || session.expiresAt < new Date()) {
      return NextResponse.json({authorized: false, status:401});
    }
    const user = await User.findById(session.userId);
    if(!user) {
      return NextResponse.json({authorized: false, status:401});
    }
    return NextResponse.json({authorized: true, userId: user._id.toString()});
  }
  catch(error) {
    // console.log("Error while validating session", error);
    return NextResponse.json({authorized: false}, {status:500});
  }
}
