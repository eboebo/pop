"use client";

import { TileLayerOption } from "@/lib/types";

interface TileLayerSelectorProps {
  selected: TileLayerOption;
  onChange: (layer: TileLayerOption) => void;
}

const options: { value: TileLayerOption; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "terrain", label: "Terrain" },
  { value: "satellite", label: "Satellite" },
  { value: "street", label: "Street" },
];

export default function TileLayerSelector({
  selected,
  onChange,
}: TileLayerSelectorProps) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-[#2a3a4e]">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-medium transition-all ${
            selected === opt.value
              ? "bg-[#4da6ff]/20 text-[#4da6ff]"
              : "bg-[#1a2736]/80 text-[#8899aa] hover:bg-[#243446]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
