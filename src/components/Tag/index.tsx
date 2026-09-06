type tagProps = {
  title: string;
};

function Tag({ title }: tagProps) {
  return (
    <li className="mr-1.5 mt-2">
      <div className="flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium leading-5 text-ink-muted">
        {title}
      </div>
    </li>
  );
}

export default Tag;
