import { NextResponse } from 'next/server';
import { fetchRefreshToken, fetchValidToken } from './utils/api';

export async function middleware(req) {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (!accessToken) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
        // Проверяем accessToken через API
        const validateResponse = await fetchValidToken(accessToken);
        if (validateResponse.ok) {
            return NextResponse.next();
        }
        if (refreshToken) {
            const refreshResponse = await fetchRefreshToken({refreshToken: refreshToken.value})

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();

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
        console.error('Error during token validation or refresh:', error.message);
    }

    // Если всё не удалось, редиректим на страницу входа
    return NextResponse.redirect(new URL('/signin', req.url));
}

// Применяем мидлвару для защищённых маршрутов
export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
};
