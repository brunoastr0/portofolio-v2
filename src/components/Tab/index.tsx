import Head from "next/head";
import Image from "next/image";

import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
}

export function Tab(): JSX.Element {
  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="w-max">
        <li>
          <a className="group flex items-center py-3 " href="#about">
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200] group-hover:w-16 group-focus-visible:bg-[slate-200] motion-reduce:transition-none">
              {" "}
            </span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-white/[.5] group-hover:text-[slate-200] group-focus-visible:text-[slate-200]">
              About
            </span>
          </a>
        </li>
        <li>
          <a className="group flex items-center py-3 active" href="#project">
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200] group-hover:w-16 group-focus-visible:w-1/2 group-focus-visible:bg-[slate-200] motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-white/[.5]  group-hover:text-[slate-200] group-focus-visible:text-[slate-200]">
              Projects
            </span>
          </a>
        </li>
        <li>
          <a className="group flex items-center py-3 " href="#experience">
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200] group-hover:w-16 group-focus-visible:w-1/2 group-focus-visible:bg-[slate-200] motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-white/[.5] group-focus-visible:w-1/2 group-hover:text-[slate-200] group-focus-visible:text-[slate-200]">
              Experience
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
