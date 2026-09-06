import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { Layout } from "@/components/Layout";
import { ShareButtons } from "@/components/ShareButtons";
import Tag from "@/components/Tag";
import { getAllPosts, getPost } from "@/lib/posts";
import type { Post, PostMeta } from "@/lib/posts";
import { formatPostDate } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";
import {
  absoluteUrl,
  AUTHOR_URL,
  postPath,
  postUrl,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/seo";
import type { Language } from "@/components/LanguageProvider";

export interface PostPageProps {
  post: Post;
  postPt: Post;
  related: PostMeta[];
  relatedPt: PostMeta[];
  language: Language;
}

export const PostPage: NextPage<PostPageProps> = ({ post, postPt, related, relatedPt }) => {
  const { language } = useLanguage();
  const currentPost = language === "pt" ? postPt : post;
  const currentRelated = language === "pt" ? relatedPt : related;
  const currentUrl = postUrl(currentPost.slug, language);
  const socialImage = absoluteUrl(currentPost.image);
  const copy = language === "pt"
    ? {
        allPosts: "Todos os artigos",
        author: "Engenheiro informático em Cabo Verde, a construir produtos digitais completos — da modelação e interface até à produção.",
        keepReading: "Continuar a ler",
        relatedPosts: "Artigos relacionados",
        imageAlt: currentPost.imageAlt,
      }
    : {
        allPosts: "All posts",
        author: "Computer engineer in Cabo Verde, building complete digital products — from domain modelling and interface to production.",
        keepReading: "Keep reading",
        relatedPosts: "Related posts",
        imageAlt: currentPost.imageAlt,
      };

  return (
    <>
      <NextSeo
        title={currentPost.title}
        description={currentPost.description}
        canonical={currentUrl}
        languageAlternates={[
          { hrefLang: "en", href: postUrl(currentPost.slug, "en") },
          { hrefLang: "pt-CV", href: postUrl(currentPost.slug, "pt") },
          { hrefLang: "x-default", href: postUrl(currentPost.slug, "en") },
        ]}
        robotsProps={{ maxImagePreview: "large" }}
        additionalMetaTags={[
          { name: "author", content: "Bruno Ângelo" },
          {
            property: "og:locale:alternate",
            content: language === "pt" ? "en_US" : "pt_CV",
          },
          { name: "twitter:title", content: currentPost.title },
          { name: "twitter:description", content: currentPost.description },
          { name: "twitter:image", content: socialImage },
          { name: "twitter:image:alt", content: copy.imageAlt },
        ]}
        openGraph={{
          url: currentUrl,
          title: currentPost.title,
          description: currentPost.description,
          type: "article",
          locale: language === "pt" ? "pt_CV" : "en_US",
          siteName: SITE_NAME,
          images: [{
            url: socialImage,
            width: SOCIAL_IMAGE_WIDTH,
            height: SOCIAL_IMAGE_HEIGHT,
            alt: copy.imageAlt,
            type: "image/png",
          }],
          article: {
            publishedTime: currentPost.date,
            authors: [AUTHOR_URL],
            section: currentPost.tags[0],
            tags: currentPost.tags,
          },
        }}
        twitter={{ handle: "@brunoastr0", site: "@brunoastr0", cardType: "summary_large_image" }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={currentUrl}
        title={currentPost.title}
        images={[socialImage]}
        datePublished={currentPost.date}
        authorName={{ name: "Bruno Ângelo", url: AUTHOR_URL, type: "Person" }}
        publisherName={SITE_NAME}
        publisherLogo={`${SITE_URL}/astro_colored_1.svg`}
        description={currentPost.description}
        isAccessibleForFree
      />
      <Layout>
        <article className="py-20 md:py-28">
          <header className="mx-auto max-w-3xl">
            <Link
              href={language === "pt" ? "/pt/blog" : "/blog"}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
              {copy.allPosts}
            </Link>
            {currentPost.tags.length > 0 && (
              <p className="mt-8 text-sm font-medium uppercase tracking-widest text-accent">
                {currentPost.tags[0]}
              </p>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {currentPost.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted md:text-xl">
              {currentPost.description}
            </p>
            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-ink-faint">
              Bruno Ângelo · <time dateTime={currentPost.date}>{formatPostDate(currentPost.date, language === "pt" ? "pt-PT" : "en-US")}</time>
            </p>
          </header>

          <div
            className="prose prose-stone mx-auto mt-12 max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-a:decoration-accent-gold prose-a:decoration-2 prose-a:underline-offset-4 prose-blockquote:border-l-accent-gold prose-blockquote:font-display prose-blockquote:text-xl prose-blockquote:not-italic prose-blockquote:font-medium"
            dangerouslySetInnerHTML={{ __html: currentPost.contentHtml }}
          />

          <ShareButtons
            title={currentPost.title}
            description={currentPost.description}
            url={currentUrl}
            language={language}
          />

          {/* Author footer */}
          <footer className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
            <div className="flex items-start gap-4">
              <Image
                src="/bruno.jpg"
                width={56}
                height={56}
                alt="Portrait of Bruno Ângelo"
                className="rounded-full border border-line"
              />
              <div>
                <p className="font-display font-semibold">Bruno Ângelo</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {copy.author}
                </p>
              </div>
            </div>
          </footer>

          {/* Related posts */}
          {currentRelated.length > 0 && (
            <aside
              className="mx-auto mt-16 max-w-3xl"
              aria-label={copy.relatedPosts}
            >
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                {copy.keepReading}
              </p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {currentRelated.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={postPath(r.slug, language)}
                      className="group block h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <div className="h-1.5 w-10 rounded-full bg-accent-gold" />
                      <h3 className="mt-4 font-display font-semibold leading-snug transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      <p className="clamp-2 mt-2 text-sm text-ink-muted">
                        {r.description}
                      </p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-widest text-ink-faint">
                        <time dateTime={r.date}>{formatPostDate(r.date, language === "pt" ? "pt-PT" : "en-US")}</time>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </article>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = params!.slug as string;
  const post = await getPost(slug);
  const postPt = await getPost(slug, "pt");
  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const relatedPt = getAllPosts("pt")
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  return { props: { post, postPt, related, relatedPt, language: "en" } };
};

export default PostPage;
