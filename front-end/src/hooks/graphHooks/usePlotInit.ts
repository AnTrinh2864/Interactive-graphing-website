import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { buildLayout, config } from "../../utils/plotConfig";
import type { ThemeName } from "../../themeSetting/themeColors";

export const usePlotInit = (
  plotRef: React.RefObject<HTMLDivElement | null>,
  theme: ThemeName,
  x_min:number,
  x_max:number,
) => {
  useEffect(() => {
    if (plotRef.current) {
      const initialLayout = buildLayout(theme, x_min, x_max);
      Plotly.newPlot(plotRef.current, [], initialLayout, config);
    }
  }, [theme, x_min, x_max]); // <- re-run when theme changes
};
