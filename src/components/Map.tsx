"use client";

import { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Gauge, TileLayerOption, ActiveLayers, FlyToTarget } from "@/lib/types";
import { getRainfallColor, getStageColor, getTemperatureColor } from "@/lib/colors";
import Legend from "./Legend";
import LocateMe from "./LocateMe";

const TILE_URLS: Record<TileLayerOption, { url: string; attribution: string }> =
  {
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    },
    terrain: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri",
    },
    street: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    },
  };

interface MapProps {
  gauges: Gauge[];
  activeLayers: ActiveLayers;
  tileLayer: TileLayerOption;
  onSelectGauge: (gauge: Gauge) => void;
  onDeselectGauge: () => void;
  flyToTarget: FlyToTarget | null;
}

function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => onMapClick(),
  });
  return null;
}

function FlyToHandler({ target }: { target: FlyToTarget | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 14, { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

export default function Map({
  gauges,
  activeLayers,
  tileLayer,
  onSelectGauge,
  onDeselectGauge,
  flyToTarget,
}: MapProps) {
  const tile = TILE_URLS[tileLayer];

  const temperatureMarkers = useMemo(() => {
    if (!activeLayers.temperature) return null;
    return gauges
      .filter((g) => g.temperature !== null)
      .map((gauge) => {
        const { color, radius, opacity } = getTemperatureColor(gauge.temperature);
        return (
          <CircleMarker
            key={`temp-${gauge.siteNumber}`}
            center={[gauge.lat, gauge.lng]}
            radius={radius}
            pathOptions={{
              fillColor: color,
              fillOpacity: opacity,
              color: "transparent",
              weight: 0,
            }}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onSelectGauge(gauge);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <div className="text-xs">
                <div className="font-semibold">{gauge.siteName}</div>
                <div>
                  Temp:{" "}
                  {gauge.temperature !== null
                    ? `${gauge.temperature.toFixed(1)}°F`
                    : "—"}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      });
  }, [gauges, activeLayers.temperature, onSelectGauge]);

  const rainfallMarkers = useMemo(() => {
    if (!activeLayers.rainfall) return null;
    return gauges
      .filter((g) => g.hasRainfall)
      .map((gauge) => {
        const { color, radius, opacity } = getRainfallColor(gauge.rainfall1Day);
        return (
          <CircleMarker
            key={`rain-${gauge.siteNumber}`}
            center={[gauge.lat, gauge.lng]}
            radius={radius}
            pathOptions={{
              fillColor: color,
              fillOpacity: opacity,
              color: "transparent",
              weight: 0,
            }}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onSelectGauge(gauge);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <div className="text-xs">
                <div className="font-semibold">{gauge.siteName}</div>
                <div>
                  24h Rain:{" "}
                  {gauge.rainfall1Day !== null
                    ? `${gauge.rainfall1Day.toFixed(2)}"`
                    : "—"}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      });
  }, [gauges, activeLayers.rainfall, onSelectGauge]);

  const stageFlowMarkers = useMemo(() => {
    if (!activeLayers.stageFlow) return null;
    return gauges
      .filter((g) => g.hasStageFlow)
      .map((gauge) => {
        const color = getStageColor(
          gauge.stage,
          gauge.bankfullStage,
          gauge.floodStage
        );
        return (
          <CircleMarker
            key={`flow-${gauge.siteNumber}`}
            center={[gauge.lat, gauge.lng]}
            radius={7}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.85,
              color: "rgba(255,255,255,0.5)",
              weight: 2,
            }}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onSelectGauge(gauge);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <div className="text-xs">
                <div className="font-semibold">{gauge.siteName}</div>
                <div>
                  Stage:{" "}
                  {gauge.stage !== null ? `${gauge.stage.toFixed(2)} ft` : "—"}
                </div>
                <div>
                  Flow: {gauge.flow !== null ? `${gauge.flow} cfs` : "—"}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      });
  }, [gauges, activeLayers.stageFlow, onSelectGauge]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[30.7, -98.0]}
        zoom={8}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer key={tileLayer} url={tile.url} attribution={tile.attribution} />
        <MapClickHandler onMapClick={onDeselectGauge} />
        <FlyToHandler target={flyToTarget} />
        <LocateMe />
        {temperatureMarkers}
        {rainfallMarkers}
        {stageFlowMarkers}
      </MapContainer>

      <Legend activeLayers={activeLayers} />
    </div>
  );
}
