import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { buildLayout, config } from "../../utils/plotConfig";
import type { ThemeName } from "../../themeSetting/themeColors";

export const usePlotInit = (
  plotRef: React.RefObject<HTMLDivElement | null>,
  theme: ThemeName
) => {
  useEffect(() => {
    if (plotRef.current) {
      const initialLayout = buildLayout(theme);
      Plotly.newPlot(plotRef.current, [], initialLayout, config);
    }
  }, [theme]); // <- re-run when theme changes
};
