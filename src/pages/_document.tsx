import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head />
      <body className="bg-app bg-cover bg-blend-darken">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
