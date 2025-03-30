import { NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.cookies.get("authenticated")?.value; // Using cookies instead of localStorage
  const url = req.nextUrl.clone();

  if (!auth && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Ensures middleware only applies to pages
};
