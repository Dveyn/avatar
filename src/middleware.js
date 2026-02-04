import { NextResponse } from 'next/server';
import { fetchRefreshToken, fetchValidToken } from './utils/api';

export async function middleware(req) {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');

    // Если нет токена доступа, перенаправляем на страницу входа
    if (!accessToken) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
        // Проверяем accessToken через API
        const validateResponse = await fetchValidToken(accessToken.value);

        if (validateResponse.ok) {
            return NextResponse.next();
        }

        // Если токен невалиден, пытаемся обновить
        if (refreshToken) {
            try {
                const refreshResponse = await fetchRefreshToken(refreshToken.value);

                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();

                    const response = NextResponse.next();
                    const isProduction = process.env.NODE_ENV === 'production';
                    
                    // Устанавливаем новые токены
                    response.cookies.set('accessToken', data.accessToken, {
                        httpOnly: true,
                        secure: isProduction,
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 24 * 60 * 60, // 1 день
                    });
                    
                    response.cookies.set('refreshToken', data.refreshToken, {
                        httpOnly: true,
                        secure: isProduction,
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 30 * 24 * 60 * 60, // 30 дней
                    });

                    return response;
                }
            } catch (refreshError) {
                // Ошибка при обновлении токена - игнорируем и перенаправляем на вход
            }
        }

    } catch (error) {
        // Ошибка при проверке токена - перенаправляем на вход
    }

    // Все попытки аутентификации провалились
    const response = NextResponse.redirect(new URL('/signin', req.url));
    
    // Удаляем невалидные токены
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    
    return response;
}

// Применяем мидлвару для защищённых маршрутов
export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*', '/admin/:path*'],
};
