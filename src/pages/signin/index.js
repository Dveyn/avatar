import { useState, useEffect } from 'react';
import styles from './signin.module.css';
import { signin } from '@@/utils/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Проверяем наличие параметра is_test в URL
    const isTest = router.query.is_test === 't';
    setIsTestMode(isTest);
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signin({ email: email, password: password });
    if (result?.accessToken && result?.refreshToken) {
      Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
      Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
      setSuccess(true);
      router.push('/profile');

    } else {
      setError('Ошибка авторизации. Проверьте данные.');
    }

  };

  const handleVKSignIn = async () => {
    try {
      const vkAppId = process.env.NEXT_PUBLIC_VK_APP_ID;
      if (!vkAppId) {
        setError('Ошибка конфигурации: не указан ID приложения ВКонтакте');
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const redirectUri = `${baseUrl}/api/auth/vk/callback`;
      
      const authUrl = new URL('https://oauth.vk.com/authorize');
      authUrl.searchParams.append('client_id', vkAppId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('scope', 'email');
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('display', 'popup');
      
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Ошибка при авторизации через ВКонтакте:', error);
      setError('Произошла ошибка при попытке входа через ВКонтакте');
    }
  };

  const handleTelegramSignIn = () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
        async (data) => {
          if (data) {
            try {
              const result = await signin({ 
                provider: 'telegram',
                telegramData: JSON.stringify(data)
              });
              
              if (result?.accessToken && result?.refreshToken) {
                // Устанавливаем куки
                document.cookie = `accessToken=${result.accessToken}; path=/; secure; samesite=strict; max-age=${30 * 24 * 60 * 60}`;
                document.cookie = `refreshToken=${result.refreshToken}; path=/; secure; samesite=strict; max-age=${30 * 24 * 60 * 60}`;
                
                // Редирект на профиль
                router.push('/profile');
              } else {
                setError('Ошибка авторизации через Telegram');
              }
            } catch (error) {
              console.error('Ошибка авторизации через Telegram:', error);
              setError('Ошибка авторизации через Telegram');
            }
          }
        }
      );
    }
  };

  const pageTitle = "Аватары | Вход";
  const pageDescription = "Вход в личный кабинет Метод Аватаров – получите доступ к своей Матрице судьбы. Исследуйте свои ресурсы, раскрывайте потенциал и управляйте энергией с помощью уникального инструмента самопознания.";
  const pageUrl = "https://avalik-avatar.ru/signin";
  const siteName = "Аватары";
  const imageUrl = "https://avalik-avatar.ru/favicon.png";
  return (
    <>
      <Head>
        <title>Аватары | Вход</title>
        <meta name="keywords" content="матрица судьбы, типы личности, матрица судьбы рассчитать, самопознание, внутреннее я, личные ресурсы, прогностика, внутренний баланс, внутренняя энергия человека, ifs терапия, типирование личности, психологические архетипы, аналитика и прогностика, прогностика на год, аватар воин, прогностика в матрице, как работать аватар, аватар личность, прогностика в матрице судьбы, прогностика по дате рождения, прогностика онлайн, энергии аватаров, расшифровка прогностики, анализ личности по дате рождения, как управляют аватаром, ifs подход, метод аватаров, как узнать своего аватара, психологическое типирование, творец аватара, аватар мудрец, калькулятор аватар, аватары расшифровка" />

        {/* Каноническая ссылка */ }
        <link rel="canonical" href={ pageUrl } />

        {/* Open Graph метатеги (для соцсетей) */ }
        <meta property="og:title" content={ pageTitle } />
        <meta property="og:description" content={ pageDescription } />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ pageUrl } />
        <meta property="og:image" content={ imageUrl } />
        <meta property="og:site_name" content={ siteName } />

        {/* Twitter Card (опционально) */ }
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ pageTitle } />
        <meta name="twitter:description" content={ pageDescription } />
        <meta name="twitter:image" content={ imageUrl } />

        {/* Микроразметка Schema.org (JSON-LD) */ }
        <script type="application/ld+json">
          { JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": "https://ваш-сайт.com/logo.png" // Замените на URL логотипа
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": imageUrl
            }
          }) }
        </script>
      </Head>
      <div className={ styles.body }>
        <div className={ styles.form }>
          <div className={ styles.form_body }>
            <h1 className={ styles.title }>Вход</h1>
            <div className={ styles.pretitle }>Внимание! Мы обновили сайт, если не получается войти в профиль, вопспользуйтесь востановлением пароля</div>
            
            {isTestMode && (
              <>
                <div className={ styles.socialButtons }>
                  <button
                    onClick={ handleVKSignIn }
                    className={ `${ styles.socialButton } ${ styles.vkButton }` }
                  >
                    Войти через ВКонтакте
                  </button>
                  <button
                    onClick={ handleTelegramSignIn }
                    className={ `${ styles.socialButton } ${ styles.telegramButton }` }
                  >
                    Войти через Telegram
                  </button>
                </div>

                <div className={ styles.divider }>
                  <span>или</span>
                </div>
              </>
            )}

            <form onSubmit={ handleSubmit }>
              <div>
                <label className={ styles.label } htmlFor="email">Email:</label>
                <input
                  className={ styles.input }
                  type="email"
                  id="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  required
                />
              </div>
              <div>
                <label className={ styles.label } htmlFor="password">Пароль:</label>
                <input
                  className={ styles.input }
                  type="password"
                  id="password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  required
                />
              </div>
              { error && <div style={ { color: 'red' } }>{ error }</div> }
              <button className={ styles.btn } type="submit" disabled={ loading }>
                { loading ? 'Загрузка...' : 'Войти' }
              </button>

              <div className={ styles.btn } onClick={ () => { router.push('/forgot'); } }>Забыли пароль</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
