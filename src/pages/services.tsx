import type { NextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { servicesByLanguage, technologyGroups } from "@/lib/services";
import {
  absoluteUrl,
  postPath,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/seo";

const ServicesPage: NextPage = () => {
  const { language } = useLanguage();
  const copy = language === "pt"
    ? {
        title: "Serviços",
        heading: "Do problema ao sistema que o resolve.",
        intro: "Trabalho com equipas e organizações para analisar necessidades, desenhar software e infraestrutura, e melhorar sistemas existentes com clareza e fiabilidade.",
        technologies: "Tecnologias utilizadas",
        work: "Ver trabalhos selecionados",
        proof: "Trabalho relacionado",
        proofTitle: "Serviços aplicados a sistemas reais.",
        readCaseStudy: "Ler caso de estudo",
        caseStudies: [
          {
            title: "Nhafarma",
            description: "Encontrar a farmácia de serviço em Cabo Verde, com pesquisa por ilha e cidade.",
            href: "/blog/nhafarma-pharmacy-duty-platform",
          },
          {
            title: "DiveTribe",
            description: "Um fluxo full-stack de formulários, assinaturas e entrega de documentos.",
            href: "/blog/divetribe-forms-platform",
          },
          {
            title: "Plataforma escolar",
            description: "Modelação de domínio, controlo de acesso e uploads diretos para uma API escolar.",
            href: "/blog/school-management-api",
          },
        ],
      }
    : {
        title: "Services",
        heading: "From the problem to the system that solves it.",
        intro: "I work with teams and organisations to analyse needs, design software and infrastructure, and improve existing systems with clarity and reliability.",
        technologies: "Technologies used",
        work: "View selected work",
        proof: "Related work",
        proofTitle: "Services applied to real systems.",
        readCaseStudy: "Read case study",
        caseStudies: [
          {
            title: "Nhafarma",
            description: "Finding the pharmacy on duty in Cabo Verde, with lookup by island and city.",
            href: "/blog/nhafarma-pharmacy-duty-platform",
          },
          {
            title: "DiveTribe",
            description: "A full-stack workflow for forms, signatures, and document delivery.",
            href: "/blog/divetribe-forms-platform",
          },
          {
            title: "School platform",
            description: "Domain modelling, access control, and direct uploads for a school API.",
            href: "/blog/school-management-api",
          },
        ],
      };

  return (
    <>
      <NextSeo
        title={copy.title}
        description={copy.intro}
        canonical={`${SITE_URL}/services`}
        robotsProps={{ maxImagePreview: "large" }}
        openGraph={{
          url: `${SITE_URL}/services`,
          title: copy.heading,
          description: copy.intro,
          locale: language === "pt" ? "pt_CV" : "en_US",
          type: "website",
          siteName: SITE_NAME,
          images: [{
            url: absoluteUrl(`/social/home-${language}.png`),
            width: SOCIAL_IMAGE_WIDTH,
            height: SOCIAL_IMAGE_HEIGHT,
            alt: `Bruno Ângelo — ${copy.title}`,
            type: "image/png",
          }],
        }}
        twitter={{ handle: "@brunoastr0", site: "@brunoastr0", cardType: "summary_large_image" }}
      />
      <Layout>
        <section className="py-20 md:py-28" aria-labelledby="services-title">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{copy.title}</p>
            <h1 id="services-title" className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {copy.heading}
            </h1>

            <ul className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-2">
              {servicesByLanguage[language].map((service) => (
                <li key={service.title} className="border-t border-line pt-6">
                  <h2 className="font-display text-2xl font-semibold tracking-tight">{service.title}</h2>
                  <ul className="mt-6 space-y-3 text-ink-muted">
                    {service.capabilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="py-16 md:py-24" aria-labelledby="technologies-title">
          <Reveal>
            <h2 id="technologies-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{copy.technologies}</h2>
            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {technologyGroups.map((group) => (
                <div key={group.title.en} className="border-t border-line pt-5">
                  <h3 className="text-sm font-medium uppercase tracking-widest text-accent">{group.title[language]}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((technology) => (
                      <li key={technology} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink">{technology}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="py-16 pb-24 md:py-24 md:pb-32" aria-labelledby="related-work-title">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{copy.proof}</p>
            <h2 id="related-work-title" className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">{copy.proofTitle}</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.caseStudies.map((study) => (
                <li key={study.href}>
                    <Link href={postPath(study.href.replace("/blog/", ""), language)} className="group block h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">{study.title}</h3>
                    <p className="mt-3 text-sm text-ink-muted">{study.description}</p>
                    <p className="mt-6 text-sm font-medium text-accent">{copy.readCaseStudy} →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </Layout>
    </>
  );
};

export default ServicesPage;
