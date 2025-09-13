import type { Point, Equation, IntersectionPoint } from "../type";

export function buildEquationTraces(
  equationData: Equation[],
  hiddenEquationIds: string[],
  highlightedEquationIds: string[]
) {
  return equationData.map((eq) => ({
    x: eq.x,
    y: eq.y?.map((v) => (v === null ? NaN : v)),
    type: "scatter" as const,
    mode: "lines" as const,
    name: eq.name,
    line: {
      color: hiddenEquationIds.includes(eq.id)
        ? "lightgray"
        : highlightedEquationIds.includes(eq.id)
        ? "orange"
        : "blue",
      width: highlightedEquationIds.includes(eq.id)
        ? 3
        : hiddenEquationIds.includes(eq.id)
        ? 1
        : 2,
    },
  }));
}

export function buildPointTrace(
  points: Point[],
  selectedPoints: Point[],
  hiddenPointIndices: number[],
  highlightedPointIndices: number[],
  hoveredPoint: Point | null
) {
  return {
    x: points.map((p) => p.x),
    y: points.map((p) => p.y),
    type: "scatter" as const,
    mode: "markers" as const,
    name: "Points",
    marker: {
      color: points.map((p, i) =>
        selectedPoints.includes(p)
          ? "darkgreen"
          : hiddenPointIndices.includes(i)
          ? "lightgray"
          : highlightedPointIndices.includes(i)
          ? "salmon"
          : "darkblue"
      ),
      size: points.map((p, i) => {
        const isHovered =
          hoveredPoint && hoveredPoint.x === p.x && hoveredPoint.y === p.y;
        if (isHovered) return 12;
        if (selectedPoints.includes(p)) return 12;
        return highlightedPointIndices.includes(i) ? 12 : 8;
      }),
    },
  };
}

export 
function buildIntersectionTrace(intersectionPoints: IntersectionPoint[]) {
    if (!intersectionPoints) {
        console.log("NO INTERSECTIONS FOUND")
        return null;
    }
  return {
    x: intersectionPoints.map((p) => p.x),
    y: intersectionPoints.map((p) => p.y),
    type: "scatter" as const,
    mode: "markers" as const,
    name: "Intersections",
    marker: {
      symbol: "star",
      size: 14,
      color: "#f7832a",
    },
  };
}