import { useEffect, useRef, useState } from 'react';
import styles from './ModalCalc.module.css';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';
import { signup } from '@@/utils/api';
import { useRouter } from 'next/router';
import Script from 'next/script';
import VKButton from '../../VKButton/VKButton';
import TelegramWidget from '../../TelegramWidget/TelegramWidget';
import Cookies from 'js-cookie';

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
    <>
      <Script 
        src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"
        strategy="beforeInteractive"
      />
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal_body}>
            <div className={styles.modalTitle}>Рассчитать свой аватар</div>
            <div className={styles.desctiption}>
              Метод Аватаров основан на методе матрицы судьбы и нумерологии, поэтому, чтобы рассчитать бесплатно ваших аватаров, введите, пожалуйста, ваши год, месяц и день рождения.
            </div>

            {!showDateForm ? (
              <>
                <div className={styles.socialButtons}>
                  <VKButton isRegistration={true} />
                  <TelegramWidget isRegistration={true} />
                </div>

                <div className={styles.divider}>
                  <span>или</span>
                </div>

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
    </>
  );
};
