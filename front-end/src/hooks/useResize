import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";

export const useResize = (plotRef: React.RefObject<HTMLDivElement|null>) => {
    useEffect(() => {
    const onResize = () => {
      if (plotRef.current && window.Plotly) {
        try { window.Plotly.Plots.resize(plotRef.current); } catch(e) {}
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
 }