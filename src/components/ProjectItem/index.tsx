import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
  featured?: boolean;
  meta?: string[];
  imageFit?: "cover" | "contain";
}

const ProjectItem: React.FC<Project> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  featured = false,
  meta = [],
  imageFit = "cover",
}) => (
  <li className={featured ? "md:col-span-2" : ""}>
    <Link
      href={link ?? "#"}
      target={link?.startsWith("/") ? undefined : "_blank"}
      rel={link?.startsWith("/") ? undefined : "noreferrer noopener"}
      aria-label={`View project: ${title}`}
      className={`group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        featured ? "block md:grid md:grid-cols-[1.15fr_1fr] md:gap-8" : "block"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-line ${
          imageFit === "contain" ? "bg-white" : "bg-surface"
        } ${
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[25rem]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={featured ? "(min-width: 768px) 72rem, 100vw" : "(min-width: 768px) 36rem, 100vw"}
          className={`${imageFit === "contain" ? "object-contain p-10 sm:p-14" : "object-cover"} transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
        />
      </div>
      <div className={featured ? "md:flex md:flex-col md:justify-center" : ""}>
        {meta.length > 0 && (
          <ul className={`mt-4 flex flex-wrap gap-2 ${featured ? "md:mt-0" : ""}`} aria-label={`${title} details`}>
            {meta.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className={`font-display font-semibold tracking-tight transition-colors group-hover:text-accent ${featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {title}
          </h3>
          <svg
            className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </div>
        <p className={`mt-2 text-ink-muted ${featured ? "md:text-lg" : "max-w-xl"}`}>{description}</p>
      </div>
    </Link>
  </li>
);

export default ProjectItem;
