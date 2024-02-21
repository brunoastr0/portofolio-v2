import React from "react";
import Image from "next/image";

export default function Logo(): JSX.Element {
  return (
    <span className="">
      <Image
        src={"/astro_white.png"}
        width={30}
        height={30}
        alt={"astro logo white"}
        className=" fixed left-0 top-0 m-5 z-30 "
      />
    </span>
  );
}
