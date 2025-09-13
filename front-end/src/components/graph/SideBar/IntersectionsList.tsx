import React from "react";
import { FaTrash } from "react-icons/fa";
import type { IntersectionPoint } from "../../../type.ts";
import DomainForm from "./DomainForm.tsx";

interface IntersectionPointListProps {
  points: IntersectionPoint[];
  setPoints: React.Dispatch<React.SetStateAction<IntersectionPoint[]>>;
  xMax: number;
  xMin: number;
  numPoints: number;
  setXMax: React.Dispatch<React.SetStateAction<number>>;
  setXMin: React.Dispatch<React.SetStateAction<number>>;
  setNumPoints: React.Dispatch<React.SetStateAction<number>>;
  handleFindIntersections: () => void;
  handleClearIntersections: () => void;
  isLoading: boolean;
}

const IntersectionPointList: React.FC<IntersectionPointListProps> = ({
  points,
  setPoints,
  xMax,
  xMin,
  numPoints,
  setXMax,
  setXMin,
  setNumPoints,
  handleFindIntersections,
  handleClearIntersections,
  isLoading,
}) => {
  return (
    <div>
      <DomainForm
        xMax={xMax}
        xMin={xMin}
        numPoints={numPoints}
        setXMax={setXMax}
        setXMin={setXMin}
        setNumPoints={setNumPoints}
        handleClearIntersections={handleClearIntersections}
        handleFindIntersections={handleFindIntersections}
        isLoading={isLoading}
      />

      {points.length === 0 ? (
        <p>No intersection points found</p>
      ) : (
        <ul className="point-list">
          {points.map((p, idx) => (
            <li
              key={idx}
              className="point-item"
              onClick={() => console.log("Clicked:", p)}
            >
              <div className="point-info">
                <span className="point-coord">
                  ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                </span>
                <span>{p.from[0]}</span>
                <span>{p.from[1]}</span>
              </div>

              <button
                className="delete-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setPoints((prev) => prev.filter((_, i) => i !== idx));
                }}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntersectionPointList;
