export default function handler(req, res) {
  const { accessToken, refreshToken, redirect } = req.query;

  if (!accessToken || !refreshToken) {
    return res.status(400).json({ error: 'Missing tokens' });
  }

  // Устанавливаем куки на сервере
  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
    `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`
  ]);

  // Редиректим на указанную страницу
  res.redirect(redirect || '/profile');
} 
