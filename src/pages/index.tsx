/* eslint-disable react/no-unescaped-entities */
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Layout } from "../components/Layout";
import ProjectItem from "@/components/ProjectItem";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, PostMeta } from "@/lib/posts";
import { servicesByLanguage } from "@/lib/services";

interface HomeProps {
  posts: PostMeta[];
}

const postImages: Record<string, string> = {
  "nhafarma-pharmacy-duty-platform": "/nhafarma-logo.svg",
  "divetribe-forms-platform": "/divetribe-logo.jpg",
  "school-management-api": "/database.png",
  "teaching-an-ai-to-drive": "/neural.png",
};

const postTranslations: Record<string, { title: string; description: string }> = {
  "nhafarma-pharmacy-duty-platform": {
    title: "Nhafarma: encontrar a farmácia de serviço em Cabo Verde",
    description: "As farmácias alternam os turnos noturnos. A Nhafarma ajuda a encontrar a farmácia de serviço sem esperar por um anúncio na rádio ou procurar nas notícias online.",
  },
  "divetribe-forms-platform": {
    title: "DiveTribe: substituir a prancheta num centro de mergulho",
    description: "Como um pedido para digitalizar formulários se tornou num fluxo de produção para mergulhadores e equipa.",
  },
  "school-management-api": {
    title: "Construir uma plataforma escolar a partir de um esboço",
    description: "A arquitetura de uma API escolar, com uploads diretos e um único responsável por cada regra difícil.",
  },
  "teaching-an-ai-to-drive": {
    title: "Ensinar uma IA a conduzir, uma falha de cada vez",
    description: "Sensores, física, neuroevolução e os incentivos inesperados de uma experiência de condução autónoma.",
  },
};

