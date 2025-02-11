/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from 'react';
import styles from './PayModal.module.css';
import { getRobokassaSignature, setPayments } from '@@/utils/api';

export const PayModal = ({ onClose, emailUser, avatarId, piopleId, title, price }) => {


  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const form = formRef.current;
    const { description, amount, email, phone, receipt } = form;
    if (receipt) {
      //Отрпвляем запись в БД и получаем orderId 
      const { orderID, status } = await setPayments({
        item: {
          isAvatar: true,
          avatar_id: avatarId,
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

      const inv_id = orderID;
      const out_summ = price;
      const inv_desc = `${title}`;
      const mrh_login = process.env.NEXT_PUBLIC_ROBOKASSA_LOGIN;
      const pass1 = process.env.NEXT_PUBLIC_ROBOKASSA_PASS1;

      const signature = await getRobokassaSignature(JSON.stringify({ mrh_login, out_summ, inv_id, pass1 }));

      const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${mrh_login}&OutSum=${out_summ}&InvId=${inv_id}&Description=${inv_desc}&SignatureValue=${signature}`;

      window.location.href = url;
    }
  };

  useEffect(() => {
    handleSubmit();
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

