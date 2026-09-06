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
    <li className="grid gap-2 border-t border-line py-8 sm:grid-cols-8 sm:gap-8">
      <p
        className="text-sm font-medium uppercase tracking-widest text-ink-faint sm:col-span-2 sm:mt-1"
        aria-label={dateRange}
      >
        {dateRange}
      </p>
      <div className="sm:col-span-6">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-ink-muted">{description}</p>
        {tags && tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
            {tags.map((tag, index) => (
              <Tag key={index} title={tag} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default ExperienceItem;
