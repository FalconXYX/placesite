import styles from "./Palette.module.css";

interface PaletteProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export default function Palette({ colors, selected, onSelect }: PaletteProps) {
  return (
    <div className={styles.paletteContainer}>
      {colors.map((c) => (
        <div
          key={c}
          className={`${styles.paletteColor} ${
            selected === c ? styles.selected : ""
          }`}
          style={{ backgroundColor: c }}
          onClick={() => onSelect(c)}
        />
      ))}
    </div>
  );
}
