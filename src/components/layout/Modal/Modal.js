import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { preparePaymentData, processPayment } from '@@/utils/payment';
import { getRobokassaSignature, setPayments } from '@@/utils/api';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality';
import { signup } from '@@/utils/api';

export const Modal = ({ onClose, title, posId, price }) => {

  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null); // Дата консультации
  const [birthDate, setBirthDate] = useState(null); // Дата рождения
  const [gender, setGender] = useState('');
  const [policy, setPolicy] = useState(false)
  const formRef = useRef(null);

  const handleMail = (e) => {
    const value = e.target.value;
    setMail(value);
  };
  const handleName = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (posId === 2 && !gender) {
      alert('Выберите пол');
      return;
    }

    if (posId === 2) {
      const resultData = calculateAvatarData(
        birthDate.split('-')[2], // день
        birthDate.split('-')[1], // месяц
        birthDate.split('-')[0], // год
        gender,
        personalities
      );

      const userData = {
        birdDay: birthDate,
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

      const response = await signup(userData);

      if (response.isError) {
        return;
      }
      window?.ym && window.ym(99937024, 'reachGoal', 'send_reg');
    }

    const form = formRef.current;
    const { description, amount, email, phone, receipt } = form;
    if (receipt) {
      if (!email.value && !phone.value) {
        alert("Поле E-mail или Phone не должно быть пустым");
        return;
      }

      const { orderID, status } = await setPayments({
        item: {
          email: mail,
          phone: phone.value,
          name: name,
          service: title,
          date: date,
          posId: posId,
          dateBirthdate: birthDate,
          gender: posId === 2 ? gender : null
        },
        amount: price,
        title: title
      });

      if (!status) {
        alert("Произошла ошибка. Повторите попытку позже");
        return;
      }

      const inv_id = orderID;
      const out_summ = price;
      const inv_desc = `Оплата услуги ${title}`;
      const mrh_login = process.env.NEXT_PUBLIC_ROBOKASSA_LOGIN;
      const pass1 = process.env.NEXT_PUBLIC_ROBOKASSA_PASS1;

      const Receipt = {
        "sno": "usn_income",
        "items": [
          {
            "name": description.value || "Оплата",
            "quantity": 1,
            "sum": out_summ,
            "payment_method": "full_payment",
            "payment_object": "service",
            "tax": "none"
          }
        ]
      };

      const jsonString = JSON.stringify(Receipt);
      const encodedJson = encodeURIComponent(jsonString);

      const signature = await getRobokassaSignature(JSON.stringify({ mrh_login, out_summ, inv_id, Receipt: jsonString, pass1 }));

      const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${mrh_login}&OutSum=${out_summ}&InvId=${inv_id}&Description=${inv_desc}&Receipt=${encodedJson}&SignatureValue=${signature}`;

      window.ym && window.ym(99937024, 'reachGoal', 'send_pay_service');

      window.location.href = url;
    }
  };

  console.log(posId);

  return (
    <div className={ styles.modal } onClick={ onClose }>
      <div className={ styles.modalContent } onClick={ (e) => e.stopPropagation() }>
        <div className={ styles.header }>
          <img src={ '/images/icon/background.svg' } />
        </div>
        <div className={ styles.modalTitle }>{ title }</div>
        <form className={ styles.form } onSubmit={ handleSubmit } ref={ formRef }>
          <label className={ styles.label }>
            Ваш email
            <input className={ styles.input } value={ mail } onChange={ handleMail } name="email" type={ 'email' } placeholder='example@mail.com' />
          </label>
          <label className={ styles.label }>
            Ваше имя
            <input className={ styles.input } value={ name } onChange={ handleName } placeholder='Введите имя' />
          </label>
          <label className={ styles.label }>
            Ваш телефон
            <input className={ styles.input } value={ phone } onChange={ handlePhone } name="phone" placeholder='+7 (999) 999-99-99' />
          </label>
          <label className={ styles.label }>
            Дата консультации
            <input className={ styles.input } value={ date } onChange={ handleDate } type={ 'date' } />
          </label>
          { posId === 2 &&
            <>
              <label className={ styles.label }>
                Дата рождения
                <input className={ styles.input } value={ birthDate } onChange={ handleBirthDate } type={ 'date' } />
              </label>

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
            </>
          }

          <input type="hidden" name="terminalkey" value={ process.env.NEXT_PUBLIC_TERMINAL_KEY } />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="receipt" value="" />
          <input
            placeholder="Сумма заказа"
            name="amount"
            type="hidden"
            value={ 1 }
            required
          />
          <input
            type="hidden"
            name="order"
            value={ '1' }
          />
          <input
            type="hidden"
            placeholder="Описание заказа"
            name="description"
            value={ title }
          />

          <div>
            <label>
              <input type='checkbox' name='' onChange={()=>setPolicy(e.target.checked)} id='policy' />
              <span>Я соглашаюсь с <a href='/privacy_policy'>Политикой в отношении</a> обработки персональных данных</span>
            </label>
          </div>

          <button type="submit" className={ styles.button } disabled={!policy}>
            Записаться
          </button>
          {policy && <div className={styles.error}>Вы должны согласиться с политикой обработки персональных данных</div>}
        </form>
      </div>
    </div>
  );
};
