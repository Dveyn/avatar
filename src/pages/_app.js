import { Footer, Header } from "@@/components/layout";
import "@@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component { ...pageProps } />
      <Footer />
    </>
  );
}
