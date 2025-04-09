import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer, Header } from "@@/components/layout";
import MailRuPixel from "@@/components/layout/Pixel/Pixel";
import YandexMetrika from "@@/components/layout/YandexMetrika/YandexMetrika";
import "@@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Задержка в 1 секунду
      const timer = setTimeout(scrollToHash, 300);

      return () => clearTimeout(timer);
    }
  }, [router.asPath]);
  return (
    <>
      <MailRuPixel />
      <YandexMetrika />
      <Header />
      <Component { ...pageProps } />
      <Footer />
    </>
  );
}
