import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { layout, config } from "../../utils/plotConfig";

export const usePlotInit = (plotRef: React.RefObject<HTMLDivElement| null>) => {
  useEffect(() => {
    if (plotRef.current) {
      Plotly.newPlot(plotRef.current, [], layout, config);
    }
  }, []);
};
