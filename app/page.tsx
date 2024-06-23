"use client";

import React from "react";
import { TypewriterEffectSmooth } from "./Components/ui/Typewriter-effect";

export default function Home() {
  const words = [
    {
      text: "Unlock The",
    },
    {
      text: "Full Potential",
    },
    {
      text: "Of Your Device With",
    },
    // {
    //   text: "with",
    // },
    {
      text: "Custom ROMs.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[25rem]  ">
      <p className="text-black text-xl ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-white border-2 text-black border-black text-sm">
          Login
        </button>
        <button className="w-40 h-10 rounded-xl bg-black text-white border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
  );
}
