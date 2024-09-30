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
    <footer className="bg-[url('/assets/pixel-experience.jpg')] bg-cover bg-center bg-no-repeat text-center p-10 sm:p-20">
      <div className="p-8  max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-28 ">
          <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-800">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center hover:text-custom transition-colors duration-300"
              >
                {link.icon}
                <span>{link.text}</span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <span className="text-gray-700">
              Project maintained by{" "}
              <a
                href="https://www.linkedin.com/in/manish-maharjan-4b5a761a0/"
                className="text-custom hover:underline"
              >
                Manish Maharjan
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
