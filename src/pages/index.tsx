/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/Layout";
import { SocialsLinks } from "@/components/SocialsLinks";
import ProjectItem from "@/components/ProjectItem";
import ExperienceItem, {
  ExperienceItemProps,
} from "@/components/ExpereinceItem";
import Script from "next/script";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "NewBlue",
    description:
      "Designed and developed the NewBlue website, emphasizing the importance of nature conservation in Cabo Verde and beyond. The platform highlights initiatives aimed at preserving the environment and raising awareness about global ecological issues.",
    imageSrc: "/newblue.jpg",
    imageAlt: "NewBlue website showcasing nature conservation efforts",
    link: "https://www.newblue.cv",
  },
  {
    title: "AI Agent learns to drive",
    description:
      "Given a track, an AI agent will learn how to drive in that ambient.",
    imageSrc: "/neural.png",
    imageAlt: "AI Agent learning to drive",
    link: "https://github.com/brunoastr0/self_driving_car",
  },
  {
    title: "Multi-Tenant Platform Backend",
    description:
      "A backend solution designed for a multi-tenant application, enabling seamless data isolation and scalability for multiple clients.",
    imageSrc: "/database.png",
    imageAlt: "Multi-Tenant Backend Platform",
    link: "https://github.com/brunoastr0/my-shop-backend",
  },
];

const experienceData: ExperienceItemProps[] = [
  {
    title: "IT at ZoneTech",
    dateRange: "2024 — Present",
    description:
      "Currently contributing to the IT operations at ZoneTech, focusing on maintaining and optimizing technology infrastructure. Leveraging knowledge in engineering and computer science, I troubleshoot complex systems, implement solutions, and support the development of innovative tools.",
  },
  {
    title: "Supermarket Employee at Pilar Vermelho",
    dateRange: "April 2023 — September 2023",
    description:
      "Worked as a supermarket employee, balancing responsibilities like stock repositioning, managing the charcuterie section, and operating the cash register. This role honed organizational skills, attention to detail, and customer service abilities while contributing to the store's operations.",
    tags: ["Primavera"],
  },
  {
    title: "Trainee at Akira Corporation",
    dateRange: "2021 — 2022",
    description:
      "Contributed to innovative web applications using technologies like React, TypeScript, and Laravel. Gained hands-on experience with Docker for containerized deployments and collaborated on scalable solutions.",
    tags: [
      "JavaScript",
      "React",
      "TypeScript",
      "CSS",
      "Laravel",
      "Docker",
      "NodeJs",
    ],
  },
];

const educationData: ExperienceItemProps[] = [
  {
    title: "Engineering Degree",
    dateRange: "2019 — 2025",
    description:
      "Attending an engineering and computer science university has been a transformative journey. Tackling challenging coursework and projects honed my critical thinking and creativity while developing teamwork, communication, and resilience skills.",
    tags: [
      "JavaScript",
      "Python",
      "C",
      "Assembly",
      "Network",
      "Telecommunications",
    ],
  },
  {
    title: "Tech and Management",
    dateRange: "2017 — 2019",
    description:
      "Studying Tech and Management in high school was a transformative experience that provided a strong foundation in technology, organizational principles, and marketing strategies. Through rigorous coursework and practical projects, I honed my problem-solving abilities, enhanced my creativity, and developed essential skills like teamwork, effective communication, and adaptability—preparing me for future academic and professional challenges.",
    tags: ["MSExcel", "MSWord", "MSPPT"],
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <Script src="/js/index.js" strategy="lazyOnload" />

      {/* About Section */}
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="About me"
      >
        <h2 className="text-lg font-bold mb-4">About Me</h2>
        <div>
          <p className="mb-4">
            Hi, <span className="text-[#FFD700]">I’m Bruno</span>, a software
            developer currently finishing my engineering degree. I have
            experience in web development with agile methodologies and have
            built projects using various technologies. Besides software
            development, I’m passionate about design and aesthetics.
          </p>
          <Image
            src="/astro_colored_1.svg"
            width={100}
            height={100}
            alt="Astro Logo"
          />
          <p className="mt-4">
            Astro is my personal brand where you can expect top-notch quality,
            timely delivery, and exceptional customer service.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="project"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="Projects"
      >
        <h2 className="text-lg font-bold mb-4">Projects</h2>
        <ul className="group/list">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="Experience"
      >
        <h2 className="text-lg font-bold mb-4">Experience</h2>
        <ul className="group/list">
          {experienceData.map((item, index) => (
            <ExperienceItem key={index} {...item} />
          ))}
        </ul>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="Education"
      >
        <h2 className="text-lg font-bold mb-4">Education</h2>
        <ul className="group/list">
          {educationData.map((item, index) => (
            <ExperienceItem key={index} {...item} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
