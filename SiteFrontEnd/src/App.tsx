import { useState } from "react";
import PixelCanvas from "./components/PixelCanvas";
import Palette from "./components/Palette.tsx";
import { usePixels } from "./hooks/usePixels.tsx";
import styles from "./App.module.css";

const GRID_WIDTH = 64;
const GRID_HEIGHT = 64;
const PIXEL_SIZE = 10;

const COLORS = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00a2ff",
  "#00ffff",
  "#ffd000ff",
];

function App() {
  const { pixels, loading, error, updatePixel } = usePixels();
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

  const handlePixelClick = (x: number, y: number) => {
    updatePixel(x, y, selectedColor);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pixel Art Creator</h1>
        <p className={styles.subtitle}>
          Unleash your creativity, one pixel at a time!
        </p>
      </header>
      <main className={styles.mainContent}>
        <Palette
          colors={COLORS}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />
        {loading && <p className={styles.loading}>Loading pixels...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <PixelCanvas
          pixels={pixels}
          onPixelClick={handlePixelClick}
          width={GRID_WIDTH}
          height={GRID_HEIGHT}
          pixelSize={PIXEL_SIZE}
        />
      </main>
    </div>
  );
}

export default App;
