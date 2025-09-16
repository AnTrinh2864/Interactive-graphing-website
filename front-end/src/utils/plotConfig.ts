export const layout = {
  margin: { t: 20, l: 40, r: 20, b: 40 },
  xaxis: { zeroline: true, autorange: false, 
          gridcolor: "#6d8455ff",     
          zerolinecolor: "#6c584c", 
          tickfont: { color: "#6c584c" }, },
  yaxis: { zeroline: true, 
          autorange: false, 
          gridcolor: "#6d8455ff",
          zerolinecolor: "#6c584c",
          tickfont: { color: "#6c584c" }, },
  hovermode: "closest" as const,
  clickmode: "event+select" as const,
  showlegend: false, 
  paper_bgcolor: "#fffae4ff",   // tea-green background
  plot_bgcolor: "#fffae4ff",    // parchment plot area
};

export const config = {
  displayModeBar: true,
  responsive: true
};
