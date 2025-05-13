import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  
  const authCheckUrl = new URL(`${req.nextUrl.origin}/api/auth/validateSession`, req.url);
  const authResponse = await fetch(authCheckUrl, 
    {
      headers: {
        cookie: (await cookies()).toString()
      },
      cache: "force-cache",
      next: { tags: ["auth-session"]}
    }
  );
  const { authorized } = await authResponse.json();
  console.log('********************* MIDDLEWARE',  authorized);
  if (!authorized) {
    return NextResponse.redirect(`${req.nextUrl.origin}/signin`, req.url);
  }
  return NextResponse.next();
}
// Filter dashboard and any underlying route
export const config = {
  matcher: [ "/dashboard/:path*"]
}

