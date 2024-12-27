import { useEffect, useState } from "react";

export function Tab(): JSX.Element {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        document.querySelector("#about"),
        document.querySelector("#project"),
        document.querySelector("#experience"),
        document.querySelector("#education"),
      ];

      const offsets = sections.map((section) =>
        section
          ? section.getBoundingClientRect().top + window.scrollY
          : Number.MAX_SAFE_INTEGER
      );

      const scrollY = window.scrollY;

      if (scrollY <= offsets[0] && scrollY < offsets[1]) {
        setActiveSection("about");
      } else if (scrollY <= offsets[1] && scrollY < offsets[2]) {
        setActiveSection("project");
      } else if (scrollY <= offsets[2] && scrollY < offsets[3]) {
        setActiveSection("experience");
      } else if (scrollY <= offsets[3]) {
        setActiveSection("education");
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add a click event listener to immediately update the active section
  const handleClick = (section: string) => {
    setActiveSection(section);

    // Scroll to the section (optional for smooth scrolling)
    const target = document.querySelector(`#${section}`);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="w-max">
        <li>
          <a
            className={`group flex items-center py-3 ${
              activeSection === "about" ? "active" : ""
            }`}
            href="#about"
            onClick={() => handleClick("about")}
          >
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200]"></span>
            <span className="nav-text">About</span>
          </a>
        </li>
        <li>
          <a
            className={`group flex items-center py-3 ${
              activeSection === "project" ? "active" : ""
            }`}
            href="#project"
            onClick={() => handleClick("project")}
          >
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200]"></span>
            <span className="nav-text">Projects</span>
          </a>
        </li>
        <li>
          <a
            className={`group flex items-center py-3 ${
              activeSection === "experience" ? "active" : ""
            }`}
            href="#experience"
            onClick={() => handleClick("experience")}
          >
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200]"></span>
            <span className="nav-text">Experience</span>
          </a>
        </li>
        <li>
          <a
            className={`group flex items-center py-3 ${
              activeSection === "education" ? "active" : ""
            }`}
            href="#education"
            onClick={() => handleClick("education")}
          >
            <span className="nav-indicator mr-4 h-px w-8 transition-all bg-white/[.5] group-hover:bg-[slate-200]"></span>
            <span className="nav-text">Education</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
