"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/lcra", label: "LCRA Hydromet" },
  { href: "/trivia", label: "WW1 Trivia" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full z-[1100] bg-[#0b1219] border-b border-[#2a3a4e]/60">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-12 gap-1">
        <Link
          href="/"
          className="text-[#e8edf2] font-bold text-lg mr-6 whitespace-nowrap hover:text-[#4da6ff] transition-colors"
        >
          PopPop
        </Link>

        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1a2736] text-[#4da6ff]"
                  : "text-[#8899aa] hover:text-[#e8edf2] hover:bg-[#1a2736]/50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
