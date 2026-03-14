"use client";

import { Gauge } from "@/lib/types";
import { getRainfallValueColor, getStageColor } from "@/lib/colors";

interface GaugeDetailProps {
  gauge: Gauge;
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

function RainRow({ label, value }: { label: string; value: number | null }) {
  const color = getRainfallValueColor(value);
  return (
    <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
      <span className="text-[#8899aa] text-sm">{label}</span>
      <span className="font-mono text-sm font-medium" style={{ color }}>
        {value !== null ? `${value.toFixed(2)}"` : "—"}
      </span>
    </div>
  );
}

export default function GaugeDetail({ gauge, onClose }: GaugeDetailProps) {
  const stageColor = getStageColor(
    gauge.stage,
    gauge.bankfullStage,
    gauge.floodStage
  );
  const stagePercent =
    gauge.stage !== null && gauge.bankfullStage !== null && gauge.bankfullStage > 0
      ? Math.round((gauge.stage / gauge.bankfullStage) * 100)
      : null;

  return (
    <div className="absolute bottom-4 left-4 z-[1000] w-80 max-w-[calc(100vw-2rem)] max-h-[60vh] overflow-y-auto rounded-xl bg-[#1a2736]/95 backdrop-blur-md border border-[#2a3a4e] shadow-2xl sm:bottom-4 sm:left-4">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#e8edf2] font-semibold text-base leading-tight truncate">
              {gauge.siteName}
            </h3>
            <p className="text-[#8899aa] text-xs mt-0.5">
              #{gauge.siteNumber} · {gauge.agency} · {formatTime(gauge.dateTime)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 text-[#8899aa] hover:text-[#e8edf2] transition-colors text-lg leading-none p-1"
          >
            ×
          </button>
        </div>

        {/* Rainfall section */}
        {gauge.hasRainfall && (
          <div className="mb-3">
            <h4 className="text-[#4da6ff] text-xs font-semibold uppercase tracking-wider mb-1.5">
              Rainfall
            </h4>
            <RainRow label="1 Hour" value={gauge.rainfall1Hour} />
            <RainRow label="3 Hours" value={gauge.rainfall3Hours} />
            <RainRow label="6 Hours" value={gauge.rainfall6Hours} />
            <RainRow label="24 Hours" value={gauge.rainfall1Day} />
            <RainRow label="Today" value={gauge.rainfallToday} />
            <RainRow label="7 Days" value={gauge.rainfall1Week} />
            <RainRow label="30 Days" value={gauge.rainfall30Days} />
          </div>
        )}

        {/* Stage/Flow section */}
        {gauge.hasStageFlow && (
          <div>
            <h4 className="text-[#3dd68c] text-xs font-semibold uppercase tracking-wider mb-1.5">
              Stage / Flow
            </h4>
            <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
              <span className="text-[#8899aa] text-sm">Stage</span>
              <span className="font-mono text-sm font-medium" style={{ color: stageColor }}>
                {gauge.stage !== null
                  ? `${gauge.stage.toFixed(2)} ft${stagePercent !== null ? ` (${stagePercent}%)` : ""}`
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
              <span className="text-[#8899aa] text-sm">Flow</span>
              <span className="font-mono text-sm font-medium text-[#e8edf2]">
                {gauge.flow !== null ? `${gauge.flow} cfs` : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
              <span className="text-[#8899aa] text-sm">Bank Full</span>
              <span className="font-mono text-sm font-medium text-[#8899aa]">
                {gauge.bankfullStage !== null ? `${gauge.bankfullStage} ft` : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8899aa] text-sm">Flood Stage</span>
              <span className="font-mono text-sm font-medium text-[#8899aa]">
                {gauge.floodStage !== null ? `${gauge.floodStage} ft` : "—"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
