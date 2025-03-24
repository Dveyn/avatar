import { Footer, Header } from "@@/components/layout";
import MailRuPixel from "@@/components/layout/Pixel/Pixel";
import YandexMetrika from "@@/components/layout/YandexMetrika/YandexMetrika";
import "@@/styles/globals.css";

export default function App({ Component, pageProps }) {
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
