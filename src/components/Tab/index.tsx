import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "about", label: "About" },
  { id: "project", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

export function Tab(): JSX.Element {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(({ id }) => {
        const section = document.querySelector(`#${id}`);
        return section
          ? section.getBoundingClientRect().top + window.scrollY
          : Number.MAX_SAFE_INTEGER;
      });

      const scrollY = window.scrollY;

      for (let i = 0; i < offsets.length; i++) {
        if (
          scrollY <= offsets[i] &&
          (i === offsets.length - 1 || scrollY < offsets[i + 1])
        ) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (section: string) => {
    setActiveSection(section);
    const target = document.querySelector(`#${section}`);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="w-max">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              className={`group flex items-center py-3 ${
                activeSection === id ? "active" : ""
              }`}
              href={`#${id}`}
              onClick={() => handleClick(id)}
            >
              <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200]"></span>
              <span className="nav-text">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
