import { useEffect, useRef, useState } from 'react';
import styles from './VKButton.module.css';
import { signin, signup } from '@@/utils/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const VKButton = ({ isRegistration = false }) => {
  const vkidRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !vkidRef.current) return;
    vkidRef.current.innerHTML = '';

    let oneTap = null;
    try {
      if ('VKIDSDK' in window) {
        const VKID = window.VKIDSDK;

        VKID.Config.init({
          app: 53726578,
          redirectUrl: 'https://avalik-avatar.ru/api/auth/vk/callback',
          responseMode: VKID.ConfigResponseMode.Callback,
          source: VKID.ConfigSource.LOWCODE,
          scope: '',
        });

        oneTap = new VKID.OneTap();
        oneTap
          .render({
            container: vkidRef.current,
            showAlternativeLogin: true,
            styles: {
              borderRadius: 50,
              height: 36,
            },
          })
          .on(VKID.WidgetEvents.ERROR, handleError)
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, async function (payload) {
            console.log('VK ID Login Success, payload:', payload);
            const code = payload.code;
            const deviceId = payload.device_id;
            try {
              console.log('Exchanging code for token...');
              const result = await VKID.Auth.exchangeCode(code, deviceId);
              console.log('Token exchange result:', result);
              
              console.log('Getting user info...');
              const userInfo = await VKID.Auth.userInfo(result.access_token);
              console.log('User info:', userInfo);
              
              console.log('Sending to backend...');
              // Используем signin или signup в зависимости от контекста
              const authResult = isRegistration 
                ? await signup({
                    provider: 'vk',
                    socialData: JSON.stringify(userInfo)
                  })
                : await signin({
                    provider: 'vk',
                    socialData: JSON.stringify(userInfo)
                  });
              console.log('Backend response:', authResult);

              if (authResult?.accessToken && authResult?.refreshToken) {
                Cookies.set('accessToken', authResult.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
                Cookies.set('refreshToken', authResult.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
                router.push('/profile');
              } else {
                handleError(new Error('Ошибка авторизации через VK: нет токенов в ответе'));
              }
            } catch (err) {
              console.error('VK auth error:', err);
              handleError(err);
            }
          });
        setIsRendered(true);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError('Ошибка рендера VKID: ' + (e?.message || ''));
      } else {
        setError('Ошибка рендера VKID: неизвестная ошибка');
      }
    }

    function handleError(error) {
      if (error instanceof Error) {
        setError('Ошибка vkidOnError: ' + (error?.message || ''));
        console.error('VKID error', error);
      } else {
        setError('Ошибка рендера VKID: неизвестная ошибка');
      }
    }

    return () => {
      if (vkidRef.current) {
        vkidRef.current.innerHTML = '';
      }
    };
  }, [router, isRegistration]);

  return (
    <div className={styles.vkButtonContainer}>
      <div ref={vkidRef} />
      {!isRendered && !error && (
        <div className={styles.loading}>Загрузка VK ID...</div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default VKButton; 
