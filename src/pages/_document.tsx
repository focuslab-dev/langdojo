import { Html, Head, Main, NextScript } from "next/document";
import { BRAND_NAME } from "@/constants/brand";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content={BRAND_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={BRAND_NAME} />
        <meta
          name="description"
          content="Essential travel phrases in Japanese, Mandarin, Thai, Korean, French, and Spanish. Download Anki flashcards for your next trip."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192x192.png" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
