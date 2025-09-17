import { themeColors, type ThemeName } from "../themeSetting/themeColors"

export function buildLayout(theme: ThemeName = "default", x_min: number, x_max:number) {
  const colors = themeColors[theme] ?? themeColors.default;

  return {
    margin: { t: 20, l: 40, r: 20, b: 40 },
    xaxis: {
      zeroline: true,
      autorange: false,
      gridcolor: colors.grid,
      zerolinecolor: colors.axis,
      tickfont: { color: colors.axis },
      range: [x_min, x_max]
    },
    yaxis: {
      zeroline: true,
      autorange: false,
      gridcolor: colors.grid,
      zerolinecolor: colors.axis,
      tickfont: { color: colors.axis },
      range: [x_min, x_max]
    },
    hovermode: "closest" as const,
    clickmode: "event+select" as const,
    showlegend: false,
    paper_bgcolor: colors.paper,
    plot_bgcolor: colors.plot,
  };
};

export const config = {
  displayModeBar: true,
  responsive: true
};
