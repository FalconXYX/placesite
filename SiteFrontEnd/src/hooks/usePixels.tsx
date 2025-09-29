import { useEffect, useState, useCallback } from "react";
import type { Pixel } from "../api/types";
import { getPixels, setPixel } from "../api/client.tsx";

export function usePixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPixels = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPixels();
      setPixels(data);
      setError(null);
    } catch {
      setError("Failed to fetch pixels");
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePixel = useCallback(
    async (x: number, y: number, color: string) => {
      try {
        await setPixel(x, y, color);
        await fetchPixels();
      } catch {
        setError("Failed to set pixel");
      }
    },
    [fetchPixels]
  );

  useEffect(() => {
    fetchPixels();
  }, [fetchPixels]);

  return { pixels, loading, error, updatePixel, fetchPixels };
}
