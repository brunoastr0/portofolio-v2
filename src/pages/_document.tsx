import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html className="scroll-smooth">
      <Head />
<<<<<<< HEAD
      <body className="bg-fixed  bg-app leading-relaxed antialiased selection:bg-slate-200 text-slate-300 selection:text-slate-700 ">
=======
      <body className="bg-app bg-cover bg-blend-darken">
>>>>>>> c1368c0 (commiting....)
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
