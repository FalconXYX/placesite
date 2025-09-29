import { useEffect, useRef } from "react";
import type { Pixel } from "../api/types.tsx";
import styles from "./PixelCanvas.module.css";

interface PixelCanvasProps {
  pixels: Pixel[];
  onPixelClick: (x: number, y: number) => void;
  width: number;
  height: number;
  pixelSize: number;
}

export default function PixelCanvas({
  pixels,
  onPixelClick,
  width,
  height,
  pixelSize,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width * pixelSize, height * pixelSize);

    for (const { x, y, color } of pixels) {
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= width; i++) {
      ctx.beginPath();
      ctx.moveTo(i * pixelSize, 0);
      ctx.lineTo(i * pixelSize, height * pixelSize);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * pixelSize);
      ctx.lineTo(width * pixelSize, i * pixelSize);
      ctx.stroke();
    }
  }, [pixels, width, height, pixelSize]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    onPixelClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width * pixelSize}
      height={height * pixelSize}
      onClick={handleClick}
      className={styles.canvas}
    />
  );
}
