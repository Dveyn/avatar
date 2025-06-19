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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !vkidRef.current) {
      return;
    }
    
    vkidRef.current.innerHTML = '';
    setIsLoading(true);
    setError(null);

    // Функция для инициализации VK ID
    const initVKID = () => {
      try {
        // Проверяем, загружен ли VK ID SDK
        if (!('VKIDSDK' in window)) {
          setTimeout(initVKID, 1000); // Повторяем через 1 секунду
          return;
        }

        const VKID = window.VKIDSDK;

        // Проверяем доступность необходимых методов
        if (!VKID.Config || !VKID.Config.init) {
          setError('Ошибка инициализации VK ID: Config.init недоступен');
          setIsLoading(false);
          return;
        }

        if (!VKID.ConfigResponseMode || !VKID.ConfigSource) {
          setError('Ошибка инициализации VK ID: константы недоступны');
          setIsLoading(false);
          return;
        }

        // Инициализируем конфигурацию
        const config = {
          app: 53726578,
          redirectUrl: 'https://avalik-avatar.ru/api/auth/vk/callback',
          responseMode: VKID.ConfigResponseMode.Callback,
          source: VKID.ConfigSource.LOWCODE,
          scope: '',
        };

        VKID.Config.init(config);

        // Проверяем доступность OneTap
        if (!VKID.OneTap) {
          setError('Ошибка инициализации VK ID: OneTap недоступен');
          setIsLoading(false);
          return;
        }

        // Создаем OneTap виджет
        const oneTap = new VKID.OneTap();
        
        const renderConfig = {
          container: vkidRef.current,
          showAlternativeLogin: true,
          styles: {
            borderRadius: 50,
            height: 36,
          },
        };

        oneTap
          .render(renderConfig)
          .on(VKID.WidgetEvents.ERROR, (error) => {
            setError('Ошибка виджета VK ID: ' + (error?.message || 'Неизвестная ошибка'));
          })
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
                setError('Не удалось получить дату рождения из VK. Пожалуйста, укажите дату рождения в настройках VK.');
                return;
              }

              // Получаем пол из VK
              const gender = userInfo.user.sex === 2 ? 'male' : 'female';
              
              // Проверяем наличие пола
              if (!gender) {
                setError('Не удалось получить пол из VK. Пожалуйста, укажите пол в настройках VK.');
                return;
              }

              // Рассчитываем аватары
              const resultData = calculateAvatarData(day, month, year, gender, personalities);
              
              // Проверяем результат расчета
              if (!resultData || !resultData.A) {
                setError('Ошибка расчета аватаров. Пожалуйста, проверьте введенные данные.');
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

              if (authResult?.user?.id && authResult?.accessToken && authResult?.refreshToken) {
                Cookies.set('accessToken', authResult.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
                Cookies.set('refreshToken', authResult.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
                window.location.href = '/profile';
              } else {
                setError('Ошибка авторизации через VK: неверный формат ответа');
              }
            } catch (err) {
              setError('Ошибка авторизации через VK: ' + (err?.message || 'Неизвестная ошибка'));
            }
          });

        setIsRendered(true);
        setIsLoading(false);
        
      } catch (e) {
        setError('Ошибка инициализации VK ID: ' + (e?.message || 'Неизвестная ошибка'));
        setIsLoading(false);
      }
    };

    // Запускаем инициализацию
    initVKID();

    return () => {
      if (vkidRef.current) {
        vkidRef.current.innerHTML = '';
      }
    };
  }, [router, isRegistration]);

  return (
    <div className={styles.vkButtonContainer}>
      <div ref={vkidRef} />
      {isLoading && !error && (
        <div className={styles.loading}>Загрузка VK ID...</div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default VKButton; 
