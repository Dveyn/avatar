/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { preparePaymentData, processPayment } from '@@/utils/payment';
import { setPayments } from '@@/utils/api';

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

      if(!status) {
        alert("Произошла ошибка. Повторите попытку позже");
        return;
      }

      form.order.value = orderID;
      form.amount.value = price;
      form.receipt.value = JSON.stringify({
        EmailCompany: "admin@avalik-avatar.ru",
        Taxation: "patent",
        FfdVersion: "1.2",
        Items: [
          {
            Name: description.value || "Оплата",
            Price: Math.round(amount.value * 100),
            Quantity: 1.0,
            Amount: Math.round(amount.value * 100),
            PaymentMethod: "full_prepayment",
            PaymentObject: "service",
            Tax: "none",
            MeasurementUnit: "pc",
          },
        ],
      });
    }
    if (typeof pay !== "undefined") {
       await pay(form);
    } else {
      console.error("Tinkoff JS SDK не загружен");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={ styles.modal } onClick={ onClose }>
      <div className={ styles.modalContent } onClick={ (e) => e.stopPropagation() }>
        <div className={ styles.header }>
          <img src={ '/images/icon/background.svg' } />
        </div>
        <div className={ styles.modalTitle }>{ title }</div>
        <form className={ styles.form } onSubmit={ handleSubmit } ref={ formRef }>
          <input className={ styles.input } value={ mail } onChange={ handleMail }   name="email" type={ 'email' } placeholder='Ваш email' />
          <input className={ styles.input } value={ name } onChange={ handleName } placeholder='Ваше имя' />
          <input className={ styles.input } value={ phone } onChange={ handlePhone }   name="phone" placeholder='Ваш телефон' />
          <input className={ styles.input } value={ date } onChange={ handleDate } type={ 'date' } placeholder='28.02.2002' />


          <input type="hidden" name="terminalkey" value={ process.env.NEXT_PUBLIC_TERMINAL_KEY } />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="receipt" value="" />
          <input
            placeholder="Сумма заказа"
            name="amount"
            type="hidden"
            value={1}
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
            value={title}
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

