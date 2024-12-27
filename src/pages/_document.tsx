import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html className="scroll-smooth">
      <Head />
      <body className="bg-fixed  bg-app leading-relaxed antialiased selection:bg-slate-200 text-slate-300 selection:text-slate-700 ">
        <NextScript />
      </body>
    </Html>
  );
}
