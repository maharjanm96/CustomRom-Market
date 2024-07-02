"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaNewspaper,
  FaBook,
  FaDollarSign,
  FaMobileAlt,
} from "react-icons/fa";
import Logout from "./Buttons/LogoutButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const isAuthenticated = !!Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");

    toast.success("Logged out successfully!");

    router.push("/auth/login");
  };
  return (
    <header className="flex justify-between items-center m-8 bg-white">
      <Link href="/">
        <div className="flex items-center pl-20 cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
          <span className="text-xl font-semibold">CustomRom Market</span>
        </div>
      </Link>
      <nav className="flex space-x-4 pr-8 gap-4">
        <Link href="/" className="flex items-center space-x-1">
          <FaHome style={{ fontSize: 22 }} />
          <span>Home</span>
        </Link>
        <Link href="/device" className="flex items-center space-x-1">
          <FaMobileAlt style={{ fontSize: 20 }} />
          <span>Devices</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <FaNewspaper style={{ fontSize: 20 }} />
          <span>News</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <FaBook style={{ fontSize: 18 }} />
          <span>Library</span>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <FaDollarSign style={{ fontSize: 20 }} />
          <span>Pricing</span>
        </Link>
        {isAuthenticated ? (
          <Logout handleLogout={handleLogout} />
        ) : (
          <span></span>
        )}
      </nav>
    </header>
  );
};

export default Header;
