"use client";

import { ActiveLayers } from "@/lib/types";

interface LayerToggleProps {
  activeLayers: ActiveLayers;
  onToggle: (layer: keyof ActiveLayers) => void;
}

export default function LayerToggle({
  activeLayers,
  onToggle,
}: LayerToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onToggle("rainfall")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          activeLayers.rainfall
            ? "bg-[#4da6ff]/20 text-[#4da6ff] border border-[#4da6ff]/30"
            : "bg-[#1a2736]/80 text-[#8899aa] border border-[#2a3a4e]"
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            activeLayers.rainfall ? "bg-[#4da6ff]" : "bg-[#8899aa]"
          }`}
        />
        Rainfall
      </button>
      <button
        onClick={() => onToggle("stageFlow")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          activeLayers.stageFlow
            ? "bg-[#3dd68c]/20 text-[#3dd68c] border border-[#3dd68c]/30"
            : "bg-[#1a2736]/80 text-[#8899aa] border border-[#2a3a4e]"
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            activeLayers.stageFlow ? "bg-[#3dd68c]" : "bg-[#8899aa]"
          }`}
        />
        Stage / Flow
      </button>
    </div>
  );
}
