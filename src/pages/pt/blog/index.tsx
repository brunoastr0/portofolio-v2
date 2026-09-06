import type { GetStaticProps } from "next";
import { BlogPage } from "../../blog";
import type { BlogPageProps } from "../../blog";
import { getAllPosts } from "@/lib/posts";

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => ({
  props: {
    posts: getAllPosts(),
    postsPt: getAllPosts("pt"),
    language: "pt",
  },
});

export default BlogPage;
