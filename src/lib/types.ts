export interface LCRARawGauge {
  siteNumber: string;
  siteName: string;
  agency: string;
  dateTime: string;
  latitude: string;
  longitude: string;
  stage: string;
  flow: string;
  bankfullStage: string;
  floodStage: string;
  rainfall1Hour: string;
  rainfall3Hours: string;
  rainfall6Hours: string;
  rainfall1Day: string;
  rainfallToday: string;
  rainfall1Week: string;
  rainfall2Weeks: string;
  rainfall30Days: string;
  temperature: string;
  relativeHumidity: string;
  zoomLevel: string;
}

export interface Gauge {
  siteNumber: string;
  siteName: string;
  agency: string;
  dateTime: string;
  lat: number;
  lng: number;
  stage: number | null;
  flow: number | null;
  bankfullStage: number | null;
  floodStage: number | null;
  rainfall1Hour: number | null;
  rainfall3Hours: number | null;
  rainfall6Hours: number | null;
  rainfall1Day: number | null;
  rainfallToday: number | null;
  rainfall1Week: number | null;
  rainfall2Weeks: number | null;
  rainfall30Days: number | null;
  temperature: number | null;
  relativeHumidity: number | null;
  hasRainfall: boolean;
  hasStageFlow: boolean;
}

export type TileLayerOption = "dark" | "terrain" | "satellite" | "street";

export interface ActiveLayers {
  rainfall: boolean;
  stageFlow: boolean;
}
