"use client";

import { useState, useEffect } from "react";
import { LCRASiteType, SiteHistoryResponse } from "@/lib/types";

export function useSiteHistory(
  siteNumber: string | null,
  siteType: LCRASiteType
) {
  const [history, setHistory] = useState<SiteHistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteNumber) {
      setHistory(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/lcra-site/${siteNumber}/${siteType}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
      })
      .then((data) => {
        setHistory(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [siteNumber, siteType]);

  return { history, loading, error };
}
