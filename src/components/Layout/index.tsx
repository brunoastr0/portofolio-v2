import Head from "next/head";
import Image from "next/image";

import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import RadialPointer from "../RadialPointer";
import { Tab } from "../Tab";
import { SocialsLinks } from "../SocialsLinks";
import { DayOfTheWeek } from "../DayOfTheWeek";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={`relative ${poppins.variable}`}>
      <Head>
        <title>Bruno Angelo</title>
      </Head>
      <RadialPointer />
      <DayOfTheWeek />

      <div
        className={`mx-auto min-h-screen  max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 `}
      >
        <Image
          src={"/astro_white.png"}
          width={30}
          height={30}
          alt={"astro logo white"}
          className="absolute left-0 top-0 m-7 "
        />
        <div className="lg:flex lg:justify-between lg:gap-4 ">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div className="flex flex-col md:flex-row justify-start md:w-full items-center   ">
              <Image
                src={"/bruno.jpg"}
                width={150}
                height={150}
                alt={"photo1"}
                className="rounded-full shadow-3xl border-[2px] border-[#FFD700]"
              />
              <div className="font-semibold text-center p-2 m-2 ">
                <h1 className="text-2xl md:text-4xl text-white font-bold tracking-tight  ">
                  Bruno Ângelo
                </h1>
                <h2 className="text-white/[.5] text-xl md:text-2xl">
                  Software developer
                </h2>
              </div>
            </div>
            <div className="">
              <Tab />
            </div>

            <ul
              className="ml-1 mt-8 flex items-center"
              aria-label="Social media"
            >
              <SocialsLinks />
            </ul>
          </header>
          <main id="content" className="bg-red-200 pt-24 lg:w-1/2 lg:py-24 ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
