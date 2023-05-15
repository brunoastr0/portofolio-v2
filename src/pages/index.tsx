/* eslint-disable react/no-unescaped-entities */
import LoadingScreen from "@/components/LoadingScreen";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);

    const script = document.createElement("script");
    script.src = "/js/astro_animate.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>{loading === false ? <p>hello</p> : <LoadingScreen />}</Layout>
  );
};

export default Home;
