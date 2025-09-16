import { useRef } from "react";
import { usePlotInit } from "./usePlotInit";
import { usePlotUpdate } from "./usePlotUpdate";
import { useDrawingMode } from "./useDrawingMode";
import { usePointSelection } from "./usePointSelection";
import { useCursorTracking } from "./useCursorTracking";
import type { UsePlotlyProps } from "../types";

export const usePlotly = (props: UsePlotlyProps) => {
  const plotRef = useRef<HTMLDivElement>(null);

  // Initialize empty plot
  usePlotInit(plotRef, props.theme);

  // Update plot with data + theme
  usePlotUpdate(
    plotRef,
    props.points,
    props.equationData,
    props.hiddenEquationIds,
    props.highlightedEquationIds,
    props.hiddenPointIndices,
    props.highlightedPointIndices,
    props.hoveredPoint,
    props.selectedPoints,
    props.intersectionPoints,
    props.theme // ✅ pass theme properly as a prop
  );

  // Interaction hooks
  useDrawingMode(props);
  usePointSelection(plotRef, props);
  useCursorTracking(plotRef, props);

  return { plotRef };
};
