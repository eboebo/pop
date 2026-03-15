"use client";

import { useState } from "react";
import { Gauge } from "@/lib/types";
import {
  getRainfallValueColor,
  getStageColor,
  getTemperatureValueColor,
} from "@/lib/colors";
import { useSiteHistory } from "@/hooks/useSiteHistory";
import Sparkline from "./Sparkline";

interface GaugeDetailProps {
  gauge: Gauge;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
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

export default function GaugeDetail({
  gauge,
  onClose,
  isFavorite,
  onToggleFavorite,
}: GaugeDetailProps) {
  const [copied, setCopied] = useState(false);

  const historyType = gauge.hasStageFlow ? "flow" : gauge.hasRainfall ? "rain" : null;
  const { history, loading: historyLoading } = useSiteHistory(
    gauge.siteNumber,
    historyType ?? "rain"
  );

  const stageColor = getStageColor(
    gauge.stage,
    gauge.bankfullStage,
    gauge.floodStage
  );
  const stagePercent =
    gauge.stage !== null &&
    gauge.bankfullStage !== null &&
    gauge.bankfullStage > 0
      ? Math.round((gauge.stage / gauge.bankfullStage) * 100)
      : null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?site=${gauge.siteNumber}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="absolute bottom-4 left-4 z-[1000] w-80 max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto rounded-xl bg-[#1a2736]/95 backdrop-blur-md border border-[#2a3a4e] shadow-2xl sm:bottom-4 sm:left-4">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#e8edf2] font-semibold text-base leading-tight truncate">
              {gauge.siteName}
            </h3>
            <p className="text-[#8899aa] text-xs mt-0.5">
              #{gauge.siteNumber} · {gauge.agency} ·{" "}
              {formatTime(gauge.dateTime)}
            </p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={handleCopyLink}
              className="text-[#8899aa] hover:text-[#4da6ff] transition-colors p-1"
              title="Copy link"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3dd68c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              )}
            </button>
            <button
              onClick={onToggleFavorite}
              className="transition-colors p-1"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={isFavorite ? "#ffe066" : "none"}
                stroke={isFavorite ? "#ffe066" : "#8899aa"}
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="text-[#8899aa] hover:text-[#e8edf2] transition-colors text-lg leading-none p-1"
            >
              ×
            </button>
          </div>
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
            <RainRow label="14 Days" value={gauge.rainfall2Weeks} />
            <RainRow label="30 Days" value={gauge.rainfall30Days} />
          </div>
        )}

        {/* Stage/Flow section */}
        {gauge.hasStageFlow && (
          <div className="mb-3">
            <h4 className="text-[#3dd68c] text-xs font-semibold uppercase tracking-wider mb-1.5">
              Stage / Flow
            </h4>
            <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
              <span className="text-[#8899aa] text-sm">Stage</span>
              <span
                className="font-mono text-sm font-medium"
                style={{ color: stageColor }}
              >
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
                {gauge.bankfullStage !== null
                  ? `${gauge.bankfullStage} ft`
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
              <span className="text-[#8899aa] text-sm">Flood Stage</span>
              <span className="font-mono text-sm font-medium text-[#8899aa]">
                {gauge.floodStage !== null ? `${gauge.floodStage} ft` : "—"}
              </span>
            </div>
          </div>
        )}

        {/* Weather section */}
        {(gauge.temperature !== null || gauge.relativeHumidity !== null) && (
          <div className="mb-3">
            <h4 className="text-[#ff8a3d] text-xs font-semibold uppercase tracking-wider mb-1.5">
              Weather
            </h4>
            {gauge.temperature !== null && (
              <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
                <span className="text-[#8899aa] text-sm">Temperature</span>
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: getTemperatureValueColor(gauge.temperature) }}
                >
                  {gauge.temperature.toFixed(1)}°F
                </span>
              </div>
            )}
            {gauge.relativeHumidity !== null && (
              <div className="flex justify-between py-1.5 border-b border-[#2a3a4e]/50">
                <span className="text-[#8899aa] text-sm">Humidity</span>
                <span className="font-mono text-sm font-medium text-[#e8edf2]">
                  {gauge.relativeHumidity}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* 2-Week History */}
        {historyType && (
          <div>
            <h4 className="text-[#8899aa] text-xs font-semibold uppercase tracking-wider mb-1.5">
              2-Week History
            </h4>
            {historyLoading ? (
              <div className="h-16 rounded bg-[#0f1923]/60 animate-pulse" />
            ) : history?.records && history.records.length > 0 ? (
              <div className="flex flex-col gap-3">
                {history.value1Type && (
                  <Sparkline
                    data={history.records.map((r) => ({
                      dateTime: r.dateTime,
                      value: r.value1,
                    }))}
                    color={historyType === "flow" ? "#3dd68c" : "#4da6ff"}
                    label={history.value1Type}
                    unit={historyType === "flow" ? " ft" : '"'}
                  />
                )}
                {history.value2Type && (
                  <Sparkline
                    data={history.records.map((r) => ({
                      dateTime: r.dateTime,
                      value: r.value2,
                    }))}
                    color={historyType === "flow" ? "#4da6ff" : "#3dd68c"}
                    label={history.value2Type}
                    unit={historyType === "flow" ? " cfs" : '"'}
                  />
                )}
              </div>
            ) : (
              <div className="text-[#8899aa] text-xs py-2">
                No history data available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
