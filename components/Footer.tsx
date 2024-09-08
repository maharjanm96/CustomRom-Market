"use client";
import React from "react";
import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const contactLinks = [
  {
    icon: <FaGithub className="mr-2" />,
    text: "maharjanm96",
    href: "https://github.com/maharjanm96",
  },
  {
    icon: <FaLinkedin className="mr-2" />,
    text: "Manish Maharjan",
    href: "https://www.linkedin.com/in/manish-maharjan-4b5a761a0/",
  },

  {
    icon: <FaEnvelope className="mr-2" />,
    text: "maharjanm96@gmail.com",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white p-20 text-center ">
      <div className="container container-style">
        <div className="flex items-center ">
          <div className="m-4">
            <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          </div>
          <span className="text-xl font-regular">CustomRom Market</span>
        </div>
        <div className="flex flex-wrap justify-end">
          <div className="column-style">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="link-style flex items-center"
              >
                {link.icon}
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <span className="text-gray-700">
          Project maintained by{" "}
          <a className="text-blue-500 hover:underline cursor-pointer">
            Manish Maharjan
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
