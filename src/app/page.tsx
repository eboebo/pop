"use client";

import Link from "next/link";

const pages = [
  {
    href: "/lcra",
    title: "LCRA Hydromet",
    description: "Live rainfall and river stage data from gauges across the Lower Colorado River basin.",
    icon: "🌊",
  },
  {
    href: "/trivia",
    title: "WW1 Trivia",
    description: "Test your knowledge of the Great War with three levels of trivia questions.",
    icon: "🎖️",
  },
];

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1923]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-[#e8edf2] text-4xl font-bold mb-2 text-center">
          Hey PopPop!
        </h1>
        <p className="text-[#8899aa] text-center mb-12 text-lg">
          Pick something to explore.
        </p>

        <div className="flex flex-col gap-4">
          {pages.map(({ href, title, description, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-5 p-6 bg-[#1a2736] hover:bg-[#243446] border border-[#2a3a4e] rounded-2xl transition-colors"
            >
              <span className="text-5xl">{icon}</span>
              <div>
                <h2 className="text-[#e8edf2] text-xl font-semibold">{title}</h2>
                <p className="text-[#8899aa] text-sm mt-1">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
