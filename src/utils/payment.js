export const preparePaymentData = ({ description, amount, orderID,  email, receipt }) => {
  if (receipt && (!email)) {
    throw new Error("Поле E-mail или Phone не должно быть пустым");
  }

  const paymentData = {
    terminalkey: process.env.NEXT_PUBLIC_TERMINAL_KEY,
    frame: false,
    language: "ru",
    receipt: receipt
      ? JSON.stringify({
          EmailCompany: "mail@mail.com",
          Taxation: "patent",
          FfdVersion: "1.2",
          Items: [
            {
              Name: description || "Оплата",
              Price: Math.round(amount * 100),
              Quantity: 1.0,
              Amount: Math.round(amount * 100),
              PaymentMethod: "full_prepayment",
              PaymentObject: "service",
              Tax: "none",
              MeasurementUnit: "pc",
            },
          ],
        })
      : "",
    amount: Math.round(amount * 100),
    order: orderID,
    description: description || "",
    email: email || "",
  };

  return paymentData;
};

export const processPayment = async (paymentData) => {
  console.log(paymentData)
  if (typeof pay !== "undefined") {
    try {
      await pay(paymentData);
    } catch (error) {
      console.error("Ошибка при вызове функции pay:", error);
      throw error;
    }
  } else {
    console.error("Tinkoff JS SDK не загружен");
    throw new Error("Tinkoff JS SDK не загружен");
  }
};
