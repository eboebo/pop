"use client";

import { useState, useEffect, useCallback } from "react";
import { LakeLevel } from "@/lib/types";

const REFRESH_INTERVAL = 10 * 60 * 1000;

export function useLakeData() {
  const [lakes, setLakes] = useState<LakeLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/lake-levels");
      if (!res.ok) throw new Error("Failed to fetch lake data");
      const data: LakeLevel[] = await res.json();
      setLakes(data);
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

  return { lakes, loading, error };
}
