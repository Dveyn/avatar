import { useState } from 'react';
import styles from './ModalCalc.module.css';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';
import { signup } from '@@/utils/api';


export const ModalCalc = ({ onClose }) => {

  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [mail, setMail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    if (!mail) {
      setError('Не указана почта');
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
    }
  };

  return (
    <div className={ styles.modal } onClick={ onClose }>
      <div className={ styles.modalContent } onClick={ (e) => e.stopPropagation() }>
        <div className={ styles.modal_body }>
          <div className={ styles.modalTitle }>Рассчитать свой аватар</div>
          <div className={ styles.pretitle }>
            ВВЕДИТЕ ВАШУ ДАТУ РОЖДЕНИЯ ДЛЯ РАСЧЕТА
            АВАТАРА В ФОРМАТЕ
            ДЕНЬ, МЕСЯЦ, ГОД
          </div>
          {
            success === '' &&
            <form className={ styles.form } onSubmit={ handleSubmit }>
              <div className={ styles.date_block }>
                <input onChange={ (e) => { setDay(e.target.value); } } className={ styles.input } type={ 'number' } min={ 0 } max={ 31 } placeholder="00" />
                <input onChange={ (e) => { setMonth(e.target.value); } } className={ styles.input } type={ 'number' } min={ 0 } max={ 12 } placeholder="00" />
                <input onChange={ (e) => { setYear(e.target.value); } } className={ styles.input } type={ 'number' } min={ 1900 } max={ 2025 } placeholder="0000" />
              </div>
              <div className={ styles.gender }>
                <div className={ styles.title }>Ваш пол:</div>
                <label className={ `${styles.gender_btn} ${gender === 'male' ? styles.btn_active : ''}` }>
                  Муж
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={ gender === 'male' }
                    onChange={ () => setGender('male') }
                    className={ styles.hiddenRadio }
                  />
                </label>
                <label className={ `${styles.gender_btn} ${gender === 'female' ? styles.btn_active : ''}` }>
                  Жен
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={ gender === 'female' }
                    onChange={ () => setGender('female') }
                    className={ styles.hiddenRadio }
                  />
                </label>
              </div>
              <input onChange={ (e) => setMail(e.target.value) } className={ styles.inputMail } placeholder='example@domain.com' />

              <button type="submit" className={ styles.button }>
                Рассчитать
              </button>
              { error !== '' && <div className={ styles.error }>{ error }</div> }
              <div className={ styles.policy }>
                Нажимая кнопку "Рассчитать", я соглашаюсь с Политикой в отношении обработки персональных данных
              </div>
            </form>
          }
          {
            success !== '' && <div className={ styles.success }>{ success }</div>
          }

        </div>
      </div>
    </div>
  );

};
