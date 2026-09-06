import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/posts";
import { blogUrl, postUrl, SITE_URL } from "@/lib/seo";

function sitemapEntry({
  url,
  lastModified,
  englishUrl,
  portugueseUrl,
}: {
  url: string;
  lastModified?: string;
  englishUrl?: string;
  portugueseUrl?: string;
}) {
  const alternates = englishUrl && portugueseUrl
    ? `
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}" />
    <xhtml:link rel="alternate" hreflang="pt-CV" href="${portugueseUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}" />`
    : "";

  return `
  <url>
    <loc>${url}</loc>${lastModified ? `
    <lastmod>${lastModified}</lastmod>` : ""}${alternates}
  </url>`;
}

function buildSitemap() {
  const posts = getAllPosts();
  const staticPages = [
    sitemapEntry({ url: SITE_URL }),
    sitemapEntry({ url: `${SITE_URL}/services` }),
    sitemapEntry({
      url: blogUrl("en"),
      englishUrl: blogUrl("en"),
      portugueseUrl: blogUrl("pt"),
    }),
    sitemapEntry({
      url: blogUrl("pt"),
      englishUrl: blogUrl("en"),
      portugueseUrl: blogUrl("pt"),
    }),
  ];
  const articlePages = posts.flatMap((post) => {
    const englishUrl = postUrl(post.slug, "en");
    const portugueseUrl = postUrl(post.slug, "pt");

    return [
      sitemapEntry({
        url: englishUrl,
        lastModified: post.date,
        englishUrl,
        portugueseUrl,
      }),
      sitemapEntry({
        url: portugueseUrl,
        lastModified: post.date,
        englishUrl,
        portugueseUrl,
      }),
    ];
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[
    ...staticPages,
    ...articlePages,
  ].join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
