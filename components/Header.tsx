"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaMobileAlt,
  FaDollarSign,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import Logout from "./Buttons/LogoutButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import LogoutButton from "./Buttons/LogoutButton";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
          href="/"
          className="flex items-center space-x-2 px-5 py-2 hover:text-blue-400 hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaHome style={{ fontSize: 20 }} />
          <span>Home</span>
        </Link>
        <Link
          href="/device"
          className="flex items-center space-x-2 px-5 py-2 hover:text-blue-400 hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span>Devices</span>
        </Link>
        <Link
          href="/"
          className="flex items-center space-x-2 px-5 py-2 hover:text-blue-400 hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaDollarSign style={{ fontSize: 20 }} />
          <span>Pricing</span>
        </Link>
        <Link
          href="/auth/user"
          className="flex items-center space-x-2 px-5 py-2 hover:text-blue-400 hover:bg-slate-50 hover:rounded-xl transition duration-200"
        >
          <FaUser style={{ fontSize: 18 }} />
          <span>Profile</span>
        </Link>
        {session ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Header;
