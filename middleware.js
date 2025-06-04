import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/createblog"]; 
const publicRoutes = ["/unauthorized" , "/confirmlogout" , "/signup" ];

export default async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isDynamicRoute =  /^\/[^/]+$/.test(pathname)

  if ((isProtected || isDynamicRoute) && !session) {
    return NextResponse.redirect(new URL("/unauthorized" ,  request.url));
  } 
  return NextResponse.next();
}
