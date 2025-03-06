/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { preparePaymentData, processPayment } from '@@/utils/payment';
import { getRobokassaSignature, setPayments } from '@@/utils/api';

export const Modal = ({ onClose, title, posId, price }) => {

  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null);
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
    const value = e.target.value;
    setDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const { description, amount, email, phone, receipt } = form;
    if (receipt) {
      if (!email.value && !phone.value) {
        alert("Поле E-mail или Phone не должно быть пустым");
        return;
      }

      //Отрпвляем запись в БД и получаем orderId 
      const { orderID, status } = await setPayments({
        item: {
          email: mail,
          phone: phone.value,
          name: name,
          service: title,
          date: date,
        },
        amount: amount.value,
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

      const Receipt =  {
        "sno":"usn_income",
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
      }

      const jsonString = JSON.stringify(Receipt);
      const encodedJson = encodeURIComponent(jsonString);
      

      const signature = await getRobokassaSignature(JSON.stringify({ mrh_login, out_summ, inv_id, Receipt:jsonString, pass1 }))
      
      const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${mrh_login}&OutSum=${out_summ}&InvId=${inv_id}&Description=${inv_desc}&Receipt=${encodedJson}&SignatureValue=${signature}`;

      window.ym && window.ym(99937024,'reachGoal','send_pay_service')

      window.location.href = url;
    }
  };


  return (
    <div className={ styles.modal } onClick={ onClose }>
      <div className={ styles.modalContent } onClick={ (e) => e.stopPropagation() }>
        <div className={ styles.header }>
          <img src={ '/images/icon/background.svg' } />
        </div>
        <div className={ styles.modalTitle }>{ title }</div>
        <form className={ styles.form } onSubmit={ handleSubmit } ref={ formRef }>
          <input className={ styles.input } value={ mail } onChange={ handleMail } name="email" type={ 'email' } placeholder='Ваш email' />
          <input className={ styles.input } value={ name } onChange={ handleName } placeholder='Ваше имя' />
          <input className={ styles.input } value={ phone } onChange={ handlePhone } name="phone" placeholder='Ваш телефон' />
          <input className={ styles.input } value={ date } onChange={ handleDate } type={ 'date' } placeholder='28.02.2002' />


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

          <button type="submit" className={ styles.button }>
            Записаться
          </button>

          <div className={ styles.policy }>
            Нажимая кнопку "записаться", я соглашаюсь с Политикой в отношении обработки персональных данных
          </div>
        </form>
      </div>
    </div>
  );
};

