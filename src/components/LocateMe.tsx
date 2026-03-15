"use client";

import { useState } from "react";
import { useMap } from "react-leaflet";
import { CircleMarker } from "react-leaflet";

export default function LocateMe() {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!navigator.geolocation) return;

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(latlng);
        map.flyTo(latlng, 13, { duration: 1.2 });
        setLocating(false);
      },
      () => {
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <>
      <div className="absolute top-20 right-3 z-[1000]">
        <button
          onClick={handleLocate}
          disabled={locating}
          className="w-9 h-9 rounded-lg bg-[#1a2736]/90 border border-[#2a3a4e] text-[#8899aa] hover:text-[#e8edf2] hover:bg-[#243446] transition-all flex items-center justify-center"
          title="Find my location"
        >
          {locating ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-spin"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          )}
        </button>
      </div>

      {position && (
        <>
          <CircleMarker
            center={position}
            radius={12}
            pathOptions={{
              fillColor: "#4da6ff",
              fillOpacity: 0.2,
              color: "#4da6ff",
              weight: 1,
              opacity: 0.4,
            }}
          />
          <CircleMarker
            center={position}
            radius={5}
            pathOptions={{
              fillColor: "#4da6ff",
              fillOpacity: 1,
              color: "#ffffff",
              weight: 2,
              opacity: 0.8,
            }}
          />
        </>
      )}
    </>
  );
}
