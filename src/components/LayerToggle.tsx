"use client";

import { ActiveLayers } from "@/lib/types";

interface LayerToggleProps {
  activeLayers: ActiveLayers;
  onToggle: (layer: keyof ActiveLayers) => void;
}

const layers: {
  key: keyof ActiveLayers;
  label: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    key: "rainfall",
    label: "Rainfall",
    color: "#4da6ff",
    bg: "rgba(77,166,255,0.2)",
    border: "rgba(77,166,255,0.3)",
  },
  {
    key: "stageFlow",
    label: "Stage / Flow",
    color: "#3dd68c",
    bg: "rgba(61,214,140,0.2)",
    border: "rgba(61,214,140,0.3)",
  },
  {
    key: "temperature",
    label: "Temp",
    color: "#ff8a3d",
    bg: "rgba(255,138,61,0.2)",
    border: "rgba(255,138,61,0.3)",
  },
];

export default function LayerToggle({
  activeLayers,
  onToggle,
}: LayerToggleProps) {
  return (
    <div className="flex gap-2">
      {layers.map((layer) => (
        <button
          key={layer.key}
          onClick={() => onToggle(layer.key)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border"
          style={
            activeLayers[layer.key]
              ? {
                  backgroundColor: layer.bg,
                  color: layer.color,
                  borderColor: layer.border,
                }
              : {
                  backgroundColor: "rgba(26,39,54,0.8)",
                  color: "#8899aa",
                  borderColor: "#2a3a4e",
                }
          }
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: activeLayers[layer.key]
                ? layer.color
                : "#8899aa",
            }}
          />
          {layer.label}
        </button>
      ))}
    </div>
  );
}
