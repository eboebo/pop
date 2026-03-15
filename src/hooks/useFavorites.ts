"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "lcra-favorites";

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  const toggleFavorite = useCallback((siteNumber: string) => {
    setFavorites((prev) => {
      const next = prev.includes(siteNumber)
        ? prev.filter((s) => s !== siteNumber)
        : [...prev, siteNumber];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (siteNumber: string) => favorites.includes(siteNumber),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite };
}