function SectionHeading({ label }: { label: string }) {
  return <p className="mb-10 text-sm font-medium uppercase tracking-widest text-accent">{label}</p>;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { language } = useLanguage();
  const copy = language === "pt"
    ? {
        title: "Engenheiro Informático",
        intro: "Olá, sou o Bruno — engenheiro informático",
        heroStart: "Construo produtos em que as pessoas podem confiar, do",
        design: "design",
        to: "à",
        deployment: "implementação",
        heroBody: "Engenheiro informático com foco em backend, desenvolvimento full-stack e redes, e com sensibilidade para o design. Crio plataformas usadas por pessoas reais e mantenho o software e a infraestrutura saudáveis em produção.",
        viewWork: "Ver trabalhos",
        download: "Descarregar CV",
        work: "Trabalhos selecionados",
        services: "Serviços",
        servicesTitle: "Do problema ao produto — e à infraestrutura que o suporta.",
        servicesLink: "Ver todos os serviços",
        about: "Sobre",
        aboutTitle: "Programador com sensibilidade para o design.",
        aboutBody: "Trabalho em toda a stack, mas o meu centro de gravidade é o backend: regras de domínio, APIs, permissões, dados e a infraestrutura que mantém um produto fiável.",
        brand: "é a minha marca pessoal — qualidade, entrega atempada e um serviço próximo.",
      }
    : {
        title: "Computer Engineer",
        intro: "Hi, I’m Bruno — computer engineer",
        heroStart: "I build products people can rely on, from",
        design: "design",
        to: "to",
        deployment: "deployment",
        heroBody: "Computer engineer focused on backend, full-stack development, and networks, with a designer’s eye. I ship web platforms used by real people, then keep their software and infrastructure healthy in production.",
        viewWork: "View my work",
        download: "Download CV",
        work: "Selected Work",
        services: "Services",
        servicesTitle: "From the problem to the product — and the infrastructure behind it.",
        servicesLink: "View all services",
        about: "About",
        aboutTitle: "Developer with a designer’s eye.",
        aboutBody: "I work across the stack, but my centre of gravity is the backend: domain rules, APIs, permissions, data, and the infrastructure that keeps a product dependable.",
        brand: "is my personal brand — top-notch quality, timely delivery, and exceptional customer service.",
      };

  const selectedWork = posts.slice(0, 4).map((post) => {
    const translated = language === "pt" ? postTranslations[post.slug] : null;
    return {
      title: translated?.title ?? post.title,
      description: translated?.description ?? post.description,
      imageSrc: postImages[post.slug] ?? "/database.png",
      imageAlt: translated?.title ?? post.title,
      imageFit: post.slug === "nhafarma-pharmacy-duty-platform" ? "contain" as const : "cover" as const,
      link: `/blog/${post.slug}`,
      featured: false,
      meta: post.tags.slice(0, 3),
    };
  });

  return (
    <>
      <NextSeo title={copy.title} description={copy.heroBody} canonical="https://www.brunoastro.cv" openGraph={{ url: "https://www.brunoastro.cv", title: `Bruno Ângelo — ${copy.title}`, description: copy.heroBody, images: [{ url: "/portofolio_cover.png", width: 487, height: 183, alt: "Bruno Ângelo portfolio", type: "image/png" }], siteName: "Bruno Ângelo Portfolio" }} twitter={{ handle: "@brunoastr0", site: "@brunoastr0", cardType: "summary_large_image" }} />
      <Layout>
        <section className="flex flex-col justify-center py-20 md:py-32" aria-label={copy.intro}>
          <Reveal>
            <div className="flex items-center gap-4">
              <Image src="/bruno.jpg" width={56} height={56} alt="Portrait of Bruno Ângelo" className="rounded-full border border-line" />
              <p className="text-lg text-ink-muted">{copy.intro}</p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              {copy.heroStart} <span className="underline decoration-accent-gold decoration-4 underline-offset-8">{copy.design}</span> {copy.to} <span className="underline decoration-accent-gold decoration-4 underline-offset-8">{copy.deployment}</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink-muted">{copy.heroBody}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#work" className="rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-colors hover:bg-ink-muted">{copy.viewWork}</a>
              <a href="/pdf/CV_BrunoAngelo.pdf" target="_blank" download="bruno_angelo_cv" className="rounded-full border border-line bg-surface px-6 py-3 font-medium text-ink transition-colors hover:border-ink">{copy.download}</a>
            </div>
          </Reveal>
        </section>

        <section id="work" className="scroll-mt-24 py-16 md:py-24" aria-label={copy.work}>
          <Reveal>
            <SectionHeading label={copy.work} />
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
              {selectedWork.map((project) => <ProjectItem key={project.link} {...project} />)}
            </ul>
          </Reveal>
        </section>

        <section id="services" className="scroll-mt-24 py-16 md:py-24" aria-label={copy.services}>
          <Reveal>
            <SectionHeading label={copy.services} />
            <div className="grid gap-10 md:grid-cols-8">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:col-span-3 md:text-4xl">{copy.servicesTitle}</h2>
              <div className="md:col-span-5">
                <ul className="grid gap-6 sm:grid-cols-2">
                  {servicesByLanguage[language].map((service) => (
                    <li key={service.title} className="border-t border-line pt-6">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{service.title}</h3>
                      <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                        {service.capabilities.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="mt-8 inline-block rounded-full border border-line bg-surface px-6 py-3 font-medium text-ink transition-colors hover:border-ink">{copy.servicesLink}</Link>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="about" className="scroll-mt-24 py-16 md:py-24" aria-label={copy.about}>
          <Reveal>
            <SectionHeading label={copy.about} />
            <div className="grid gap-10 md:grid-cols-8">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:col-span-3 md:text-4xl">{copy.aboutTitle}</h2>
              <div className="md:col-span-5">
                <p className="text-lg text-ink-muted">{copy.aboutBody}</p>
                <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-6">
                  <Image src="/astro_colored_1.svg" width={64} height={64} alt="Astro brand logo" />
                  <p className="text-ink-muted"><span className="font-semibold text-ink">Astro</span> {copy.brand}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({ props: { posts: getAllPosts() } });

export default Home;
