"use client";

import { useMemo } from "react";

interface SparklineProps {
  data: { dateTime: string; value: number | null }[];
  color: string;
  label: string;
  unit?: string;
  height?: number;
}

export default function Sparkline({
  data,
  color,
  label,
  unit = "",
  height = 60,
}: SparklineProps) {
  const { points, currentValue, minVal, maxVal } = useMemo(() => {
    const filtered = data
      .map((d, i) => ({ x: i, y: d.value }))
      .filter((d): d is { x: number; y: number } => d.y !== null);

    if (filtered.length < 2) return { points: "", currentValue: null, minVal: null, maxVal: null };

    const minY = Math.min(...filtered.map((d) => d.y));
    const maxY = Math.max(...filtered.map((d) => d.y));
    const range = maxY - minY || 1;
    const width = 260;
    const padding = 4;
    const chartHeight = height - padding * 2;
    const xScale = width / (filtered.length - 1);

    const pts = filtered
      .map(
        (d) =>
          `${d.x * xScale},${chartHeight - ((d.y - minY) / range) * chartHeight + padding}`
      )
      .join(" ");

    return {
      points: pts,
      currentValue: filtered[filtered.length - 1]?.y ?? null,
      minVal: minY,
      maxVal: maxY,
    };
  }, [data, height]);

  if (!points) {
    return (
      <div className="text-[#8899aa] text-xs py-2">No history data available</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[#8899aa] text-[10px] uppercase tracking-wider">
          {label}
        </span>
        {currentValue !== null && (
          <span className="font-mono text-xs font-medium" style={{ color }}>
            {currentValue.toFixed(2)}{unit}
          </span>
        )}
      </div>
      <svg
        viewBox={`0 0 260 ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height }}
      >
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-[#8899aa] font-mono mt-0.5">
        <span>min {minVal?.toFixed(2)}{unit}</span>
        <span>max {maxVal?.toFixed(2)}{unit}</span>
      </div>
    </div>
  );
}
