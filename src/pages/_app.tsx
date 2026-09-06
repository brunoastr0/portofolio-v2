import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import "../styles/globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider initialLanguage={pageProps.language}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
