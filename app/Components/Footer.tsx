"use client";
import React from "react";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GitHub, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-white py-10 text-center ">
      <div className="container container-style">
        <div className="flex items-center mb-4 md:mb-0 pl-20">
          <div className="mr-auto">
            <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          </div>
          <span className="text-xl font-bold">CustomRom Market</span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-8">
          <div className="column-style pr-20">
            <a href="#" className="link-style flex items-center">
              <WhatsApp className="mr-2" />
              9840390774
            </a>
            <a href="#" className="link-style flex items-center">
              <GitHub className="mr-2" />
              maharjanm96
            </a>
            <a href="#" className="link-style flex items-center">
              <InstagramIcon className="mr-2" />
              manee_mrzn
            </a>
            <a href="#" className="link-style flex items-center">
              <EmailIcon className="mr-2" />
              maharjanm96@gmail.com
            </a>
            <a href="#" className="link-style flex items-center">
              <TelegramIcon className="mr-2" />
              maharjanm96
            </a>
            <a href="#" className="link-style flex items-center">
              <FacebookIcon className="mr-2" />
              मनिष महर्जन
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <span className="text-gray-700">
          Project maintained by{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Manish Maharjan
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
