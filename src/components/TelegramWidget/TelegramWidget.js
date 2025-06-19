import { useEffect, useRef, useState } from 'react';
import styles from './TelegramWidget.module.css';
import { signin, signup } from '@@/utils/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const TelegramWidget = ({ isRegistration = false }) => {
  const widgetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !widgetRef.current) {
      return;
    }

    setIsLoading(true);
    setError(null);

    // Функция для обработки авторизации через Telegram
    window.onTelegramAuth = async (user) => {
      try {
        // Формируем данные для отправки
        const authData = {
          provider: 'telegram',
          socialData: JSON.stringify(user)
        };

        // Используем signin или signup в зависимости от контекста
        const result = isRegistration 
          ? await signup(authData)
          : await signin(authData);

        if (result?.accessToken && result?.refreshToken) {
          Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
          Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
          router.push('/profile');
        } else {
          setError('Ошибка авторизации через Telegram: неверный формат ответа');
        }
      } catch (error) {
        setError('Ошибка авторизации через Telegram: ' + (error?.message || 'Неизвестная ошибка'));
      }
    };

    // Функция для загрузки Telegram виджета
    const loadTelegramWidget = () => {
      try {
        // Проверяем домен

        // Очищаем контейнер
        widgetRef.current.innerHTML = '';

        // Создаем скрипт для загрузки виджета с правильными атрибутами
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'avalik_avatar_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '20');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');

        // Добавляем скрипт в контейнер
        widgetRef.current.appendChild(script);

        // Ожидаем загрузки виджета
        script.onload = () => {
          setIsLoading(false);
        };

        script.onerror = () => {
          setError('Ошибка загрузки Telegram виджета');
          setIsLoading(false);
        };

      } catch (e) {
        setError('Ошибка инициализации Telegram виджета: ' + (e?.message || 'Неизвестная ошибка'));
        setIsLoading(false);
      }
    };

    // Запускаем загрузку виджета
    loadTelegramWidget();

    return () => {
      // Очищаем функцию при размонтировании
      if (window.onTelegramAuth) {
        delete window.onTelegramAuth;
      }
    };
  }, [router, isRegistration]);

  return (
    <div className={styles.telegramWidgetContainer}>
      <div ref={widgetRef} />
      {isLoading && !error && (
        <div className={styles.loading}>Загрузка Telegram виджета...</div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TelegramWidget; 
