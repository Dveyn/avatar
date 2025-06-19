import { NextResponse } from 'next/server';
import { fetchRefreshToken, fetchValidToken } from './utils/api';

export async function middleware(req) {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');

    console.log('Middleware - Access Token:', accessToken?.value);
    console.log('Middleware - Refresh Token:', refreshToken?.value);

    if (!accessToken) {
        console.log('Middleware - No access token, redirecting to signin');
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
        // Проверяем accessToken через API
        const validateResponse = await fetchValidToken(accessToken.value);
        console.log('Middleware - Token validation response:', validateResponse.status);

        if (validateResponse.ok) {
            return NextResponse.next();
        }

        if (refreshToken) {
            console.log('Middleware - Attempting token refresh');
            const refreshResponse = await fetchRefreshToken({refreshToken: refreshToken.value});

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                console.log('Middleware - Token refresh successful');

                const response = NextResponse.next();
                response.cookies.set('accessToken', data.accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60, 
                });
                response.cookies.set('refreshToken', data.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60, 
                });

                return response;
            }
        }

    } catch (error) {
        console.error('Middleware - Error during token validation or refresh:', error.message);
    }

    console.log('Middleware - All auth attempts failed, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', req.url));
}

// Применяем мидлвару для защищённых маршрутов
export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
};
