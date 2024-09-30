"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaMobileAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-2 sm:p-2 lg:p-4 bg-white">
      <Link href="/">
        <div className="flex items-center cursor-pointer ml-14">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="w-auto h-12 sm:h-16 lg:h-20"
          />
          <span className="lg:text-xl font-medium px-2 sm:text-base hidden sm:inline-block"></span>
        </div>
      </Link>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row md:items-center gap-12 space-y-6 md:space-y-0 md:space-x-4 mt-4 md:mt-0 font-normal`}
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center space-x-2 px-5 py-2 text-default-color hover:text-custom hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaHome style={{ fontSize: 20 }} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/device"
          className="flex items-center space-x-2 px-5 py-2 text-default-color hover:text-custom hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span>Devices</span>
        </Link>
        <Link
          href="/admin/roms"
          className="flex items-center space-x-2 px-5 py-2 text-default-color hover:text-custom hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span>ROMs</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center space-x-2 px-5 py-2 text-default-color hover:text-custom hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaShoppingCart style={{ fontSize: 20 }} />
          <span>Orders</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center space-x-2 px-5 py-2 text-default-color hover:text-custom hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaUser style={{ fontSize: 20 }} />
          <span>Profile</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
