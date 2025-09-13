import { useEffect } from "react";
import type { Point } from "../type";
import type { UsePlotlyProps } from "./types";

export const useCursorTracking = (
  plotRef: React.RefObject<HTMLDivElement|null>,
  { points, setHoveredPoint, setHoveredPointScreenPos, setMousePos, setCursorCoords }: UsePlotlyProps
) => {
  useEffect(() => {
    const plotEl = plotRef.current;
    if (!plotEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const layout = (plotEl as any)._fullLayout;
      const bb = plotEl.getBoundingClientRect();

      const xInData = layout.xaxis.p2d(e.clientX - bb.left - layout._size.l);
      const yInData = layout.yaxis.p2d(e.clientY - bb.top - layout._size.t);

      if (typeof xInData === "number" && typeof yInData === "number") {
        setMousePos({ x: e.clientX, y: e.clientY });
        setCursorCoords({ x: xInData, y: yInData });

        const proximity = 10;
        let nearestPoint: Point | null = null;
        let nearestPointScreenPos: { x: number; y: number } | null = null;
        let minDist = Infinity;

        points.forEach((p) => {
          const px = layout.xaxis.d2p(p.x) + bb.left + layout._size.l;
          const py = layout.yaxis.d2p(p.y) + bb.top + layout._size.t;
          const dist = Math.hypot(e.clientX - px, e.clientY - py);
          if (dist < proximity && dist < minDist) {
            nearestPoint = p;
            nearestPointScreenPos = { x: px, y: py };
            minDist = dist;
          }
        });

        setHoveredPoint(nearestPoint);
        setHoveredPointScreenPos(nearestPointScreenPos);
      }
    };

    const handleMouseLeave = () => {
      setHoveredPoint(null);
      setHoveredPointScreenPos(null);
      setCursorCoords(null);
    };

    plotEl.addEventListener("mousemove", handleMouseMove);
    plotEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      plotEl.removeEventListener("mousemove", handleMouseMove);
      plotEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [points, setHoveredPoint, setHoveredPointScreenPos, setMousePos, setCursorCoords]);
};
