type tagProps = {
  title: string;
};

function Tag({ title }: tagProps) {
  return (
    <li className="mr-1.5 mt-2">
      <div className="flex items-center rounded-full bg-white/40  px-3 py-1 text-xs font-bold leading-5 text-black ">
        {title}
      </div>
    </li>
  );
}

export default Tag;
