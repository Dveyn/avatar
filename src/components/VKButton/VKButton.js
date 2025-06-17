import { useEffect, useRef, useState } from 'react';
import styles from './VKButton.module.css';
import { signin, signup } from '@@/utils/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';

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
            const code = payload.code;
            const deviceId = payload.device_id;
            try {
              const result = await VKID.Auth.exchangeCode(code, deviceId);
              const userInfo = await VKID.Auth.userInfo(result.access_token);
              
              // Получаем дату рождения из VK
              const bdate = userInfo.user.birthday?.split('.') || [];
              const [day, month, year] = bdate;
              
              // Проверяем наличие всех необходимых данных
              if (!day || !month || !year) {
                console.log('VK user data:', userInfo.user); // для отладки
                handleError(new Error('Не удалось получить дату рождения из VK. Пожалуйста, укажите дату рождения в настройках VK.'));
                return;
              }

              // Получаем пол из VK
              const gender = userInfo.user.sex === 2 ? 'male' : 'female';
              
              // Проверяем наличие пола
              if (!gender) {
                handleError(new Error('Не удалось получить пол из VK. Пожалуйста, укажите пол в настройках VK.'));
                return;
              }

              // Рассчитываем аватары
              const resultData = calculateAvatarData(day, month, year, gender, personalities);
              
              // Проверяем результат расчета
              if (!resultData || !resultData.A) {
                handleError(new Error('Ошибка расчета аватаров. Пожалуйста, проверьте введенные данные.'));
                return;
              }
              
              // Формируем данные для отправки
              const date = {
                provider: 'vk',
                socialData: JSON.stringify(userInfo),
                birdDay: `${year}-${month}-${day}`,
                gender: gender,
                mail: userInfo.user.email || '', // email не обязателен
                result: {
                  A: resultData.A,
                  B: resultData.B,
                  V: resultData.V,
                  G: resultData.G,
                  D: resultData.D,
                  K: resultData.K,
                  L: resultData.L,
                  M: resultData.M,
                  N: resultData.N,
                  B2: resultData.B2
                }
              };

              // Используем signin или signup в зависимости от контекста
              const authResult = isRegistration 
                ? await signup(date)
                : await signin(date);

              console.log('Backend response:', authResult);

              if (authResult?.id || (authResult?.accessToken && authResult?.refreshToken)) {
                if (authResult?.accessToken && authResult?.refreshToken) {
                  Cookies.set('accessToken', authResult.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
                  Cookies.set('refreshToken', authResult.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
                }
                router.push('/profile');
              } else {
                handleError(new Error('Ошибка авторизации через VK: неверный формат ответа'));
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
