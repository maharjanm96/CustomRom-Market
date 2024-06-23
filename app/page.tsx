"use client";

import React from "react";
import { TypewriterEffectSmooth } from "./Components/ui/Typewriter-effect";
import { ClassNames } from "@emotion/react";
import Link from "next/link";

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
    {
      text: "CUSTOM",
      className: "text-black",
    },
    // {
    //   text: (
    //     <>
    //       <span className="text-red-500">C</span>
    //       <span className="text-blue-500">U</span>
    //       <span className="text-green-500">S</span>
    //       <span className="text-yellow-500">T</span>
    //       <span className="text-red-500">O</span>
    //       <span className="text-blue-500">M</span>
    //     </>
    //   ),
    // },
    {
      text: (
        <>
          <span className="text-red-500">R</span>
          <span className="text-blue-500">O</span>
          <span className="text-green-500">M</span>
          <span className="text-yellow-500">s</span>
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem]  ">
      <p className="text-black text-xl ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/auth/login">
          <button className="w-40 h-10 rounded-xl bg-white border-2 text-black border-black text-sm">
            Login
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="w-40 h-10 rounded-xl bg-black text-white border-2 border-black  text-sm">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
