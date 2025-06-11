"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const docOptions = [
  { label: "Function Specification Docs", href: "/letters/leave" },
  { label: "Functional Requirement Docs", href: "/letters/cover" },
  { label: "Software Requirements Spec Docs",  href: "/letters/recommendation" },
  { label: "Business Requirements Docs", href: "/letters/inquiry" },
  { label: "Estimate Docs", href: "/letters/sales" },
];

export default function DocumentsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // brief delay for stable UX
  };

  return (
    <div
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-4 py-2 hover:text-[#029f74] rounded-md transition cursor-pointer text-[18px]">
        Documents <ChevronDown className="w-4 h-4" />
      </button>

      <div
        className={`dronavmenu top-full bg-white z-50 transition-opacity duration-200 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="grid grid-cols-2 gap-3 p-4 px-[10rem]">
          {docOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="block px-3 py-2 rounded-md  hover:text-[#029f74] transition-colors text-[16px] cursor-pointer min-w-[400px] my-2"
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
