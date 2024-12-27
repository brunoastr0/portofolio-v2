import React from "react";
import Tag from "../Tag";

export type ExperienceItemProps = {
  title: string;
  dateRange: string;
  description: string;
  tags?: string[];
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  dateRange,
  description,
  tags,
}) => {
  return (
    <li className="mb-12">
      <div className="group relative grid gap-16 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-8 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.2)] lg:group-hover:drop-shadow-lg"></div>
        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-yellow-500 sm:col-span-2"
          aria-label={dateRange}
        >
          {dateRange}
        </header>
        <div className="z-10 sm:order-2 sm:col-span-6">
          <p className="font-bold text-xl">{title}</p>
          <p>{description}</p>
          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
            {tags?.map((tag, index) => (
              <Tag key={index} title={tag} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default ExperienceItem;
