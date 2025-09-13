export const layout = {
  margin: { t: 20, l: 40, r: 20, b: 40 },
  xaxis: { zeroline: true, autorange: false },
  yaxis: { zeroline: true, autorange: false },
  hovermode: "closest" as const,
  clickmode: "event+select" as const,
  showlegend: false,
};

export const config = {
  displayModeBar: true,
};
