import React from "react";
import type { Point } from "../../../type.ts";

interface DrawingOptionsProps {
  allowLine: boolean;
  setAllowLine: React.Dispatch<React.SetStateAction<boolean>>;
  allowCurve: boolean;
  setAllowCurve: React.Dispatch<React.SetStateAction<boolean>>;
  allowCircle: boolean;
  setAllowCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

const DrawingOptions: React.FC<DrawingOptionsProps> = ({
  allowLine,
  setAllowLine,
  allowCurve,
  setAllowCurve,
  allowCircle,
  setAllowCircle,
  setSelectedPoints,
}) => {
  return (
    <div id="drawing-options">
      {/* Line */}
      <label>
        <input
          type="checkbox"
          checked={allowLine}
          onChange={(e) => {
            setAllowLine(e.target.checked);
            if (!allowLine && !allowCurve && !allowCircle) {
              setSelectedPoints([]);
            }
            if (e.target.checked) {
              setAllowCurve(false);
              setAllowCircle(false);
            }
          }}
        />
        Enable Line Drawing
      </label>

      {/* Curve */}
      <label>
        <input
          type="checkbox"
          checked={allowCurve}
          onChange={(e) => {
            setAllowCurve(e.target.checked);
            if (!allowCurve && !allowLine && !allowCircle) {
              setSelectedPoints([]);
            }
            if (e.target.checked) {
              setAllowLine(false);
              setAllowCircle(false);
            }
          }}
        />
        Enable Curve Drawing (ax² + bx + c)
      </label>

      {/* Circle */}
      <label>
        <input
          type="checkbox"
          checked={allowCircle}
          onChange={(e) => {
            setAllowCircle(e.target.checked);
            if (!allowCircle && !allowLine && !allowCurve) {
              setSelectedPoints([]);
            }
            if (e.target.checked) {
              setAllowLine(false);
              setAllowCurve(false);
            }
          }}
        />
        Enable Circle Drawing
      </label>
    </div>
  );
};

export default DrawingOptions;
