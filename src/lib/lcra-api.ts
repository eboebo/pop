import { LCRARawGauge, Gauge } from "./types";

function parseNum(val: string): number | null {
  if (val === "" || val === null || val === undefined) return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

export function parseGauge(raw: LCRARawGauge): Gauge | null {
  const lat = parseNum(raw.latitude);
  const lng = parseNum(raw.longitude);
  if (lat === null || lng === null) return null;

  const rainfall1Day = parseNum(raw.rainfall1Day);
  const rainfallToday = parseNum(raw.rainfallToday);
  const stage = parseNum(raw.stage);
  const flow = parseNum(raw.flow);

  const hasRainfall =
    rainfall1Day !== null ||
    rainfallToday !== null ||
    parseNum(raw.rainfall1Hour) !== null;
  const hasStageFlow = stage !== null || flow !== null;

  return {
    siteNumber: raw.siteNumber,
    siteName: raw.siteName,
    agency: raw.agency || "LCRA",
    dateTime: raw.dateTime,
    lat,
    lng,
    stage,
    flow,
    bankfullStage: parseNum(raw.bankfullStage),
    floodStage: parseNum(raw.floodStage),
    rainfall1Hour: parseNum(raw.rainfall1Hour),
    rainfall3Hours: parseNum(raw.rainfall3Hours),
    rainfall6Hours: parseNum(raw.rainfall6Hours),
    rainfall1Day,
    rainfallToday,
    rainfall1Week: parseNum(raw.rainfall1Week),
    rainfall2Weeks: parseNum(raw.rainfall2Weeks),
    rainfall30Days: parseNum(raw.rainfall30Days),
    temperature: parseNum(raw.temperature),
    relativeHumidity: parseNum(raw.relativeHumidity),
    hasRainfall,
    hasStageFlow,
  };
}

export function parseAllGauges(rawData: LCRARawGauge[]): Gauge[] {
  return rawData.map(parseGauge).filter((g): g is Gauge => g !== null);
}
