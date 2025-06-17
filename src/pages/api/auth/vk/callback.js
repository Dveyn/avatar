import { socialAuth } from '@@/utils/api';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const result = await socialAuth({ 
      provider: 'vk',
      code: code
    });

    if (result?.accessToken && result?.refreshToken) {
      // Устанавливаем куки
      Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
      Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
      
      // Редирект на профиль
      res.redirect('/profile');
    } else {
      res.redirect('/signin?error=auth_failed');
    }
  } catch (error) {
    console.error('VK auth error:', error);
    res.redirect('/signin?error=auth_failed');
  }
} 
