"use client";

import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/Typewriter-effect";
import Link from "next/link";
import CustomButton from "../components/Buttons/Buttons";

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
    {
      text: (
        <>
          <span key="r" className="text-red-500">
            R
          </span>
          <span key="o" className="text-blue-500">
            O
          </span>
          <span key="m" className="text-green-500">
            M
          </span>
          <span key="s" className="text-yellow-500">
            s
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[30rem]">
      <p className="text-black text-xl">The road to freedom starts from here</p>
      <TypewriterEffectSmooth words={words} />
      <div className="lg:flex lg:flex-row sm:flex sm:flex-col sm:items-center sm:justify-center w-full flex gap-6 justify-center ">
        <Link href="/auth/login">
          <CustomButton
            name="Login"
            bgColor="bg-white"
            textColor="text-black"
          />
        </Link>

        <Link href="/auth/signup">
          <CustomButton
            name="SignUp"
            bgColor="bg-black"
            textColor="text-white"
          />
        </Link>
      </div>
    </div>
  );
}
