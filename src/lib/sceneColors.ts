import type { Theme } from "./useTheme";

// Single glow color used for every interactive highlight in the 3D scene:
// selected/hovered anatomical parts and explode-view threads. Muted violet —
// reads as modern/sleek and sits at a clear distance (in both hue and
// saturation) from the pink tissue color, without resorting to neon.
export const GLOW_COLOR = "#a78bfa";

// Matches --surface per theme in index.css, so the canvas blends seamlessly
// with the header and side panel instead of showing as a separate dark box.
export const CANVAS_BACKGROUND: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#15161a",
};
