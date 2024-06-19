// components/Header.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilNewspaper,
  cilLibrary,
  cilDollar,
  cilMoon,
  cilMobile,
} from "@coreui/icons";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 bg-white">
      <div className="flex items-center space-x-2 pl-20 cursor-pointer">
        <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
        <span className="text-xl font-semibold">CustomRom Market</span>
      </div>
      <nav className="flex space-x-4 font-semibold">
        <Link href="/" className="flex items-center space-x-1">
          <CIcon icon={cilHome} height={20} />
          <span>Home</span>
        </Link>
        <Link href="/device" className="flex items-center space-x-1">
          <CIcon icon={cilMobile} height={20} />
          <span>Devices</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <CIcon icon={cilNewspaper} height={20} />
          <span>News</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <CIcon icon={cilLibrary} height={20} />
          <span>Library</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <CIcon icon={cilDollar} height={20} />
          <span>Pricing</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
