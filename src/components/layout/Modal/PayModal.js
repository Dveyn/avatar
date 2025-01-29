/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from 'react';
import styles from './PayModal.module.css';
import { setPayments } from '@@/utils/api';

export const PayModal = ({ onClose, emailUser, piopleId, title, price }) => {


  const formRef = useRef(null);


  const handleSubmit = async () => {

    const form = formRef.current;
    const { description, amount, email, receipt } = form;
    if (receipt) {
      form.amount.value = price;
      const { orderID, status } = await setPayments({
        item: {
          isAvatar: true,
          people_id: piopleId,
          email: email.value,
          service: title,
        },
        amount: amount.value,
        title: title
      });

      if (!status) {
        alert("Произошла ошибка. Повторите попытку позже");
        return;
      }

      form.order.value = orderID;
      
      form.receipt.value = JSON.stringify({
        EmailCompany: "info@avalik-avatar.ru",
        Taxation: "usn_income",
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

    handleSubmit();

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

          <input type="hidden" name="terminalkey" value={ process.env.NEXT_PUBLIC_TERMINAL_KEY } />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="email" value={ emailUser } />
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
        </form>
      </div>
    </div>
  );
};

