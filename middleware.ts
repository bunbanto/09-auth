import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const publicRoutes = ['/sign-in', '/sign-up'];
const privateRoutes = ['/profile', '/notes'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      // 🔁 Спроба оновити сесію
      const res = await checkSession();

      if (res.status === 200) {
        // ⏭ Повернутись на цю ж сторінку — з оновленими куками (через бекенд)
        const response = NextResponse.redirect(new URL(request.url));
        const setCookie = res.headers['set-cookie'];

        if (setCookie) {
          response.headers.set(
            'Set-Cookie',
            Array.isArray(setCookie) ? setCookie.join(', ') : setCookie
          );
        }

        return response;
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
