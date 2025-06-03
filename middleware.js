import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/createblog" , "/[id]"];

export default async function middleware(request) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/unauthorized" ,
    request.url));
  } 

  return NextResponse.next();
}
