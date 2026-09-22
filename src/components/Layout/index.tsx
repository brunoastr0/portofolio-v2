import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Archivo, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { useLanguage } from "../LanguageProvider";
import { SocialsLinks } from "../SocialsLinks";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const copy = language === "pt"
    ? {
        work: "Trabalhos",
        services: "Serviços",
        about: "Sobre",
        contact: "Contacto",
        blog: "Artigos",
        resume: "Currículo",
        contactTitle: "Tem um projeto em mente? Vamos construí-lo juntos.",
        whatsapp: "Contactar via WhatsApp",
        languageLabel: "Mudar para inglês",
      }
    : {
        work: "Work",
        services: "Services",
        about: "About",
        contact: "Contact",
        blog: "Blogs",
        resume: "Résumé",
        contactTitle: "Have a project in mind? Let’s build it together.",
        whatsapp: "Contact on WhatsApp",
        languageLabel: "Mudar para português",
      };
  const navLinks = [
    { href: "/#work", label: copy.work },
    { href: "/services", label: copy.services },
    { href: "/#about", label: copy.about },
    { href: language === "pt" ? "/pt/blog" : "/blog", label: copy.blog },
  ];

  async function changeLanguage() {
    const nextLanguage = language === "en" ? "pt" : "en";
    setLanguage(nextLanguage);

    if (router.asPath.startsWith("/blog") && nextLanguage === "pt") {
      await router.push(`/pt${router.asPath}`);
    } else if (router.asPath.startsWith("/pt/blog") && nextLanguage === "en") {
      await router.push(router.asPath.replace(/^\/pt/, ""));
    }
  }

  return (
    <div className={`${archivo.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col`}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-site items-center justify-between px-6 py-4 md:px-10" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <Image src="/astro_colored_1.svg" width={32} height={32} alt="Astro logo" />
            <span className="font-display font-semibold tracking-tight hidden sm:block">Bruno Ângelo</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                  {label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={changeLanguage}
              aria-label={copy.languageLabel}
              className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {language === "en" ? "PT" : "EN"}
            </button>
            <a href="/pdf/CV_BrunoAngelo.pdf" target="_blank" download="bruno_angelo_cv" className="ml-2 hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-ink-muted md:block">
              {copy.resume}
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-site flex-1 px-6 md:px-10">{children}</main>

      <footer id="contact" className="border-t border-line">
        <div className="mx-auto max-w-site px-6 py-20 md:px-10 md:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{copy.contact}</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">{copy.contactTitle}</h2>
          <a href="mailto:brunoangelo.dev@gmail.com" className="mt-8 inline-block text-lg font-medium text-ink underline decoration-accent-gold decoration-2 underline-offset-8 transition-colors hover:text-accent md:text-2xl">
            brunoangelo.dev@gmail.com
          </a>
          <div className="mt-6">
            <a
              href="https://wa.me/2389780342"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-canvas transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {copy.whatsapp}
            </a>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-ink-faint">© {new Date().getFullYear()} Bruno Ângelo — Astro</p>
            <ul className="flex items-center gap-1" aria-label="Social media"><SocialsLinks /></ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
