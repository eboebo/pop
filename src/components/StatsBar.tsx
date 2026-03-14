"use client";

import { Gauge } from "@/lib/types";

interface StatsBarProps {
  gauges: Gauge[];
}

export default function StatsBar({ gauges }: StatsBarProps) {
  const rainGauges = gauges.filter((g) => g.hasRainfall);
  const flowGauges = gauges.filter((g) => g.hasStageFlow);

  const maxRain = gauges.reduce((max, g) => {
    const r = g.rainfall1Day ?? 0;
    return r > max ? r : max;
  }, 0);

  const maxRainColor =
    maxRain >= 2 ? "text-[#ff6b6b]" : maxRain > 0 ? "text-[#4da6ff]" : "text-[#8899aa]";

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1a2736]/80 border border-[#2a3a4e] text-xs">
        <span className="w-2 h-2 rounded-full bg-[#4da6ff]" />
        <span className="text-[#8899aa]">Rain</span>
        <span className="text-[#e8edf2] font-mono font-medium">{rainGauges.length}</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1a2736]/80 border border-[#2a3a4e] text-xs">
        <span className="w-2 h-2 rounded-full bg-[#3dd68c]" />
        <span className="text-[#8899aa]">Flow</span>
        <span className="text-[#e8edf2] font-mono font-medium">{flowGauges.length}</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1a2736]/80 border border-[#2a3a4e] text-xs">
        <span className="text-[#8899aa]">Max 24h</span>
        <span className={`font-mono font-medium ${maxRainColor}`}>
          {maxRain.toFixed(2)}&quot;
        </span>
      </div>
    </div>
  );
}
