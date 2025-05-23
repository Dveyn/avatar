import { About, AboutMe, AvatarExample, AvatarQuiz, Footer, IntroBlock, ISP, Method, ToolDescription, WhoAreAvatars, Reviews } from "@@/components/layout";
import Head from "next/head";

export default function Home() {
  const pageTitle = "Метод Аватаров: самопознание по дате рождения, матрица судьбы";
  const pageDescription = "Метод Аватаров – инструмент самопознания, основанный на дате рождения. Он сочетает психологические принципы, типирование личности, архетипы, IFS-терапию и коучинг. Матрица судьбы помогает раскрыть ресурсы, понять цели и управлять энергией, а также получить прогностику.";
  const pageUrl = "https://avalik-avatar.ru/";
  const siteName = "Аватары";
  const imageUrl = "https://avalik-avatar.ru/favicon.png";

  return (
    <>
      <Head>
        {/* Основные метатеги */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="матрица судьбы, типы личности, матрица судьбы рассчитать, самопознание, внутреннее я, личные ресурсы, прогностика, внутренний баланс, внутренняя энергия человека, ifs терапия, типирование личности, психологические архетипы, аналитика и прогностика, прогностика на год, аватар воин, прогностика в матрице, как работать аватар, аватар личность, прогностика в матрице судьбы, прогностика по дате рождения, прогностика онлайн, энергии аватаров, расшифровка прогностики, анализ личности по дате рождения, как управляют аватаром, ifs подход, метод аватаров, как узнать своего аватара, психологическое типирование, творец аватара, аватар мудрец, калькулятор аватар, аватары расшифровка" />
  
        {/* Каноническая ссылка */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph метатеги (для соцсетей) */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card (опционально) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Микроразметка Schema.org (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": imageUrl
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": imageUrl
            }
          })}
        </script>
      </Head>

      <IntroBlock />
      <ISP />
      <Reviews />
      <About />
      <AvatarQuiz />
      <WhoAreAvatars />
      <Method />
      <AvatarExample />
      <ToolDescription />
      <AboutMe />
    </>
  );
}
