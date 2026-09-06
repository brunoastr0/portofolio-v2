import type { PostLanguage } from "./posts";

export const SITE_URL = "https://www.brunoastro.cv";
export const SITE_NAME = "Bruno Ângelo";
export const AUTHOR_URL = `${SITE_URL}/#about`;
export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function blogUrl(language: PostLanguage): string {
  return `${SITE_URL}${language === "pt" ? "/pt" : ""}/blog`;
}

export function postUrl(slug: string, language: PostLanguage): string {
  return `${blogUrl(language)}/${slug}`;
}

export function postPath(slug: string, language: PostLanguage): string {
  return `${language === "pt" ? "/pt" : ""}/blog/${slug}`;
}

export function socialImagePath(slug: string, language: PostLanguage): string {
  return `/social/${slug}-${language}.png`;
}

export function localizedBlogPath(language: PostLanguage): string {
  return `${language === "pt" ? "/pt" : ""}/blog`;
}
