import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, PostMeta } from "@/lib/posts";
import { useLanguage } from "@/components/LanguageProvider";
import {
  absoluteUrl,
  blogUrl,
  SITE_NAME,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/seo";
import type { Language } from "@/components/LanguageProvider";

export interface BlogPageProps {
  posts: PostMeta[];
  postsPt: PostMeta[];
  language: Language;
}

export const BlogPage: NextPage<BlogPageProps> = ({ posts, postsPt }) => {
  const { language } = useLanguage();
  const displayedPosts = language === "pt" ? postsPt : posts;
  const currentUrl = blogUrl(language);
  const socialImage = absoluteUrl(`/social/blog-${language}.png`);
  const copy = language === "pt"
    ? {
        title: "Artigos",
        heading: "Notas sobre construir coisas.",
        description: "Escrevo sobre desenvolvimento de software, decisões de produto e lições de projetos reais.",
        empty: "Ainda não há artigos. Volte em breve.",
      }
    : {
        title: "Writing",
        heading: "Notes on building things.",
        description: "Writing about software development, product decisions, and lessons from real projects.",
        empty: "No posts yet — check back soon.",
      };

  return <>
    <NextSeo
      title={copy.title}
      description={copy.description}
      canonical={currentUrl}
      languageAlternates={[
        { hrefLang: "en", href: blogUrl("en") },
        { hrefLang: "pt-CV", href: blogUrl("pt") },
        { hrefLang: "x-default", href: blogUrl("en") },
      ]}
      robotsProps={{ maxImagePreview: "large" }}
      additionalMetaTags={[
        {
          property: "og:locale:alternate",
          content: language === "pt" ? "en_US" : "pt_CV",
        },
        { name: "twitter:title", content: copy.title },
        { name: "twitter:description", content: copy.description },
        { name: "twitter:image", content: socialImage },
        { name: "twitter:image:alt", content: copy.heading },
      ]}
      openGraph={{
        url: currentUrl,
        title: copy.title,
        description: copy.description,
        type: "website",
        locale: language === "pt" ? "pt_CV" : "en_US",
        siteName: SITE_NAME,
        images: [{
          url: socialImage,
          width: SOCIAL_IMAGE_WIDTH,
          height: SOCIAL_IMAGE_HEIGHT,
          alt: copy.heading,
          type: "image/png",
        }],
      }}
      twitter={{ handle: "@brunoastr0", site: "@brunoastr0", cardType: "summary_large_image" }}
    />
    <Layout>
      <section className="py-20 md:py-28" aria-label={copy.title}>
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {copy.title}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {copy.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">
            {copy.description}
          </p>
          {displayedPosts.length > 0 ? (
            <ul className="mt-16">
              {displayedPosts.map((post) => (
                <PostItem key={post.slug} {...post} />
              ))}
            </ul>
          ) : (
            <p className="mt-16 border-t border-line pt-8 text-ink-muted">
              {copy.empty}
            </p>
          )}
        </Reveal>
      </section>
    </Layout>
  </>;
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => ({
  props: { posts: getAllPosts(), postsPt: getAllPosts("pt"), language: "en" },
});

export default BlogPage;
