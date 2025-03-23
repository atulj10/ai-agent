import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;
    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/login'))) {
        return NextResponse.redirect(new URL('/main/dashboard', request.url))
    }
    if (!token && (
        url.pathname.startsWith('/main'))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}



// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/login',
        '/sign-up',
        '/dashboard/:path*',
        '/',
        '/verify/:path*',
        '/main/:path*'
    ],

}