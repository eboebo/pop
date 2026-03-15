"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Gauge } from "@/lib/types";

interface GaugeSearchProps {
  gauges: Gauge[];
  onSelect: (gauge: Gauge) => void;
}

export default function GaugeSearch({ gauges, onSelect }: GaugeSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return gauges
      .filter(
        (g) =>
          g.siteName.toLowerCase().includes(q) ||
          g.siteNumber.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [gauges, query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            setQuery("");
          }
          if (e.key === "Enter" && results.length > 0) {
            onSelect(results[0]);
            setQuery("");
            setOpen(false);
          }
        }}
        placeholder="Search gauges..."
        className="w-36 sm:w-48 px-3 py-1.5 text-sm rounded-lg bg-[#1a2736]/80 border border-[#2a3a4e] text-[#e8edf2] placeholder-[#8899aa] focus:outline-none focus:border-[#4da6ff]/50"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-72 max-h-64 overflow-y-auto rounded-lg bg-[#1a2736] border border-[#2a3a4e] shadow-2xl z-[1001]">
          {results.map((gauge) => (
            <button
              key={gauge.siteNumber}
              onClick={() => {
                onSelect(gauge);
                setQuery("");
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#243446] transition-colors border-b border-[#2a3a4e]/50 last:border-b-0"
            >
              <div className="text-[#e8edf2] text-sm truncate">
                {gauge.siteName}
              </div>
              <div className="text-[#8899aa] text-xs">
                #{gauge.siteNumber} · {gauge.agency}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
