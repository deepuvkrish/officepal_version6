"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
// import { FcRules } from "react-icons/fc";
import {
  Settings,
  FileText,
  CreditCard,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Mail,
  Users,
  HelpCircle,
  ShoppingCart,
  AlertTriangle,
  FileMinus,
  FileCheck,
  ThumbsUp,
  Gift,
  AudioLines,
  FileVideo,
  SquareFunction,
  FilePlus2,
  FolderCode,
  BriefcaseBusiness,
  Hourglass,
  LogOut,
  BookMarked,
  SquarePen,
  TicketPercent,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import SignIn from "@/app/components/SignIn";
import LettersDropdown from "@/app/components/ui/layout/LettersDropdown";
import MeetingDropdown from "./MeetingDropdown";
import DocumentsDropdown from "./DocumentsDropdown";

const docOptions = [
  { label: "Function Specification Docs", icon: <SquareFunction size={16} /> },
  { label: "Functional Requirement Docs", icon: <FilePlus2 size={16} /> },
  { label: "Software Requirement Specs Docs", icon: <FolderCode size={16} /> },
  {
    label: "Business Requirements Docs",
    icon: <BriefcaseBusiness size={16} />,
  },
  { label: "Estimate Docs", icon: <Hourglass size={16} /> },
];
const momOptions = [
  { label: "Create MoMs from Audio", icon: <AudioLines size={16} /> },
  { label: "Create MoMs from Videos", icon: <FileVideo size={16} /> },
];

const letterOptions = [
  { label: "Leave Letters", icon: <FileText size={16} /> },
  { label: "Cover Letters", icon: <Mail size={16} /> },
  { label: "Recommendation Letters", icon: <Users size={16} /> },
  { label: "Inquiry Letters", icon: <HelpCircle size={16} /> },
  { label: "Sales Letters", icon: <ShoppingCart size={16} /> },
  { label: "Complaint Letters", icon: <AlertTriangle size={16} /> },
  {
    label: "Resignation Letters",
    icon: <FaPersonWalkingArrowRight size={16} />,
  },
  { label: "Order Letters", icon: <FileMinus size={16} /> },
  { label: "Apology Letters", icon: <ThumbsUp size={16} /> },
  { label: "Acknowledgement Letters", icon: <FileCheck size={16} /> },
  { label: "Termination Letters", icon: <AlertTriangle size={16} /> },
  { label: "Offer Acceptance Letter", icon: <FileCheck size={16} /> },
  { label: "Thank You Letters", icon: <ThumbsUp size={16} /> },
  { label: "Invitation Letters", icon: <Gift size={16} /> },
];

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLetters, setShowMobileLetters] = useState(false);
  const [showMobileMoms, setShowMobileMoms] = useState(false);
  const [showMobileDocs, setShowMobileDocs] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between mainNav">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/blkTrans.png"
            alt="Resume Icon"
            width={100}
            height={50}
            className="mb-6"
          />
        </Link>

        <div className="hidden sm:flex flex-row items-center">
          <LettersDropdown />
          <MeetingDropdown />
          <DocumentsDropdown />
          <button className="flex items-center gap-1 px-4 py-2 hover:text-[#029f74] transition cursor-pointer text-[18px]">
            FAQs
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="relative aspect-square w-10 rounded-full">
                  {avatar}
                  <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 "></span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-dark text-dark-6">
                    {session?.user?.name?.split(" ")[0] ?? "My Account"}
                  </p>
                  <p className="text-sm text-body-color dark:text-dark-6">
                    {session?.user?.email?.split(" ")[0] ?? "My Account"}
                  </p>
                </div>
                <ChevronDown
                  onClick={() => setShowMenu(!showMenu)}
                  className="cursor-pointer"
                />
              </div>

              <div
                className={`absolute right-0 mt-2 bg-white shadow-lg rounded-md w-[300px] border transition-all duration-200 origin-top transform ${
                  showMenu
                    ? "scale-100 opacity-100 visible"
                    : "scale-95 opacity-0 invisible"
                }`}
              >
                <div className="px-4 py-3">
                  <p className="text-[16px] font-semibold text-dark ">
                    Account menu
                  </p>
                </div>
                <div>
                  <Link
                    href="../pages/profile"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-[16px] font-medium text-dark hover:bg-gray-500 hover:text-[#00ffba] "
                  >
                    View profile
                  </Link>
                  <a
                    href="#0"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-[16px] font-medium text-dark hover:bg-gray-500 hover:text-[#00ffba] "
                  >
                    Settings
                  </a>
                  <a
                    href="#0"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-[16px] font-medium text-dark hover:bg-gray-500 hover:text-[#00ffba] "
                  >
                    Keyboard shortcuts
                    <span className="text-xs text-dark-5"> ⌘K </span>
                  </a>
                </div>
                <div>
                  <a
                    href="#0"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-[16px] font-medium text-dark hover:bg-gray-500 hover:text-[#00ffba] "
                  >
                    Team
                  </a>
                  <a
                    href="#0"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-[16px] font-medium text-dark hover:bg-gray-500 hover:text-[#00ffba] "
                  >
                    Invite colleagues
                  </a>
                </div>

                <Link
                  href="/resumes/saved"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 "
                >
                  <FileText className="w-4 h-4" />
                  Saved Resumes
                </Link>
                <Link
                  href="/account/settings"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 "
                >
                  <Settings className="w-4 h-4" />
                  Edit Details
                </Link>
                <Link
                  href="/pricing"
                  className="dropdown-item flex items-center gap-2 px-4 py-2 "
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Plans
                </Link>

                <button
                  onClick={() => signOut()}
                  className="dropdown-item-2 flex items-center gap-2 px-4 py-2  w-full text-left "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <SignIn />
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="sm:hidden p-2"
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Slide-Down */}
      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          showMobileMenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <Image
              src="/logo/blkTrans.png"
              alt="Resume Icon"
              width={100}
              height={50}
              className="block"
            />
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          {/* Letters Dropdown */}
          <button
            onClick={() => setShowMobileLetters(!showMobileLetters)}
            className="flex justify-between items-center px-3 py-2 text-left border rounded-md"
          >
            <span>Letters</span>
            {showMobileLetters ? <ChevronUp /> : <ChevronRight />}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showMobileLetters
                ? "max-h-[800px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-4 text-sm flex flex-col gap-1 mt-2">
              {letterOptions.map(({ label, icon }) => (
                <Link
                  key={label}
                  href={`/letters/${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* MoM Dropdown */}
          <button
            onClick={() => setShowMobileMoms(!showMobileMoms)}
            className="flex justify-between items-center px-3 py-2 text-left border rounded-md"
          >
            <span>Meeting Of Moments</span>
            {showMobileMoms ? <ChevronUp /> : <ChevronRight />}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showMobileMoms ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-4 text-sm flex flex-col gap-1 mt-2">
              {momOptions.map(({ label, icon }) => (
                <Link
                  key={label}
                  href={`/letters/${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Documents Dropdown */}
          <button
            onClick={() => setShowMobileDocs(!showMobileDocs)}
            className="flex justify-between items-center px-3 py-2 text-left border rounded-md"
          >
            <span>Documents</span>
            {showMobileDocs ? <ChevronUp /> : <ChevronRight />}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showMobileDocs ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-4 text-sm flex flex-col gap-1 mt-2">
              {docOptions.map(({ label, icon }) => (
                <Link
                  key={label}
                  href={`/letters/${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          {/* Auth Options */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2  p-2 rounded-md"
              >
                {avatar}
                <span className="sm-hidden inline text-[17px] text-black">
                  {session?.user?.name?.split(" ")[0] ?? "My Account"}
                </span>
              </button>

              <Link
                href="/resumes/saved"
                className="dropdown-item px-2 py-2 hover:bg-gray-100 rounded-md"
              >
                <BookMarked size={18} className="mr-1" />
                Saved Resumes
              </Link>
              <Link
                href="/account/settings"
                className="dropdown-item px-2 py-2 hover:bg-gray-100 rounded-md"
              >
                <SquarePen size={18} className="mr-1" />
                Edit Details
              </Link>
              <Link
                href="/pricing"
                className="dropdown-item px-2 py-2 hover:bg-gray-100 rounded-md"
              >
                <TicketPercent size={18} className="mr-1" />
                Plans
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setShowMobileMenu(false);
                }}
                className="dropdown-item-button  px-2 py-2 rounded-md"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </header>
  );
}
