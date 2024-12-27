/* eslint-disable react/no-unescaped-entities */
import LoadingScreen from "@/components/LoadingScreen";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Tab } from "@/components/Tab";
import { SocialsLinks } from "@/components/SocialsLinks";
import { DayOfTheWeek } from "@/components/DayOfTheWeek";
import Script from "next/script";
import ProjectItem from "@/components/ProjectItem";
import ExperienceItem, {
  ExperienceItemProps,
} from "@/components/ExpereinceItem";
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
      "Given a track, an AI agent will learn how to drive in that ambient ",
    imageSrc: "/neural.png",
    imageAlt: "AI Agent learning to drive",
    link: "https://github.com/brunoastr0/self_driving_car",
  },
  {
    title: "Multi Tenant plataform backend",
    description:
      "A backend solution designed for a multi-tenant application, enabling seamless data isolation and scalability for multiple clients.",
    imageSrc: "/database.png",
    imageAlt: "AI Agent learning to drive",
    link: "https://github.com/brunoastr0/my-shop-backend",
  },
];
const experienceData: ExperienceItemProps[] = [
  {
    title: "IT  at ZoneTech",
    dateRange: "2024 — present",
    description:
      "Currently contributing to the IT operations at ZoneTech, focusing on maintaining and optimizing technology infrastructure. Leveraging knowledge in engineering and computer science, I troubleshoot complex systems, implement solutions, and support the development of innovative tools.",
  },
  {
    title: "Engineering Degree",
    dateRange: "2019 — 2025",
    description:
      "Attending an engineering and computer science university has been a transformative journey, immersing me in curiosity and innovation. Tackling challenging coursework and real-world projects has honed my critical thinking and creativity. Collaborating with peers and learning from passionate professors has helped me grow both technically and in teamwork, communication, and resilience.",
    tags: [
      "JavaScript",
      "Python",
      "C",
      "Assembly",
      "Network",
      "Telecomunications",
    ],
  },
  {
    title: "Traineé at Akira Corporation",
    dateRange: "2021 — 2022",
    description:
      "Contributed to the development of innovative web applications using modern technologies like React, TypeScript, and Laravel. Gained hands-on experience with JavaScript and CSS for front-end development and utilized Docker for containerized deployments. Collaborated with a team to build scalable solutions, honing both technical and problem-solving skills.",
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

const Home: NextPage = () => {
  <Script src="/js/index.js" />;

  return (
    <Layout>
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="About me"
      >
        <div
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur-lg md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full justify-end flex lg:px-0 lg:py-0 lg:opacity-0 text-slate-100 font-medium"
        >
          <h2>About</h2>
        </div>
        <div>
          <p className="mb-4">
            Hi <span className="text-[#FFD700]">I’m Bruno</span>, a software
            developer on course of finishing my degree in engineering. I have
            experience on web developing with agile methodology. I’ve been
            building projects on various technologies. Besides software
            development, I am fascinated about design and a e s t h e t i c s{" "}
          </p>
          <p className="mb-4">
            <Image
              src={"/astro_colored_1.svg"}
              width={100}
              height={100}
              alt={"Astro Logo "}
            />
          </p>
          <p className="mb-4">
            Astro is a personal brand, that you can expect top-notch quality,
            timely delivery, and exceptional customer service. If you're looking
            for a reliable and experienced software development partner, look no
            further than Astro.
          </p>
        </div>
      </section>

      <section
        id="project"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="Projects"
      >
        <div
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur-lg md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full justify-end flex lg:px-0 lg:py-0 lg:opacity-0 text-slate-100 font-medium"
        >
          <h2>Projects</h2>
        </div>

        <div>
          <ul className="group/list">
            {projects.map((project, index) => (
              <ProjectItem key={index} {...project} />
            ))}
          </ul>
        </div>
      </section>
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="About me"
      >
        <div
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur-lg md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full justify-end flex lg:px-0 lg:py-0 lg:opacity-0 text-slate-100 font-medium"
        >
          <h2>Experience</h2>
        </div>
        <div>
          <ul className="group/list">
            {experienceData.map((project, index) => (
              <ExperienceItem key={index} {...project} />
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
