import Head from "next/head";
import Image from "next/image";

import { ReactNode } from "react";

interface LinksProps {
  children: ReactNode;
}

export function SocialsLinks(): JSX.Element {
  return (
    <>
      <a href="www.facebook.com" className=" p-2">
        <Image
          src={"/socials/facebook.svg"}
          width={24}
          height={24}
          alt="social"
        />
      </a>
      <a className=" p-2">
        <Image
          src={"/socials/instagram.svg"}
          width={24}
          height={24}
          alt="social"
        />
      </a>
      <a className=" p-2">
        <Image
          src={"/socials/linkedin.svg"}
          width={24}
          height={24}
          alt="social"
        />
      </a>
      <a className=" p-2">
        <Image
          src={"/socials/github.svg"}
          width={24}
          height={24}
          alt="social"
        />
      </a>
    </>
  );
}
