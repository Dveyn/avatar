import { signIn } from 'next-auth/react';
import styles from '../styles/AuthButtons.module.css';

export default function AuthButtons() {
  const handleVKSignIn = () => {
    signIn('vk');
  };

  const handleTelegramSignIn = () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
        async (data) => {
          if (data) {
            await signIn('credentials', {
              telegramData: JSON.stringify(data),
            });
          }
        }
      );
    }
  };

  return (
    <div className={styles.authButtons}>
      <button
        onClick={handleVKSignIn}
        className={`${styles.button} ${styles.vkButton}`}
      >
        Войти через ВКонтакте
      </button>
      <button
        onClick={handleTelegramSignIn}
        className={`${styles.button} ${styles.telegramButton}`}
      >
        Войти через Telegram
      </button>
    </div>
  );
} 
