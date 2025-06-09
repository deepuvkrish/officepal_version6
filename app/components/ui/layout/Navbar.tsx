"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LogOut,
  Settings,
  FileText,
  CreditCard,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import SignIn from "@/app/components/SignIn";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sticky on scroll down
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatar = session?.user?.image ? (
    <Image
      src={session.user.image}
      alt="avatar"
      width={32}
      height={32}
      className="rounded-full object-cover"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
      {session?.user?.name?.[0] ?? "U"}
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
            src="/logo/blkTrans.png"
            alt="Resume Icon"
            width={100}
            height={50}
            className="mb-6"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              >
                {avatar}
                <span className="hidden sm:inline text-sm">
                  {session?.user?.name?.split(" ")[0] ?? "My Account"}
                </span>
                <ChevronDown />
              </button>

              <div
                className={`absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-md w-48 border dark:border-gray-800 transition-all duration-200 origin-top transform ${
                  showMenu
                    ? "scale-100 opacity-100 visible"
                    : "scale-95 opacity-0 invisible"
                }`}
              >
                <Link
                  href="/resumes/saved"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FileText className="w-4 h-4" />
                  Saved Resumes
                </Link>
                <Link
                  href="/account/settings"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Settings className="w-4 h-4" />
                  Edit Details
                </Link>
                <Link
                  href="/pricing"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Plans
                </Link>
                <button
                  onClick={() => signOut()}
                  className="dropdown-item text-red-500 flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <SignIn />
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
              <button
                onClick={() => signOut()}
                className="dropdown-item text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <SignIn />
            </>
          )}
        </div>
      )}
    </header>
  );
}
