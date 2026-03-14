"use client";

import { useState, useEffect, useCallback } from "react";
import { Gauge } from "@/lib/types";

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function useGaugeData() {
  const [gauges, setGauges] = useState<Gauge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/lcra-data");
      if (!res.ok) throw new Error("Failed to fetch gauge data");
      const data: Gauge[] = await res.json();
      setGauges(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { gauges, loading, error, lastUpdated, refetch: fetchData };
}
