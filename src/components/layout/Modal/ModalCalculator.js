import { useEffect, useRef, useState } from 'react';
import styles from './ModalCalc.module.css';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';
import { signup } from '@@/utils/api';
import { useRouter } from 'next/router';

export const ModalCalc = ({ onClose }) => {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [mail, setMail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDateForm, setShowDateForm] = useState(false);
  const [socialData, setSocialData] = useState(null);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    // Проверяем наличие параметра is_test в URL
    const isTest = router.query.is_test === 't';
    setIsTestMode(isTest);
  }, [router.query]);

  const handleVKSignIn = async () => {
    const vkAppId = process.env.NEXT_PUBLIC_VK_APP_ID;
    const redirectUri = `https://avalik-avatar.ru/api/auth/vk/callback`;
    const scope = 'email';
    const state = Math.random().toString(36).substring(7);
    
    window.location.href = `https://id.vk.com/authorize?client_id=${vkAppId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}&display=popup&lang_id=0&scheme=light`;
  };

  const handleTelegramSignIn = () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
        async (data) => {
          if (data) {
            try {
              // Проверяем, есть ли дата рождения в данных Telegram
              if (data.birth_date) {
                const [day, month, year] = data.birth_date.split('.');
                await handleSocialSignIn({
                  provider: 'telegram',
                  data: {
                    ...data,
                    day,
                    month,
                    year
                  }
                });
              } else {
                // Если даты рождения нет, показываем форму для её ввода
                setSocialData({
                  provider: 'telegram',
                  data
                });
                setShowDateForm(true);
              }
            } catch (error) {
              setError('Ошибка авторизации через Telegram');
            }
          }
        }
      );
    }
  };

  const handleSocialSignIn = async (socialData) => {
    try {
      const resultData = calculateAvatarData(
        socialData.data.day,
        socialData.data.month,
        socialData.data.year,
        socialData.data.gender || gender,
        personalities
      );

      const date = {
        provider: socialData.provider,
        socialData: JSON.stringify(socialData.data),
        birdDay: `${socialData.data.year}-${socialData.data.month}-${socialData.data.day}`,
        gender: socialData.data.gender || gender,
        mail: socialData.data.email,
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

      const response = await signup(date);

      if (response.isError) {
        setError(response.message);
        setSuccess('');
      } else {
        setSuccess(response.message);
        setError('');
        window?.ym && window.ym(99937024, 'reachGoal', 'send_reg');
      }
    } catch (error) {
      setError('Ошибка при регистрации');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!day) {
      setError('Не указан день');
      return;
    }

    if (!month) {
      setError('Не указан месяц');
      return;
    }

    if (!year) {
      setError('Не указан год');
      return;
    }

    if (!gender) {
      setError('Не указан пол');
      return;
    }

    const resultData = calculateAvatarData(day, month, year, gender, personalities);
    const date = {
      birdDay: `${year}-${month}-${day}`,
      gender: gender,
      mail: mail,
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

    const response = await signup(date);

    if (response.isError) {
      setError(response.message);
      setSuccess('');
    } else {
      setSuccess(response.message);
      setError('');
      window?.ym && window.ym(99937024, 'reachGoal', 'send_reg');
    }
  };

  useEffect(() => {
    window.ym && window.ym(99937024, 'reachGoal', 'open_calc');
  }, []);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleInputChange = (e, setValue, maxLength, nextRef) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setValue(value);
    if (value.length === maxLength && nextRef?.current) {
      setTimeout(() => {
        nextRef.current.focus();
      }, 0);
    }
  };

  const handleBlur = (setValue, value) => {
    setValue(value.replace(/^0+/, "") || "0");
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_body}>
          <div className={styles.modalTitle}>Рассчитать свой аватар</div>
          <div className={styles.desctiption}>
            Метод Аватаров основан на методе матрицы судьбы и нумерологии, поэтому, чтобы рассчитать бесплатно ваших аватаров, введите, пожалуйста, ваши год, месяц и день рождения.
          </div>

          {!showDateForm ? (
            <>
              {isTestMode && (
                <>
                  <div className={styles.socialButtons}>
                    <button
                      onClick={handleVKSignIn}
                      className={`${styles.socialButton} ${styles.vkButton}`}
                    >
                      Войти через ВКонтакте
                    </button>
                    <button
                      onClick={handleTelegramSignIn}
                      className={`${styles.socialButton} ${styles.telegramButton}`}
                    >
                      Войти через Telegram
                    </button>
                  </div>

                  <div className={styles.divider}>
                    <span>или</span>
                  </div>
                </>
              )}

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.date_block}>
                  <input
                    ref={dayRef}
                    value={day}
                    onChange={(e) => handleInputChange(e, setDay, 2, monthRef)}
                    onBlur={() => handleBlur(setDay, day)}
                    className={styles.input}
                    type="number"
                    min={1}
                    max={31}
                    placeholder="00"
                  />
                  <input
                    ref={monthRef}
                    value={month}
                    onChange={(e) => handleInputChange(e, setMonth, 2, yearRef)}
                    onBlur={() => handleBlur(setMonth, month)}
                    className={styles.input}
                    type="number"
                    min={1}
                    max={12}
                    placeholder="00"
                  />
                  <input
                    ref={yearRef}
                    value={year}
                    onChange={(e) => handleInputChange(e, setYear, 4)}
                    onBlur={() => handleBlur(setYear, year)}
                    className={styles.input}
                    type="number"
                    min={1900}
                    max={2025}
                    placeholder="0000"
                  />
                </div>
                <div className={styles.gender}>
                  <div className={styles.title}>Ваш пол:</div>
                  <label className={`${styles.gender_btn} ${gender === 'male' ? styles.btn_active : ''}`}>
                    Муж
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className={styles.hiddenRadio}
                    />
                  </label>
                  <label className={`${styles.gender_btn} ${gender === 'female' ? styles.btn_active : ''}`}>
                    Жен
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className={styles.hiddenRadio}
                    />
                  </label>
                </div>
                <input
                  onChange={(e) => setMail(e.target.value)}
                  className={styles.inputMail}
                  placeholder='example@domain.com'
                />

                <button type="submit" className={styles.button}>
                  Рассчитать
                </button>
                {error !== '' && <div className={styles.error}>{error}</div>}
                <div className={styles.policy}>
                  Нажимая кнопку "Рассчитать", я соглашаюсь с Политикой в отношении обработки персональных данных
                </div>
              </form>
            </>
          ) : (
            <form className={styles.form} onSubmit={(e) => {
              e.preventDefault();
              handleSocialSignIn({
                ...socialData,
                data: {
                  ...socialData.data,
                  day,
                  month,
                  year,
                  gender
                }
              });
            }}>
              <div className={styles.date_block}>
                <input
                  ref={dayRef}
                  value={day}
                  onChange={(e) => handleInputChange(e, setDay, 2, monthRef)}
                  onBlur={() => handleBlur(setDay, day)}
                  className={styles.input}
                  type="number"
                  min={1}
                  max={31}
                  placeholder="00"
                />
                <input
                  ref={monthRef}
                  value={month}
                  onChange={(e) => handleInputChange(e, setMonth, 2, yearRef)}
                  onBlur={() => handleBlur(setMonth, month)}
                  className={styles.input}
                  type="number"
                  min={1}
                  max={12}
                  placeholder="00"
                />
                <input
                  ref={yearRef}
                  value={year}
                  onChange={(e) => handleInputChange(e, setYear, 4)}
                  onBlur={() => handleBlur(setYear, year)}
                  className={styles.input}
                  type="number"
                  min={1900}
                  max={2025}
                  placeholder="0000"
                />
              </div>
              <div className={styles.gender}>
                <div className={styles.title}>Ваш пол:</div>
                <label className={`${styles.gender_btn} ${gender === 'male' ? styles.btn_active : ''}`}>
                  Муж
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className={styles.hiddenRadio}
                  />
                </label>
                <label className={`${styles.gender_btn} ${gender === 'female' ? styles.btn_active : ''}`}>
                  Жен
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className={styles.hiddenRadio}
                  />
                </label>
              </div>
              <button type="submit" className={styles.button}>
                Завершить регистрацию
              </button>
              {error !== '' && <div className={styles.error}>{error}</div>}
            </form>
          )}

          {success !== '' && <div className={styles.success}>{success}</div>}
        </div>
      </div>
    </div>
  );
};
