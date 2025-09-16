import { useEffect } from "react";
import type { Point } from "../../type";
import type { UsePlotlyProps } from "../types";

export const usePointSelection = (
  plotRef: React.RefObject<HTMLDivElement|null>,
  { points, setPoints, setSelectedPoints, allowLine, allowCurve, allowCircle }: UsePlotlyProps
) => {
  useEffect(() => {
    const plotEl = plotRef.current as any;
    if (!plotEl) return;

    const handleDomClick = (e: MouseEvent) => {
      const layout = plotEl._fullLayout;
      const bb = plotEl.getBoundingClientRect();

      const xPixel = e.clientX - bb.left - layout._size.l;
      const yPixel = e.clientY - bb.top - layout._size.t;
      if (xPixel < 0 || xPixel > layout._size.w || yPixel < 0 || yPixel > layout._size.h) return;

      const xInData = layout.xaxis.p2d(xPixel);
      const yInData = layout.yaxis.p2d(yPixel);
      if (typeof xInData !== "number" || typeof yInData !== "number") return;

      let nearestPoint: Point | null = null;
      let minDist = Infinity;
      const proximity = 15;

      points.forEach((p) => {
        const px = layout.xaxis.d2p(p.x) + bb.left + layout._size.l;
        const py = layout.yaxis.d2p(p.y) + bb.top + layout._size.t;
        const dist = Math.hypot(e.clientX - px, e.clientY - py);
        if (dist < proximity && dist < minDist) {
          nearestPoint = p;
          minDist = dist;
        }
      });

      if (nearestPoint) {
        if (allowCircle || allowCurve || allowLine) {
          setSelectedPoints((prev) => [...prev, nearestPoint!]);
        }
      } else {
        const newPoint: Point = { x: xInData, y: yInData };
        setPoints((prev) => [...prev, newPoint]);
        if (allowCircle || allowCurve || allowLine) {
          setSelectedPoints((prev) => [...prev, newPoint]);
        }
      }
    };

    plotEl.addEventListener("click", handleDomClick);
    return () => plotEl.removeEventListener("click", handleDomClick);
  }, [points, setPoints, setSelectedPoints, allowLine, allowCurve, allowCircle]);
};
