/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";

const AppBar = () => {
  return (
    <div className="w-full grid grid-cols-3 px-8 py-2 gap-16 bg-[#111D22]/30 backdrop-blur-[2px] text-center justify-center justify-items-center rounded-md ">
      <button className="justify-center items-center flex flex-col ">
        <Image src={"/info.svg"} alt="info" width={30} height={30} />
        <span className="text-white text-sm">about</span>
      </button>
      <button className="justify-center items-center flex flex-col">
        <Image src={"/github.svg"} alt="info" width={30} height={30} />
        <span className="text-white text-sm">contact</span>
      </button>
      <button className="justify-center items-center flex flex-col">
        <Image src={"/email.svg"} alt="info" width={30} height={30} />
        <span className="text-white text-sm">projects</span>
      </button>
    </div>
  );
};

export default AppBar;
