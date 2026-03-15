"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { Gauge, TileLayerOption, ActiveLayers, FlyToTarget } from "@/lib/types";
import { useGaugeData } from "@/hooks/useGaugeData";
import { useFavorites } from "@/hooks/useFavorites";
import { useLakeData } from "@/hooks/useLakeData";
import LayerToggle from "@/components/LayerToggle";
import TileLayerSelector from "@/components/TileLayerSelector";
import StatsBar from "@/components/StatsBar";
import GaugeDetail from "@/components/GaugeDetail";
import GaugeSearch from "@/components/GaugeSearch";
import FavoritesPanel from "@/components/FavoritesPanel";
import FloodAlertBanner from "@/components/FloodAlertBanner";
import LakeLevelsPanel from "@/components/LakeLevelsPanel";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function timeAgo(date: Date | null): string {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Updated just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return "Updated 1 min ago";
  return `Updated ${minutes} min ago`;
}

function LcraInner() {
  const searchParams = useSearchParams();
  const { gauges, loading, lastUpdated } = useGaugeData();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { lakes, loading: lakesLoading } = useLakeData();

  const [tileLayer, setTileLayer] = useState<TileLayerOption>("dark");
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    rainfall: true,
    stageFlow: true,
    temperature: false,
  });
  const [selectedGauge, setSelectedGauge] = useState<Gauge | null>(null);
  const [flyToTarget, setFlyToTarget] = useState<FlyToTarget | null>(null);
  const [showLakes, setShowLakes] = useState(false);
  const [initialSiteHandled, setInitialSiteHandled] = useState(false);

  const toggleLayer = (layer: keyof ActiveLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const updatedText = useMemo(() => timeAgo(lastUpdated), [lastUpdated]);

  // Handle ?site= URL param on initial load
  useEffect(() => {
    if (initialSiteHandled || gauges.length === 0) return;
    const siteParam = searchParams.get("site");
    if (siteParam) {
      const gauge = gauges.find((g) => g.siteNumber === siteParam);
      if (gauge) {
        setSelectedGauge(gauge);
        setFlyToTarget({ lat: gauge.lat, lng: gauge.lng, key: Date.now() });
      }
    }
    setInitialSiteHandled(true);
  }, [gauges, searchParams, initialSiteHandled]);

  // Update URL when gauge is selected/deselected
  useEffect(() => {
    if (!initialSiteHandled) return;
    if (selectedGauge) {
      window.history.replaceState(null, "", `?site=${selectedGauge.siteNumber}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedGauge, initialSiteHandled]);

  const handleSelectGauge = useCallback((gauge: Gauge) => {
    setSelectedGauge(gauge);
    setFlyToTarget({ lat: gauge.lat, lng: gauge.lng, key: Date.now() });
  }, []);

  const handleDeselectGauge = useCallback(() => {
    setSelectedGauge(null);
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] px-4 py-3 bg-[#0f1923]/80 backdrop-blur-md border-b border-[#2a3a4e]/50">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[#e8edf2] font-bold text-lg whitespace-nowrap">
              LCRA Hydromet
            </h1>
            <LayerToggle activeLayers={activeLayers} onToggle={toggleLayer} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <GaugeSearch gauges={gauges} onSelect={handleSelectGauge} />
            <FavoritesPanel
              favorites={favorites}
              gauges={gauges}
              onSelect={handleSelectGauge}
            />
            <button
              onClick={() => setShowLakes((p) => !p)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                showLakes
                  ? "bg-[#4da6ff]/20 text-[#4da6ff] border-[#4da6ff]/30"
                  : "bg-[#1a2736]/80 text-[#8899aa] border-[#2a3a4e]"
              }`}
            >
              Lakes
            </button>
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

      {/* Flood Alerts */}
      <FloodAlertBanner gauges={gauges} onAlertClick={handleSelectGauge} />

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
            onSelectGauge={handleSelectGauge}
            onDeselectGauge={handleDeselectGauge}
            flyToTarget={flyToTarget}
          />
        )}
      </div>

      {/* Gauge Detail Panel */}
      {selectedGauge && (
        <GaugeDetail
          gauge={selectedGauge}
          onClose={handleDeselectGauge}
          isFavorite={isFavorite(selectedGauge.siteNumber)}
          onToggleFavorite={() => toggleFavorite(selectedGauge.siteNumber)}
        />
      )}

      {/* Lake Levels Panel */}
      {showLakes && (
        <LakeLevelsPanel
          lakes={lakes}
          loading={lakesLoading}
          onClose={() => setShowLakes(false)}
        />
      )}

      {/* Footer attribution */}
      <div className="absolute bottom-0 left-0 right-0 z-[999] text-center py-1 text-[10px] text-[#8899aa] bg-[#0f1923]/60 backdrop-blur-sm pointer-events-none">
        Data: LCRA Hydromet · Map: OpenStreetMap / CartoDB
      </div>
    </div>
  );
}

export default function LcraPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center bg-[#0f1923]">
          <div className="text-[#8899aa] text-sm">Loading...</div>
        </div>
      }
    >
      <LcraInner />
    </Suspense>
  );
}
