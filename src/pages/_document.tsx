import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head />
      <body className="bg-app leading-relaxed antialiased selection:bg-slate-200 selection:text-slate-700 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
