"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const letterOptions = [
  { label: "Create MoM from Audio", href: "/letters/leave" },
  { label: "Create MoM from Videos", href: "/letters/cover" },
];

export default function MeetingDropdown() {
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
        Meeting of Moments <ChevronDown className="w-4 h-4" />
      </button>

      <div
        className={`dronavmenu top-full bg-white z-50 transition-opacity duration-200 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 p-4">
          {letterOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="block px-3 py-2 rounded-md  hover:text-[#029f74] transition-colors text-[16px] cursor-pointer"
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
