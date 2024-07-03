"use client";

import React from "react";
import { TypewriterEffectSmooth } from "@/app/Components/ui/Typewriter-effect";
import Link from "next/link";
import Cookies from "js-cookie";
import CustomButton from "./Components/Buttons/Buttons";
import router from "next/router";

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
      <div className="lg:w-full flex gap-6 justify-center">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <CustomButton
                name="Login"
                bgColor="bg-white"
                textColor="text-black"
                //onClick={() => router.push("/auth/login")}
              />
            </Link>

            <Link href="/auth/signup">
              <CustomButton
                name="SignUp"
                bgColor="bg-black"
                textColor="text-white"
                //onClick={() => router.push("/auth/login")}
              />
            </Link>
          </>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
