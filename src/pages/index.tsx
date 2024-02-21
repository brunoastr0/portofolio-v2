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
            <li className="mb-12">
              <div
                className="group relative grid gap-4 pb-1 transition-all 
              sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              >
                <div
                  className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none
                lg:-inset-x-6  lg:block  lg:group-hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.2)]
                lg:group-hover:drop-shadow-lg"
                ></div>
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label=""
                      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-white focus-visible:text-white group/link text-base"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span className="">
                        AI Agent learns to drive
                        <span className="inline-block"></span>
                      </span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal">
                    Video course that teaches how to build a web app with the
                    Spotify Web API. Topics covered include the principles of
                    REST APIs, user auth flows, Node, Express, React, Styled
                    Components, and more.
                  </p>
                </div>
                <Image
                  src="/neural.png"
                  width={200}
                  height={48}
                  className="rounded border-3 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  alt=""
                />
              </div>
            </li>
            <li className="mb-12">
              <div
                className="group relative grid gap-4 pb-1 transition-all 
              sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              >
                <div
                  className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none
                lg:-inset-x-6  lg:block  lg:group-hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.2)]
                lg:group-hover:drop-shadow-lg"
                ></div>
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label=""
                      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-white focus-visible:text-white group/link text-base"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span className="">
                        AI Agent learns to drive
                        <span className="inline-block"></span>
                      </span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal">
                    Video course that teaches how to build a web app with the
                    Spotify Web API. Topics covered include the principles of
                    REST APIs, user auth flows, Node, Express, React, Styled
                    Components, and more.
                  </p>
                </div>
                <Image
                  src="/neural.png"
                  width={200}
                  height={48}
                  className="rounded border-3 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  alt=""
                />
              </div>
            </li>
            <li className="mb-12">
              <div
                className="group relative grid gap-4 pb-1 transition-all 
              sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              >
                <div
                  className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none
                lg:-inset-x-6  lg:block  lg:group-hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.2)]
                
                lg:group-hover:drop-shadow-lg"
                ></div>
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label=""
                      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-white focus-visible:text-white group/link text-base"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span className="">
                        AI Agent learns to drive
                        <span className="inline-block"></span>
                      </span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal">
                    Video course that teaches how to build a web app with the
                    Spotify Web API. Topics covered include the principles of
                    REST APIs, user auth flows, Node, Express, React, Styled
                    Components, and more.
                  </p>
                </div>
                <Image
                  src="/neural.png"
                  width={200}
                  height={48}
                  className="rounded border-3 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  alt=""
                />
              </div>
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
          className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur-lg md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto 
        lg:mx-auto lg:w-full justify-end flex lg:px-0 lg:py-0 lg:opacity-0 text-slate-100 font-medium"
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
