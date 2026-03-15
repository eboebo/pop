export function getRainfallColor(rain24h: number | null): {
  color: string;
  radius: number;
  opacity: number;
} {
  if (rain24h === null || rain24h === 0) {
    return { color: "#3a4f6a", radius: 4, opacity: 0.3 };
  }
  if (rain24h < 0.25) {
    return { color: "#5b9aff", radius: 6, opacity: 0.85 };
  }
  if (rain24h < 1) {
    return { color: "#4da6ff", radius: 8, opacity: 0.85 };
  }
  if (rain24h < 2) {
    return { color: "#ffb74d", radius: 10, opacity: 0.85 };
  }
  if (rain24h < 4) {
    return { color: "#ff8a3d", radius: 13, opacity: 0.9 };
  }
  return { color: "#ff5252", radius: 16, opacity: 0.95 };
}

export function getStageColor(
  stage: number | null,
  bankfull: number | null,
  floodStage: number | null
): string {
  if (stage === null || bankfull === null) return "#3dd68c";

  if (floodStage !== null && stage >= floodStage) return "#ff5252";
  if (stage >= bankfull) return "#ff5252";

  const ratio = stage / bankfull;
  if (ratio >= 0.7) return "#ffb74d";
  if (ratio >= 0.4) return "#ffe066";
  return "#3dd68c";
}

export function getRainfallValueColor(value: number | null): string {
  if (value === null || value === 0) return "#8899aa";
  if (value >= 4) return "#ff6b6b";
  if (value >= 1) return "#ffb74d";
  return "#3dd68c";
}

export function getTemperatureColor(temp: number | null): {
  color: string;
  radius: number;
  opacity: number;
} {
  if (temp === null) {
    return { color: "#3a4f6a", radius: 4, opacity: 0.3 };
  }
  if (temp < 32) {
    return { color: "#7ecbff", radius: 6, opacity: 0.85 };
  }
  if (temp < 50) {
    return { color: "#5b9aff", radius: 6, opacity: 0.85 };
  }
  if (temp < 70) {
    return { color: "#3dd68c", radius: 6, opacity: 0.85 };
  }
  if (temp < 85) {
    return { color: "#ffb74d", radius: 6, opacity: 0.85 };
  }
  if (temp < 100) {
    return { color: "#ff8a3d", radius: 7, opacity: 0.9 };
  }
  return { color: "#ff5252", radius: 8, opacity: 0.95 };
}

export function getTemperatureValueColor(temp: number | null): string {
  if (temp === null) return "#8899aa";
  if (temp >= 100) return "#ff6b6b";
  if (temp >= 85) return "#ff8a3d";
  if (temp >= 70) return "#ffb74d";
  if (temp < 32) return "#7ecbff";
  return "#e8edf2";
}
