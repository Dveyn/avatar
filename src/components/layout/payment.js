// components/PaymentForm.js
import React, { useRef } from "react";

const PaymentForm = () => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const { description, amount, email, phone, receipt } = form;

    if (receipt) {
      if (!email.value && !phone.value) {
        alert("Поле E-mail или Phone не должно быть пустым");
        return;
      }

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

  return (
    <form
      className="payform-tbank"
      name="payform-tbank"
      id="payform-tbank"
      ref={ formRef }
      onSubmit={ handleSubmit }
    >
      <input type="hidden" name="terminalkey" value={ process.env.NEXT_PUBLIC_TERMINAL_KEY } />
      <input type="hidden" name="frame" value="false" />
      <input type="hidden" name="language" value="ru" />
      <input type="hidden" name="receipt" value="" />
      <input
        placeholder="Сумма заказа"
        name="amount"
        type="hidden"
        required
        className="payform-tbank-row"
      />
      <input
        type="hidden"
        name="order"
        className="payform-tbank-row"
        value={ '1' }
      />
      <input
        type="hidden"
        placeholder="Описание заказа"
        name="description"
        className="payform-tbank-row"
      />
      <input
        type="hidden"
        placeholder="E-mail"
        name="email"
        className="payform-tbank-row"
      />

    </form>
  );
};

export default PaymentForm;
