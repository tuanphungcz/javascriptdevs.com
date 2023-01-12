import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
};

export function middleware(req: any) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host");

  const { pathname } = req.nextUrl;
  console.log(host, pathname);

  if (host.includes(".")) {
    url.pathname = `/404`;
    // console.log('trimmedHost', trimmedHost);
    // console.log('pathname', pathname);
    // console.log('tostring', url.toString());
    return NextResponse.rewrite(url);
  }

//   return NextResponse.rewrite(pathname);
}
