import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, PostMeta } from "@/lib/posts";
import { useLanguage } from "@/components/LanguageProvider";

interface BlogPageProps {
  posts: PostMeta[];
  postsPt: PostMeta[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts, postsPt }) => {
  const { language } = useLanguage();
  const displayedPosts = language === "pt" ? postsPt : posts;
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
      canonical="https://www.brunoastro.cv/blog"
      openGraph={{
        url: "https://www.brunoastro.cv/blog",
        title: copy.title,
        description: copy.description,
      }}
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
  props: { posts: getAllPosts(), postsPt: getAllPosts("pt") },
});

export default BlogPage;
