import Head from "next/head";
import Image from "next/image";

// import { Poppins } from "@next/font/google";
import { ReactNode } from "react";

// const poppins = Poppins({ weight: "300" });
interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={`flex h-screen flex-col items-center justify-center`}>
      <Head>
        <title>Bruno Angelo</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-8 md:px-20 text-cente">
        {children}
      </main>
    </div>
  );
}
