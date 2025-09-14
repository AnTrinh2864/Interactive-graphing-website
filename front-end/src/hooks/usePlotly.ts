import { useRef } from "react";
import { usePlotInit } from "./usePlotInit";
import { usePlotUpdate } from "./usePlotUpdate";
import { useDrawingMode } from "./useDrawingMode";
import { usePointSelection } from "./usePointSelection";
import { useCursorTracking } from "./useCursorTracking";
import type { UsePlotlyProps } from "./types";
import { useResize } from "@react-spring/web";

export const usePlotly = (props: UsePlotlyProps) => {
  const plotRef = useRef<HTMLDivElement>(null);
  usePlotInit(plotRef);
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
  );
  useDrawingMode(props);
  usePointSelection(plotRef, props);
  useCursorTracking(plotRef, props);
  useResize(plotRef)
 
  return { plotRef };
};
