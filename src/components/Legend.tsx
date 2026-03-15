"use client";

import { ActiveLayers } from "@/lib/types";

interface LegendProps {
  activeLayers: ActiveLayers;
}

export default function Legend({ activeLayers }: LegendProps) {
  const anyActive =
    activeLayers.rainfall || activeLayers.stageFlow || activeLayers.temperature;

  return (
    <div className="absolute bottom-4 right-4 z-[1000] rounded-xl bg-[#1a2736]/90 backdrop-blur-md border border-[#2a3a4e] p-3 text-xs">
      {activeLayers.rainfall && (
        <div className="mb-2 last:mb-0">
          <div className="text-[#4da6ff] font-semibold uppercase tracking-wider mb-1.5 text-[10px]">
            24h Rainfall
          </div>
          <div className="flex flex-col gap-1">
            {[
              { color: "#3a4f6a", label: "None" },
              { color: "#5b9aff", label: '< 0.25"' },
              { color: "#4da6ff", label: '0.25–1"' },
              { color: "#ffb74d", label: '1–2"' },
              { color: "#ff8a3d", label: '2–4"' },
              { color: "#ff5252", label: '4"+' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#8899aa]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeLayers.stageFlow && (
        <div className="mb-2 last:mb-0">
          <div className="text-[#3dd68c] font-semibold uppercase tracking-wider mb-1.5 text-[10px]">
            Stage Level
          </div>
          <div className="flex flex-col gap-1">
            {[
              { color: "#3dd68c", label: "Normal" },
              { color: "#ffe066", label: "Elevated" },
              { color: "#ffb74d", label: "High" },
              { color: "#ff5252", label: "Flood" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 border border-white/50"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#8899aa]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeLayers.temperature && (
        <div className="mb-2 last:mb-0">
          <div className="text-[#ff8a3d] font-semibold uppercase tracking-wider mb-1.5 text-[10px]">
            Temperature
          </div>
          <div className="flex flex-col gap-1">
            {[
              { color: "#7ecbff", label: "< 32°F" },
              { color: "#5b9aff", label: "32–50°F" },
              { color: "#3dd68c", label: "50–70°F" },
              { color: "#ffb74d", label: "70–85°F" },
              { color: "#ff8a3d", label: "85–100°F" },
              { color: "#ff5252", label: "100°F+" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#8899aa]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!anyActive && (
        <div className="text-[#8899aa]">No layers active</div>
      )}
    </div>
  );
}
