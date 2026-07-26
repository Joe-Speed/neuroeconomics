import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import type { Theme } from "../lib/useTheme";

const SUN_COLOR = "#f5c518";
// A touch brighter than a true navy so it still reads clearly against the
// dark theme's near-black background, while staying unmistakably "dark blue."
const MOON_COLOR = "#2d3f8f";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <BsMoonStarsFill size={20} color={MOON_COLOR} /> : <BsSunFill size={22} color={SUN_COLOR} />}
    </button>
  );
}
