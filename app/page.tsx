"use client";

import React from "react";
import { TypewriterEffectSmooth } from "@/app/Components/ui/Typewriter-effect";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Home() {
  const isAuthenticated = !!Cookies.get("token");

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
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <button className="w-40 h-10 rounded-xl bg-white border-2 text-black border-black text-sm">
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="w-40 h-10 rounded-xl bg-black text-white border-2 border-black text-sm">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
