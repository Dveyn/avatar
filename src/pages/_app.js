import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer, Header } from "@@/components/layout";
import MailRuPixel from "@@/components/layout/Pixel/Pixel";
import YandexMetrika from "@@/components/layout/YandexMetrika/YandexMetrika";
import "@@/styles/globals.css";
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const hash = window.location.hash;
  
    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (el && document.body.contains(el)) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
  
      if ('requestIdleCallback' in window) {
        requestIdleCallback(scrollToHash);
      } else {
        setTimeout(scrollToHash, 50);
      }
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Script 
        src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"
        strategy="beforeInteractive"
      />
      <MailRuPixel />
      <YandexMetrika />
      <Header />
      <Component { ...pageProps } />
      <Footer />
    </>
  );
}
