"use client";

import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/Typewriter-effect";
import Link from "next/link";
import CustomButton from "../components/Buttons/Buttons";
import { Button } from "./ui/button";

const Home = () => {
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
    <div className="flex flex-col items-center justify-center h-[35rem]">
      <p className="text-black text-xl uppercase">The road to freedom starts from here</p>
      <TypewriterEffectSmooth words={words} />
      <div className="grid gap-12">
        <Link href="/login">
          <Button variant="outline" className="w-44 rounded-sm">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" className="w-44 rounded-sm">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
