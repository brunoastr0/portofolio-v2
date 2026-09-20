import type { Post } from "@/lib/posts";
import type { Language } from "@/components/LanguageProvider";

export function BlogDetails({ post, language }: { post: Post; language: Language }) {
  const pt = language === "pt";
  return (
    <aside className="blog-details" aria-label={pt ? "Detalhes do artigo" : "Article details"}>
      <dl>
        <div><dt>{pt ? "Ano" : "Year"}</dt><dd>{post.date.slice(0, 4)}</dd></div>
        {post.client && <div><dt>{pt ? "Cliente" : "Client"}</dt><dd>{post.client}</dd></div>}
        {post.technologies.length > 0 ? (
          <div><dt>{pt ? "Tecnologias" : "Built with"}</dt><dd>{post.technologies.join(" · ")}</dd></div>
        ) : post.tags.length > 0 && (
          <div><dt>{pt ? "Temas" : "Topics"}</dt><dd>{post.tags.join(" · ")}</dd></div>
        )}
      </dl>
    </aside>
  );
}
