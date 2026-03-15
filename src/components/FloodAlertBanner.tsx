"use client";

import { useMemo } from "react";
import { Gauge } from "@/lib/types";

interface FloodAlertBannerProps {
  gauges: Gauge[];
  onAlertClick: (gauge: Gauge) => void;
}

interface Alert {
  gauge: Gauge;
  level: "flood" | "warning";
  ratio: number;
}

export default function FloodAlertBanner({
  gauges,
  onAlertClick,
}: FloodAlertBannerProps) {
  const alerts = useMemo(() => {
    const result: Alert[] = [];
    for (const gauge of gauges) {
      if (gauge.stage === null || gauge.bankfullStage === null) continue;

      const isFlood =
        (gauge.floodStage !== null && gauge.stage >= gauge.floodStage) ||
        gauge.stage >= gauge.bankfullStage;

      const ratio = gauge.stage / gauge.bankfullStage;

      if (isFlood) {
        result.push({ gauge, level: "flood", ratio });
      } else if (ratio >= 0.7) {
        result.push({ gauge, level: "warning", ratio });
      }
    }
    return result.sort((a, b) => b.ratio - a.ratio);
  }, [gauges]);

  if (alerts.length === 0) return null;

  const floodCount = alerts.filter((a) => a.level === "flood").length;
  const warnCount = alerts.filter((a) => a.level === "warning").length;

  return (
    <div className="absolute top-[52px] left-0 right-0 z-[999] px-4 py-2 bg-[#ff5252]/10 border-b border-[#ff5252]/20 backdrop-blur-sm">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold whitespace-nowrap flex-shrink-0">
          {floodCount > 0 && (
            <span className="text-[#ff5252]">
              {floodCount} Flood{floodCount > 1 ? "s" : ""}
            </span>
          )}
          {floodCount > 0 && warnCount > 0 && (
            <span className="text-[#8899aa]"> · </span>
          )}
          {warnCount > 0 && (
            <span className="text-[#ffb74d]">
              {warnCount} Warning{warnCount > 1 ? "s" : ""}
            </span>
          )}
        </span>
        {alerts.map((alert) => (
          <button
            key={alert.gauge.siteNumber}
            onClick={() => onAlertClick(alert.gauge)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:brightness-125 ${
              alert.level === "flood"
                ? "bg-[#ff5252]/20 text-[#ff5252] border border-[#ff5252]/30"
                : "bg-[#ffb74d]/20 text-[#ffb74d] border border-[#ffb74d]/30"
            }`}
          >
            <span className="truncate max-w-[120px] inline-block align-bottom">
              {alert.gauge.siteName}
            </span>
            <span className="font-mono ml-1">
              {alert.gauge.stage?.toFixed(1)}ft
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
