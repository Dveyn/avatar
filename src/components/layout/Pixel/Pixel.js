import { useEffect } from "react";
import Script from "next/script";

const MailRuPixel = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window._tmr = window._tmr || [];

      // Проверяем, есть ли уже скрипт
      if (!document.getElementById("tmr-code")) {
        const ts = document.createElement("script");
        ts.type = "text/javascript";
        ts.async = true;
        ts.id = "tmr-code";
        ts.src = "https://top-fwz1.mail.ru/js/code.js";

        ts.onload = () => {
          console.log("Mail.Ru Pixel загружен!");
          window._tmr.push({ id: "3628641", type: "pageView", start: new Date().getTime() });
        };
        
        document.head.appendChild(ts);
      } else {
        console.log("Mail.Ru Pixel уже загружен!");
      }
    }
  }, []);

  return (
    <>
      <noscript>
        <div>
          <img
            src="https://top-fwz1.mail.ru/counter?id=3628641;js=na"
            style={{ position: "absolute", left: "-9999px" }}
            alt="Top.Mail.Ru"
          />
        </div>
      </noscript>
    </>
  );
};

export default MailRuPixel;
