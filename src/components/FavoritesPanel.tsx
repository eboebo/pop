"use client";

import { useState, useRef, useEffect } from "react";
import { Gauge } from "@/lib/types";

interface FavoritesPanelProps {
  favorites: string[];
  gauges: Gauge[];
  onSelect: (gauge: Gauge) => void;
}

export default function FavoritesPanel({
  favorites,
  gauges,
  onSelect,
}: FavoritesPanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const favoriteGauges = gauges.filter((g) =>
    favorites.includes(g.siteNumber)
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (favorites.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
          open
            ? "bg-[#ffe066]/20 text-[#ffe066] border border-[#ffe066]/30"
            : "bg-[#1a2736]/80 text-[#8899aa] border border-[#2a3a4e]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="flex-shrink-0"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="text-xs">{favorites.length}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-72 max-h-64 overflow-y-auto rounded-lg bg-[#1a2736] border border-[#2a3a4e] shadow-2xl z-[1001]">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-[#8899aa] border-b border-[#2a3a4e]">
            Favorites
          </div>
          {favoriteGauges.length === 0 ? (
            <div className="px-3 py-4 text-sm text-[#8899aa] text-center">
              Loading...
            </div>
          ) : (
            favoriteGauges.map((gauge) => (
              <button
                key={gauge.siteNumber}
                onClick={() => {
                  onSelect(gauge);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#243446] transition-colors border-b border-[#2a3a4e]/50 last:border-b-0"
              >
                <div className="text-[#e8edf2] text-sm truncate">
                  {gauge.siteName}
                </div>
                <div className="text-[#8899aa] text-xs font-mono">
                  {gauge.hasRainfall && gauge.rainfall1Day !== null
                    ? `Rain: ${gauge.rainfall1Day.toFixed(2)}" · `
                    : ""}
                  {gauge.hasStageFlow && gauge.stage !== null
                    ? `Stage: ${gauge.stage.toFixed(2)} ft`
                    : ""}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
