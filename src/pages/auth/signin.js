import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../../styles/AuthButtons.module.css';

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;

  const handleVKSignIn = () => {
    signIn('vk', { callbackUrl });
  };

  const handleTelegramSignIn = () => {
    // Инициализация Telegram Login Widget
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
        async (data) => {
          if (data) {
            await signIn('credentials', {
              telegramData: JSON.stringify(data),
              callbackUrl,
            });
          }
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h1>Войти в систему</h1>
        <div className={styles.buttonGroup}>
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
      </div>
    </div>
  );
} 
