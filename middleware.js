import { NextRequest, NextResponse } from "next/server";

let locales = ["en", "in", "fr", "sp"];
let defaultLocale = "en";

function getLocale(request) {
    return defaultLocale;
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Skip static files (images, CSS, JS, etc.)
    if (pathname.startsWith("/_next/") || pathname.startsWith("/public/") || pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|css|js|ico)$/)) {
        return;
    }

    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
      "/((?!_next|_public|.*\\..*).*)",
    ],
};
