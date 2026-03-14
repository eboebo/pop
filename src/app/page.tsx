"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

import { TileLayerOption, ActiveLayers } from "@/lib/types";
import { useGaugeData } from "@/hooks/useGaugeData";
import LayerToggle from "@/components/LayerToggle";
import TileLayerSelector from "@/components/TileLayerSelector";
import StatsBar from "@/components/StatsBar";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function timeAgo(date: Date | null): string {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Updated just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return "Updated 1 min ago";
  return `Updated ${minutes} min ago`;
}

export default function Home() {
  const { gauges, loading, lastUpdated } = useGaugeData();
  const [tileLayer, setTileLayer] = useState<TileLayerOption>("dark");
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    rainfall: true,
    stageFlow: true,
  });

  const toggleLayer = (layer: keyof ActiveLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const updatedText = useMemo(() => timeAgo(lastUpdated), [lastUpdated]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] px-4 py-3 bg-[#0f1923]/80 backdrop-blur-md border-b border-[#2a3a4e]/50">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[#e8edf2] font-bold text-lg whitespace-nowrap">
              LCRA Hydromet
            </h1>
            <LayerToggle activeLayers={activeLayers} onToggle={toggleLayer} />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatsBar gauges={gauges} />
            <TileLayerSelector selected={tileLayer} onChange={setTileLayer} />
            {lastUpdated && (
              <span className="text-[#8899aa] text-xs whitespace-nowrap">
                {updatedText}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-full">
        {loading && gauges.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-[#0f1923]">
            <div className="text-[#8899aa] text-sm">Loading gauge data...</div>
          </div>
        ) : (
          <Map
            gauges={gauges}
            activeLayers={activeLayers}
            tileLayer={tileLayer}
          />
        )}
      </div>

      {/* Footer attribution */}
      <div className="absolute bottom-0 left-0 right-0 z-[999] text-center py-1 text-[10px] text-[#8899aa] bg-[#0f1923]/60 backdrop-blur-sm pointer-events-none">
        Data: LCRA Hydromet · Map: OpenStreetMap / CartoDB
      </div>
    </div>
  );
}
