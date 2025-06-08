"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LogIn,
  LogOut,
  Settings,
  FileText,
  CreditCard,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowSticky(currentScroll > lastScroll && currentScroll > 50);
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatar = (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
      DK {/* Replace with user initials or image */}
    </div>
  );

  return (
    <header
      className={`w-full top-0 left-0 z-50 transition-all duration-300 ${
        showSticky
          ? "fixed bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-sm"
          : "relative"
      }`}
    >
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/whtTrans.png"
            alt="Resume Icon"
            width={100}
            height={50}
            className="mb-6"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              >
                {avatar}
                <span className="hidden sm:inline">My Account</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-md w-48 py-2 border dark:border-gray-800">
                  <Link href="/resumes/saved" className="dropdown-item">
                    <FileText className="w-4 h-4 mr-2" />
                    Saved Resumes
                  </Link>
                  <Link href="/account/settings" className="dropdown-item">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Details
                  </Link>
                  <Link href="/pricing" className="dropdown-item">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Plans
                  </Link>
                  <button className="dropdown-item text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn text-sm w-[80px] flex">
                <LogIn className="w-4 h-4 mr-1" /> Sign In
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="sm:hidden p-2"
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="sm:hidden px-6 pb-4 flex flex-col gap-2 bg-white dark:bg-black">
          {isLoggedIn ? (
            <>
              <Link href="/resumes/saved" className="dropdown-item">
                Saved Resumes
              </Link>
              <Link href="/account/settings" className="dropdown-item">
                Edit Details
              </Link>
              <Link href="/pricing" className="dropdown-item">
                Buy Plans
              </Link>
              <button className="dropdown-item text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn w-full text-left">
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary w-full text-left">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
