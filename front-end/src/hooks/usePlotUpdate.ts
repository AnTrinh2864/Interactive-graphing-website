import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { layout, config } from "../utils/plotConfig";
import { buildEquationTraces, buildIntersectionTrace, buildPointTrace } from "../utils/traces";
import type { Point, Equation, IntersectionPoint } from "../type";

export const usePlotUpdate = (
  plotRef: React.RefObject<HTMLDivElement|null>,
  points: Point[],
  equationData: Equation[],
  hiddenEquationIds: string[],
  highlightedEquationIds: string[],
  hiddenPointIndices: number[],
  highlightedPointIndices: number[],
  hoveredPoint: Point | null,
  selectedPoints: Point[],
  intersectionPoints: IntersectionPoint[]
) => {
  useEffect(() => {
    if (!plotRef.current) return;
    const el = plotRef.current as any;
    const eqTraces = buildEquationTraces(
      equationData,
      hiddenEquationIds,
      highlightedEquationIds
    );
    const scatterPoints = buildPointTrace(
      points,
      selectedPoints,
      hiddenPointIndices,
      highlightedPointIndices,
      hoveredPoint
    );

    const full = el?._fullLayout;
    const nextLayout: any = { ...layout };

    if (full?.xaxis?.range && full?.yaxis?.range) {
      nextLayout.xaxis = { ...nextLayout.xaxis, range: full.xaxis.range.slice() };
      nextLayout.yaxis = { ...nextLayout.yaxis, range: full.yaxis.range.slice() };
    }
    const intersectionTrace = buildIntersectionTrace(intersectionPoints);
    Plotly.react(
      plotRef.current,
      [...eqTraces, scatterPoints, intersectionTrace? intersectionTrace : {}],
      nextLayout,
      config
    );
  }, [
    points,
    equationData,
    hiddenEquationIds,
    highlightedEquationIds,
    hiddenPointIndices,
    highlightedPointIndices,
    hoveredPoint,
    selectedPoints,
    intersectionPoints
  ]);
};
