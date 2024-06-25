"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 bg-white z-20">
      <Link href="/">
        <div className="flex items-center space-x-2 pl-20 cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          <span className="text-xl font-semibold">CustomRom Market</span>
        </div>
      </Link>
      <nav className="flex space-x-4">
        <Link href="/" className="flex items-center space-x-1">
          <HomeOutlinedIcon style={{ fontSize: 25 }} />
          <span>Home</span>
        </Link>
        <Link href="/device" className="flex items-center space-x-1">
          <SmartphoneOutlinedIcon style={{ fontSize: 20 }} />
          <span>Devices</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <NewspaperOutlinedIcon style={{ fontSize: 20 }} />
          <span>News</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <LibraryBooksOutlinedIcon style={{ fontSize: 20 }} />
          <span>Library</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <AttachMoneyOutlinedIcon style={{ fontSize: 20 }} />
          <span>Pricing</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
