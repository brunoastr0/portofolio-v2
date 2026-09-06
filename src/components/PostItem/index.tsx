import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatPostDate } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";

const PostItem: React.FC<PostMeta> = ({ slug, title, date, description }) => {
  const { language } = useLanguage();

  return <li className="border-t border-line">
    <Link
      href={`/blog/${slug}`}
      className="group grid gap-2 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-8 sm:gap-8"
    >
      <p className="text-sm font-medium uppercase tracking-widest text-ink-faint sm:col-span-2 sm:mt-1">
        <time dateTime={date}>{formatPostDate(date, language === "pt" ? "pt-PT" : "en-US")}</time>
      </p>
      <div className="sm:col-span-6">
        <span className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {title}
          </h3>
          <svg
            className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
        <p className="mt-2 max-w-xl text-ink-muted">{description}</p>
      </div>
    </Link>
  </li>;
};

export default PostItem;
