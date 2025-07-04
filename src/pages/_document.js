/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <script src="//code.jivo.ru/widget/2GUc8I72sc" async></script>
        <script src="https://telegram.org/js/telegram-widget.js?22" 
                data-telegram-login="avalik_avatar_bot"
                data-size="large"
                data-radius="8"
                data-request-access="write"
                async />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script id="top-mail-ru-counter" strategy="afterInteractive">
          {`
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({ id: "3628641", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://top-fwz1.mail.ru/counter?id=3628641;js=na" style={{ position: 'absolute', left: '-9999px' }} alt="Top.Mail.Ru" />
          </div>
        </noscript>
      </body>
    </Html>
  );
}
