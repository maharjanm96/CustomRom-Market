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
    <header className="flex justify-between items-center p-4 sm:p-2 lg:p-4 mb-8  bg-white">
      <Link href="/">
        <div className="flex items-center cursor-pointer ml-14">
          <Image src="/assets/logo.png" alt="Logo" width={180} height={180} />
          <span className="lg:text-xl font-medium px-2 sm:text-base hidden sm:inline-block"></span>
        </div>
      </Link>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mt-4 md:mt-0 font-normal`}
      >
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 px-4 py-2 hover:text-custom transition duration-200"
        >
          <FaHome style={{ fontSize: 20 }} />
          <span className="text-sm sm:text-base">Dashboard</span>
        </Link>
        <Link
          href="/device"
          className="flex items-center space-x-2 px-4 py-2 hover:text-custom transition duration-200"
        >
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span className="text-sm sm:text-base">Devices</span>
        </Link>
        <Link
          href="/order/details"
          className="flex items-center space-x-2 px-4 py-2 hover:text-custom transition duration-200"
        >
          <FaShoppingCart style={{ fontSize: 20 }} />
          <span className="text-sm sm:text-base">My Orders</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center space-x-2 px-4 py-2 hover:text-custom transition duration-200"
        >
          <FaUser style={{ fontSize: 18 }} />
          <span className="text-sm sm:text-base">Profile</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
