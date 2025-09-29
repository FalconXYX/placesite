import axios from "axios";
import type { Pixel } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getPixels(): Promise<Pixel[]> {
  const res = await axios.get<Pixel[]>(`${API_URL}/pixels`);
  return res.data;
}

export async function setPixel(
  x: number,
  y: number,
  color: string
): Promise<Pixel> {
  const res = await axios.post<Pixel>(`${API_URL}/pixel`, { x, y, color });
  return res.data;
}
