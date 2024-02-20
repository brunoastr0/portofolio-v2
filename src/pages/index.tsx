/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/Layout";
import { Tab } from "@/components/Tab";
import { SocialsLinks } from "@/components/SocialsLinks";
import { DayOfTheWeek } from "@/components/DayOfTheWeek";
import Script from "next/script";

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
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-slate-100"
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
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-slate-100"
        >
          <h2>Projects</h2>
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
        <div>
          <ul className="group/list">
            <li className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all"></div>
            </li>
          </ul>
        </div>
      </section>
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="About me"
      >
        <div
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-slate-100"
        >
          <h2>Experience</h2>
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
    </Layout>
  );
};

export default Home;
