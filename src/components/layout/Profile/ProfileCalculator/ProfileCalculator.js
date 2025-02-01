import { useRef, useState } from 'react';
import styles from './ProfileCalculator.module.css';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';
import { addPerson } from '@@/utils/api';
import Cookies from 'js-cookie';

export const ProfileCalculator = ({ onClose }) => {

  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = calculateAvatarData(day, month, year, gender, personalities);
    const date = {
      birdDay: `${year}-${month}-${day}`,
      gender: gender,
      name: name,
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
    const accessToken = Cookies.get('accessToken');

    const response = await addPerson(date, accessToken);

    if (response.status === 200) {
      onClose();
      location.reload();
    }

  };


  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleInputChange = (e, setValue, maxLength, nextRef) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    
    setValue(value); // Обновляем состояние
  
    // Ожидаем обновления интерфейса перед сменой фокуса
    if (value.length === maxLength && nextRef?.current) {
      setTimeout(() => {
        nextRef.current.focus();
      }, 0);
    }
  };

  // Удаление лидирующих нулей при потере фокуса
  const handleBlur = (setValue, value) => {
    setValue(value.replace(/^0+/, "") || "0");
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
          <form className={ styles.form } onSubmit={ handleSubmit }>
            <div className={ styles.date_block }>
              <input
                ref={ dayRef }
                value={ day }
                onChange={ (e) => handleInputChange(e, setDay, 2, monthRef) }
                onBlur={ () => handleBlur(setDay, day) }
                className={ styles.input }
                type="number"
                min={ 1 }
                max={ 31 }
                placeholder="00"
              />
              <input
                ref={ monthRef }
                value={ month }
                onChange={ (e) => handleInputChange(e, setMonth, 2, yearRef) }
                onBlur={ () => handleBlur(setMonth, month) }
                className={ styles.input }
                type="number"
                min={ 1 }
                max={ 12 }
                placeholder="00"
              />
              <input
                ref={ yearRef }
                value={ year }
                onChange={ (e) => handleInputChange(e, setYear, 4) }
                onBlur={ () => handleBlur(setYear, year) }
                className={ styles.input }
                type="number"
                min={ 1900 }
                max={ 2025 }
                placeholder="0000"
              />
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
            <input onChange={ (e) => setName(e.target.value) } className={ styles.inputMail } placeholder='Имя' />

            <button type="submit" className={ styles.button }>
              Рассчитать
            </button>
          </form>
        </div>
      </div>
    </div>
  );

};

export default ProfileCalculator;

