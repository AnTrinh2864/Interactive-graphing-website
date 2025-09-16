import { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { buildLayout } from "../../utils/plotConfig";
import {
  buildEquationTraces,
  buildIntersectionTrace,
  buildPointTrace,
} from "../../utils/traces";
import type { Point, Equation, IntersectionPoint } from "../../type";
import type { ThemeName } from "../../themeSetting/themeColors";
import { config } from "../../utils/plotConfig";

export const usePlotUpdate = (
  plotRef: React.RefObject<HTMLDivElement | null>,
  points: Point[],
  equationData: Equation[],
  hiddenEquationIds: string[],
  highlightedEquationIds: string[],
  hiddenPointIndices: number[],
  highlightedPointIndices: number[],
  hoveredPoint: Point | null,
  selectedPoints: Point[],
  intersectionPoints: IntersectionPoint[],
  theme: ThemeName // <- new
) => {
  useEffect(() => {
    if (!plotRef.current) return;
    const el = plotRef.current as any;

    // traces themed
    const eqTraces = buildEquationTraces(
      equationData,
      hiddenEquationIds,
      highlightedEquationIds,
      theme
    );
    const scatterPoints = buildPointTrace(
      points,
      selectedPoints,
      hiddenPointIndices,
      highlightedPointIndices,
      hoveredPoint,
      theme
    );
    const intersectionTrace = buildIntersectionTrace(intersectionPoints, theme);

    // layout themed
    const nextLayout: any = buildLayout(theme);

    // preserve zoom/pan ranges
    const full = el?._fullLayout;
    if (full?.xaxis?.range && full?.yaxis?.range) {
      nextLayout.xaxis = { ...nextLayout.xaxis, range: full.xaxis.range.slice() };
      nextLayout.yaxis = { ...nextLayout.yaxis, range: full.yaxis.range.slice() };
    }

    Plotly.react(
      plotRef.current,
      [...eqTraces, scatterPoints, intersectionTrace ?? {}],
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
    intersectionPoints,
    theme, // <- re-run when theme changes
  ]);
};
