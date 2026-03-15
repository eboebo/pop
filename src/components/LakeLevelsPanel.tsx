"use client";

import { LakeLevel } from "@/lib/types";

interface LakeLevelsPanelProps {
  lakes: LakeLevel[];
  loading: boolean;
  onClose: () => void;
}

function formatTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}

export default function LakeLevelsPanel({
  lakes,
  loading,
  onClose,
}: LakeLevelsPanelProps) {
  return (
    <div className="absolute top-16 right-4 z-[1000] w-80 max-h-[70vh] overflow-y-auto rounded-xl bg-[#1a2736]/95 backdrop-blur-md border border-[#2a3a4e] shadow-2xl">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[#4da6ff] text-xs font-semibold uppercase tracking-wider">
            Highland Lakes
          </h3>
          <button
            onClick={onClose}
            className="text-[#8899aa] hover:text-[#e8edf2] transition-colors text-lg leading-none p-1"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="text-[#8899aa] text-sm py-4 text-center">
            Loading lake levels...
          </div>
        ) : lakes.length === 0 ? (
          <div className="text-[#8899aa] text-sm py-4 text-center">
            No lake data available
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {lakes.map((lake) => (
              <div
                key={lake.siteNumber}
                className="rounded-lg bg-[#0f1923]/60 border border-[#2a3a4e]/50 p-3"
              >
                <div className="text-[#e8edf2] text-sm font-medium truncate">
                  {lake.location}
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-[#8899aa] text-xs">Elevation</span>
                  <span className="font-mono text-sm font-medium text-[#4da6ff]">
                    {lake.elevation.toFixed(2)} ft
                  </span>
                </div>
                <div className="text-[#8899aa] text-[10px] mt-1">
                  {formatTime(lake.dateTime)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
