export const themeColors = {
  default: {
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
  sunset: {
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
} as const;
export type ThemeName = "default" | "ocean" | "sunset";

