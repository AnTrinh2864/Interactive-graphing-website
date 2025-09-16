import type { ThemeName } from "@/themeSetting/themeColors";
import type { Point, Equation, IntersectionPoint } from "../type";

export interface UsePlotlyProps {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  equationData: Equation[];
  setEquationData: React.Dispatch<React.SetStateAction<Equation[]>>;
  highlightedEquationIds: string[];
  highlightedPointIndices: number[];
  hiddenEquationIds: string[];
  hiddenPointIndices: number[];
  hoveredPoint: Point | null;
  setHoveredPoint: (p: Point | null) => void;
  setHoveredPointScreenPos: (pos: { x: number; y: number } | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  setCursorCoords: (coords: Point | null) => void;
  selectedPoints: Point[];
  setSelectedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  allowLine: boolean;
  allowCurve: boolean;
  allowCircle: boolean;
  intersectionPoints: IntersectionPoint[];
  theme: ThemeName;
}
