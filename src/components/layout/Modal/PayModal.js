/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from 'react';
import styles from './PayModal.module.css';
import { getRobokassaSignature, setPayments } from '@@/utils/api';
import { personalities } from '@@/utils/personality';

export const PayModal = ({ onClose, emailUser, avatarId, peopleId, title, price, gender }) => {
  avatarId = typeof avatarId === 'string' ? avatarId.split(',').map(id => id.trim()) : Array.isArray(avatarId) ? avatarId : [avatarId];
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
          avatar_ids: avatarId,
          people_id: peopleId,
          email: email.value,
          service: title,
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
      const inv_desc = `${title}`;
      const mrh_login = process.env.NEXT_PUBLIC_ROBOKASSA_LOGIN;
      const pass1 = process.env.NEXT_PUBLIC_ROBOKASSA_PASS1;
      const Receipt = {
        "sno": "usn_income",
        "items": avatarId.map(avatar => {
          const foundPersonality = personalities.find(el => Number(el.id) === Number(avatar));
          
          return {
            "name": `${gender === 'male' ? foundPersonality.part.maleTitle : foundPersonality.part.femaleTitle}`,
            "quantity": 1,
            "sum": price / avatarId.length,
            "payment_method": "full_payment",
            "payment_object": "service",
            "tax": "none"
          };
        })
      };

      console.log(Receipt);
      const jsonString = JSON.stringify(Receipt);
      const encodedJson = encodeURIComponent(jsonString);

      const signature = await getRobokassaSignature(JSON.stringify({ mrh_login, out_summ, inv_id, Receipt: jsonString, pass1 }));

      const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${mrh_login}&OutSum=${out_summ}&InvId=${inv_id}&Description=${inv_desc}&Receipt=${encodedJson}&SignatureValue=${signature}`;

      window.ym && window.ym(99937024, 'reachGoal', 'send_pay_avatar');

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
