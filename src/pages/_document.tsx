import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </Head>
      <body className="bg-canvas text-ink antialiased leading-relaxed">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
