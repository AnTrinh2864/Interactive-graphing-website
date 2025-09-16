import { useEffect } from "react";
import { fitLine, fitQuadratic, fitCircle } from "../../apis/backend";
import type { Point, Equation } from "../../type";

interface Props {
  selectedPoints: Point[];
  setSelectedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  setEquationData: React.Dispatch<React.SetStateAction<Equation[]>>;
  allowLine: boolean;
  allowCurve: boolean;
  allowCircle: boolean;
  equationData: Equation[];
}

export const useDrawingMode = ({
  selectedPoints,
  setSelectedPoints,
  setEquationData,
  allowLine,
  allowCurve,
  allowCircle,
}: Props) => {
  useEffect(() => {
    if (allowLine && selectedPoints.length === 2) {
      const pts = [...selectedPoints];
      setSelectedPoints([]);
      fitLine(pts).then((eq) => setEquationData((prev) => [...prev, eq]));
    }

    if (allowCurve && selectedPoints.length === 3) {
      const pts = [...selectedPoints];
      setSelectedPoints([]);
      fitQuadratic(pts).then((eq) => setEquationData((prev) => [...prev, eq]));
    }

    if (allowCircle && selectedPoints.length === 2) {
      const pts = [...selectedPoints];
      setSelectedPoints([]);
      fitCircle(pts).then((eq) => setEquationData((prev) => [...prev, eq]));
    }
  }, [selectedPoints, allowLine, allowCurve, allowCircle, setEquationData]);
};
