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
} from "react-icons/fa";
import Logout from "./Buttons/LogoutButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the token on component mount
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);

    // Set up an interval to periodically check the cookie
    const intervalId = setInterval(() => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    }, 1000); // Check every second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logged out successfully!");
    setIsAuthenticated(false);
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
        {isAuthenticated && <Logout handleLogout={handleLogout} />}
      </nav>
    </header>
  );
};

export default Header;
