import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

interface PortfolioDocumentProps extends DocumentInitialProps {
  language: "en" | "pt-CV";
}

export default class PortfolioDocument extends Document<PortfolioDocumentProps> {
  static async getInitialProps(context: DocumentContext): Promise<PortfolioDocumentProps> {
    const initialProps = await Document.getInitialProps(context);
    const language = context.pathname.startsWith("/pt/") ? "pt-CV" : "en";

    return { ...initialProps, language };
  }

  render() {
    return (
      <Html lang={this.props.language} className="scroll-smooth">
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
}
