import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");
export type PostLanguage = "en" | "pt";

function directoryFor(language: PostLanguage): string {
  return language === "pt" ? path.join(postsDirectory, "pt") : postsDirectory;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  client: string | null;
  technologies: string[];
}

export function getAllPosts(language: PostLanguage = "en"): PostMeta[] {
  const directory = directoryFor(language);
  if (!fs.existsSync(directory)) return language === "pt" ? getAllPosts("en") : [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        image: data.image ?? `/social/${slug}-${language}.png`,
        imageAlt: data.imageAlt ?? data.title ?? slug,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string, language: PostLanguage = "en"): Promise<Post> {
  const localizedPath = path.join(directoryFor(language), `${slug}.md`);
  const postPath = fs.existsSync(localizedPath)
    ? localizedPath
    : path.join(postsDirectory, `${slug}.md`);
  const raw = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  // Apply after Markdown sanitization so the live-app link retains its policy.
  const contentHtml = processed.toString().replace(
    /<a href="https:\/\/nhafarma\.cv\/?">/g,
    '<a href="https://nhafarma.cv" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">'
  );

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    image: data.image ?? `/social/${slug}-${language}.png`,
    imageAlt: data.imageAlt ?? data.title ?? slug,
    contentHtml,
    client: typeof data.client === "string" ? data.client : null,
    technologies: Array.isArray(data.technologies)
      ? data.technologies.filter((value: unknown): value is string => typeof value === "string")
      : [],
  };
}
