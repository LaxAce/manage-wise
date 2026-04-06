import { NextRequest, NextResponse } from "next/server";

import { CookiesEnum} from "@constants/enums";
import { getCookie } from "app/server-actions/cookieActions";
import constants from "@constants/index";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;

    // Skip middleware logic for Googlebot
    if (req.headers.get("user-agent")?.includes("Googlebot")) {
        return res; // Allow Googlebot to proceed without redirects
    }

    const token = await getCookie(CookiesEnum.AUTH_TOKEN);


    // Redirect logged-in users away from auth pages
    if (token && constants.restrictedAuthRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/board", req.url));
    }

    // Redirect unauthenticated users from protected routes
    if (!token && constants.protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect unauthorized users from admin routes
    // if (user && user.userType != UserTypeEnum.ADMIN && pathname.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    return res;
}

export const config = {
    matcher: [...constants.restrictedAuthRoutes, ...constants.protectedRoutes, "/"]
}
