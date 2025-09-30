import { useEffect, useState, useCallback } from "react";
import type { Pixel } from "../api/types";
import { getPixels, setPixel } from "../api/client.tsx";

export function usePixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPixels = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      const data = await getPixels();
      setPixels(data);
    } catch (error) {
      console.error("Failed to fetch pixels:", error);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  }, []);

  const updatePixel = useCallback(
    async (x: number, y: number, color: string) => {
      try {
        await setPixel(x, y, color);
        await fetchPixels();
      } catch (error) {
        console.error("Failed to set pixel:", error);
      }
    },
    [fetchPixels]
  );

  useEffect(() => {
    fetchPixels(true); // Initial load
  }, [fetchPixels]);

  return { pixels, loading, updatePixel, fetchPixels };
}
