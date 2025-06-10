import { signin } from '@@/utils/api';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code) {
    return res.redirect('/signin?error=No code provided');
  }

  try {
    // Получаем access token от VK
    const tokenResponse = await fetch('https://oauth.vk.com/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_VK_APP_ID,
        client_secret: process.env.VK_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/vk/callback`,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get VK access token');
    }

    // Получаем информацию о пользователе
    const userResponse = await fetch(
      `https://api.vk.com/method/users.get?user_ids=${tokenData.user_id}&fields=photo_200&access_token=${tokenData.access_token}&v=5.131`
    );

    const userData = await userResponse.json();

    if (!userData.response?.[0]) {
      throw new Error('Failed to get VK user data');
    }

    const user = userData.response[0];

    // Авторизуем пользователя через ваш API
    const result = await signin({
      provider: 'vk',
      vkData: JSON.stringify({
        id: user.id,
        email: tokenData.email,
        firstName: user.first_name,
        lastName: user.last_name,
        photo: user.photo_200,
      }),
    });

    if (result?.accessToken && result?.refreshToken) {
      // Устанавливаем куки
      res.setHeader('Set-Cookie', [
        `accessToken=${result.accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
        `refreshToken=${result.refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
      ]);

      // Отправляем HTML страницу, которая установит куки на клиенте и сделает редирект
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <html>
          <head>
            <script>
              // Устанавливаем куки на клиенте
              document.cookie = "accessToken=${result.accessToken}; path=/; secure; samesite=strict; max-age=${30 * 24 * 60 * 60}";
              document.cookie = "refreshToken=${result.refreshToken}; path=/; secure; samesite=strict; max-age=${30 * 24 * 60 * 60}";
              
              // Редирект на профиль
              window.location.href = '/profile';
            </script>
          </head>
          <body>
            <p>Перенаправление на профиль...</p>
          </body>
        </html>
      `);
      return;
    }

    throw new Error('Failed to authenticate with VK data');
  } catch (error) {
    console.error('VK auth error:', error);
    return res.redirect('/signin?error=VK authentication failed');
  }
} 
