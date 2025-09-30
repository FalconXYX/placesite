import { supabase } from "./supabaseClient";
import type { Pixel } from "./types";

let lastPixelPlacementTime = 0;

export async function getPixels(): Promise<Pixel[]> {
  const { data, error } = await supabase.from("pixels").select("*");
  if (error) {
    throw new Error(`Error fetching pixels: ${error.message}`);
  }
  return data || [];
}

export async function setPixel(
  x: number,
  y: number,
  color: string
): Promise<Pixel> {
  const currentTime = Date.now();
  if (currentTime - lastPixelPlacementTime < 1000) {
    throw new Error("You must wait 1 second before placing another pixel.");
  }
  lastPixelPlacementTime = currentTime;

  const { data, error } = await supabase
    .from("pixels")
    .insert([{ x, y, color }])
    .single();
  if (error) {
    throw new Error(`Error setting pixel: ${error.message}`);
  }
  return data;
}

export function startPixelPolling(
  callback: (pixels: Pixel[]) => void
): NodeJS.Timer {
  return setInterval(async () => {
    try {
      const pixels = await getPixels();
      callback(pixels);
    } catch (error) {
      console.error("Error during pixel polling:", error);
    }
  }, 1000);
}
