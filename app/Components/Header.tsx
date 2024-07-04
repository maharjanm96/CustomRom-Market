"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaNewspaper,
  FaBook,
  FaDollarSign,
  FaMobileAlt,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import Logout from "./Buttons/LogoutButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);

    const intervalId = setInterval(() => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logged out successfully!");
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between p-8 bg-white">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          <span className="lg:text-xl font-semibold px-2 sm:text-sm">
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
        } md:flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
      >
        <Link href="/" className="flex items-center space-x-1">
          <FaHome style={{ fontSize: 22 }} />
          <span>Home</span>
        </Link>
        <Link href="/device" className="flex items-center space-x-1">
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span>Devices</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <FaDollarSign style={{ fontSize: 20 }} />
          <span>Pricing</span>
        </Link>
        <Link href="/auth/user" className="flex items-center space-x-1">
          <FaUser style={{ fontSize: 18 }} />
          <span>Profile</span>
        </Link>
        {isAuthenticated && <Logout handleLogout={handleLogout} />}
      </nav>
    </header>
  );
};

export default Header;
