import Head from "next/head";
import Image from "next/image";

import { ReactNode } from "react";

export function DayOfTheWeek(): JSX.Element {
  const dayOfTheWeek = (): string => {
    const date = new Date().toLocaleString("default", { weekday: "long" });
    return date;
  };

  return (
    <span className="md:top-9 md:left-20 m-10 px-2 w-fit " id="dayOfTheWeek">
      <h2>Happy {dayOfTheWeek()}!!</h2>
    </span>
  );
}
