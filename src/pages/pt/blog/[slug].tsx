import type { GetStaticPaths, GetStaticProps } from "next";
import { PostPage } from "../../blog/[slug]";
import type { PostPageProps } from "../../blog/[slug]";
import { getAllPosts, getPost } from "@/lib/posts";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts("pt").map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params!.slug as string;
  const post = await getPost(slug);
  const postPt = await getPost(slug, "pt");
  const related = getAllPosts().filter((item) => item.slug !== slug).slice(0, 3);
  const relatedPt = getAllPosts("pt").filter((item) => item.slug !== slug).slice(0, 3);

  return {
    props: { post, postPt, related, relatedPt, language: "pt" },
  };
};

export default PostPage;
