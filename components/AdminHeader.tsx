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
    <header className="flex justify-between p-8 px-20 bg-white">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          <span className="lg:text-xl font-medium px-2 sm:text-sm">
            CustomRom Market
          </span>
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
