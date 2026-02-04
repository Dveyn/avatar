import { useEffect, useState } from 'react';
import styles from './TelegramWidget.module.css';
import { signin, signup } from '@@/utils/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const TelegramWidget = ({ isRegistration = false }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Функция для отправки событий аналитики при успешной регистрации
  const trackSuccessfulRegistration = (userId) => {
    if (typeof window !== 'undefined') {
      try {
        // Yandex.Metrika
        if (window.ym) {
          window.ym(99937024, 'reachGoal', 'confirm_reg');
        } else {

        }
        
        // VK Pixel
        if (window._tmr) {
          window._tmr.push({ 
            type: 'reachGoal', 
            id: 3628641, 
            goal: 'registration_success'
          });
        } else {

        }

      } catch (analyticsError) {
        console.error('Analytics error (Telegram):', analyticsError);
      }
    }
  };

  const handleTelegramAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      // Проверяем, доступен ли Telegram Login
      if (!window.Telegram || !window.Telegram.Login) {
        setError('Telegram Login недоступен');
        return;
      }

      // Инициализируем Telegram Login
      window.Telegram.Login.auth(
        { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
        async (data) => {
          if (data) {
            try {
              // Формируем данные для отправки
              const authData = {
                provider: 'telegram',
                socialData: JSON.stringify(data)
              };

              // Используем signin или signup в зависимости от контекста
              const result = isRegistration 
                ? await signup(authData)
                : await signin(authData);

              if (result?.accessToken && result?.refreshToken) {
                Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
                Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
                
                // Отправляем события аналитики при регистрации
                if (isRegistration && result?.user?.id) {
                  trackSuccessfulRegistration(result.user.id);
                }
                
                window.location.href = '/profile';
              } else {
                setError('Ошибка авторизации через Telegram: неверный формат ответа');
              }
            } catch (error) {
              setError('Ошибка авторизации через Telegram: ' + (error?.message || 'Неизвестная ошибка'));
            }
          } else {
            setError('Не удалось получить данные от Telegram');
          }
          setLoading(false);
        }
      );
    } catch (error) {
      setError('Ошибка инициализации Telegram: ' + (error?.message || 'Неизвестная ошибка'));
      setLoading(false);
    }
  };

  return (
    <div className={styles.telegramWidgetContainer}>
      <button
        onClick={handleTelegramAuth}
        disabled={loading}
        className={styles.telegramButton}
      >
        {loading ? 'Загрузка...' : 'Войти через Telegram'}
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TelegramWidget; 
