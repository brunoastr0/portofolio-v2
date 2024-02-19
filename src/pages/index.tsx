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
      <div className="bg-slate-700"> hello</div>
    </Layout>
  );
};

export default Home;
