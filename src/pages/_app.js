import { Footer, Header } from "@@/components/layout";
import YandexMetrika from "@@/components/layout/YandexMetrika/YandexMetrika";
import "@@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <YandexMetrika />
      <Header />
      <Component { ...pageProps } />
      <Footer />
    </>
  );
}
