import Image from "next/image"; // Assuming you're using Next.js for optimized images.
interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
}

const ProjectItem: React.FC<Project> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
}) => (
  <li className="mb-12">
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.2)] lg:group-hover:drop-shadow-lg"></div>

      <div className="z-10 sm:order-2 sm:col-span-6">
        <h3>
          <a
            href={`${link ? link : "#"}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Learn more about ${title}`}
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-white hover:text-xl focus-visible:text-white group/link text-base"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            <span>{title}</span>
          </a>
        </h3>
        <p className="mt-2 text-sm leading-normal">{description}</p>
      </div>

      <Image
        src={imageSrc}
        width={200}
        height={48}
        className="rounded border-3 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
        alt={imageAlt}
      />
    </div>
  </li>
);

export default ProjectItem;
