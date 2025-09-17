export const themeColors = {
  forest: {
    grid: "#6d8455ff",
    axis: "#6c584c",
    paper: "#fffae4ff",
    plot: "#fffae4ff",
    line: "#718355",
    highlight: "#ca7d5aff",
    point: "#adc178ff",
    pointSelected: "#4d5e32ff",
    intersection: "#43271fff",
  },
  ocean: {
    grid: "#4a90e2",
    axis: "#003366",
    paper: "#e6f2ff",
    plot: "#e6f2ff",
    line: "#005b96",
    highlight: "#ff6600",
    point: "#66ccff",
    pointSelected: "#004080",
    intersection: "#ff3300",
  },
  love: {
    grid: "#ffad66",
    axis: "#663300",
    paper: "#fff5e6",
    plot: "#fff5e6",
    line: "#cc5200",
    highlight: "#990000",
    point: "#ff704d",
    pointSelected: "#802b00",
    intersection: "#ff0000",
  },
  // 🌸 Liliac theme
  liliac: {
    grid: "#4e4156",         // from intersection (neutral)
    axis: "#180247",         // highlight as axis
    paper: "#ebdaff",
    plot: "#ebdaff",
    line: "#4e1282",
    highlight: "#180247",
    point: "#a559d7",
    pointSelected: "#8d379a",
    intersection: "#4e4156",
  },

  // 🍊 Orange theme
  orange: {
    grid: "#654444",
    axis: "#772a2a",
    paper: "#fff5d4",
    plot: "#fff5d4",
    line: "#e68346",
    highlight: "#d35e33",
    point: "#af594a",
    pointSelected: "#772a2a",
    intersection: "#654444",
  },

  // ⚫ Monochrome theme
  monochrome: {
    grid: "#000000",
    axis: "#3b3b3b",
    paper: "#ffffff",
    plot: "#ffffff",
    line: "#abb0b7",
    highlight: "#71787e",
    point: "#4c4a51",
    pointSelected: "#3b3b3b",
    intersection: "#000000",
  },// 🌲 Forest Dark
  forest_dark: {
    grid: "#4a5639",          // muted green grid
    axis: "#cfd6c0",          // lighter axis
    paper: "#1d1f17",         // dark background
    plot: "#1d1f17",
    line: "#9bb57a",          // softer green line
    highlight: "#e2986e",     // warm highlight
    point: "#adc178",         // same accent
    pointSelected: "#d4e0a1", // lighter green
    intersection: "#f2e8dc",  // high contrast
  },

  // 🌊 Ocean Dark
  ocean_dark: {
    grid: "#2e4d66",
    axis: "#a0bcd8",
    paper: "#0e1922",
    plot: "#0e1922",
    line: "#66ccff",
    highlight: "#ff914d",
    point: "#4da6ff",
    pointSelected: "#b3e0ff",
    intersection: "#ff704d",
  },

  // ❤️ Love (Sunset) Dark
  love_dark: {
    grid: "#663300",
    axis: "#ffb399",
    paper: "#1a0f0e",
    plot: "#1a0f0e",
    line: "#ff9966",
    highlight: "#e06666",
    point: "#ff704d",
    pointSelected: "#ffb3a1",
    intersection: "#ff5c5c",
  },

  // 🌸 Liliac Dark
  liliac_dark: {
    grid: "#372f46",
    axis: "#c6a6f2",
    paper: "#1b1125",
    plot: "#1b1125",
    line: "#b07be6",
    highlight: "#d9a8ff",
    point: "#c58aed",
    pointSelected: "#e3c6f7",
    intersection: "#d4c2e2",
  },

  // 🍊 Orange Dark
  orange_dark: {
    grid: "#3d2a1b",
    axis: "#f1c1a6",
    paper: "#1e120a",
    plot: "#1e120a",
    line: "#ff935c",
    highlight: "#ff7043",
    point: "#ff8a65",
    pointSelected: "#ffc2a6",
    intersection: "#ffd7c2",
  },

  // ⚫ Monochrome Dark
  monochrome_dark: {
    grid: "#555555",
    axis: "#cccccc",
    paper: "#121212",
    plot: "#121212",
    line: "#bbbbbb",
    highlight: "#e0e0e0",
    point: "#d6d6d6",
    pointSelected: "#ffffff",
    intersection: "#f5f5f5",
  },

} as const;
export type ThemeName = "forest"
 | "ocean" 
 | "love" 
 | "liliac" 
 | "orange" 
 | "monochrome"
 | "forest_dark" 
 | "ocean_dark" 
 | "love_dark" 
 | "liliac_dark" 
 | "orange_dark" 
 | "monochrome_dark";

