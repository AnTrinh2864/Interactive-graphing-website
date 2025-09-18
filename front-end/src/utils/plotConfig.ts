import { themeColors, type ThemeName } from "../themeSetting/themeColors"

export function buildLayout(theme: ThemeName = "forest", x_min: number, x_max:number) {
  const colors = themeColors[theme] ?? themeColors.forest;

  return {
    margin: { t: 20, l: 40, r: 20, b: 40 },
    xaxis: {
      zeroline: true,
      autorange: false,
      gridcolor: colors.grid,
      zerolinecolor: colors.axis,
      tickfont: { color: colors.axis },
      range: [x_min, x_max],
      scaleanchor: "y",     
      scaleratio: 1, 
    },
    yaxis: {
      zeroline: true,
      autorange: false,
      gridcolor: colors.grid,
      zerolinecolor: colors.axis,
      tickfont: { color: colors.axis }, 
    },
    hovermode: "closest" as const,
    clickmode: "event+select" as const,
    showlegend: false,
    paper_bgcolor: colors.paper,
    plot_bgcolor: colors.plot,
    autosize: true,
  };
};

export const config = {
  displayModeBar: true,
  responsive: true
};
