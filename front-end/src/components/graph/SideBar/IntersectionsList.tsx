import React from "react";
import { FaTrash } from "react-icons/fa";
import type { IntersectionPoint } from "../../../type.ts";
import DomainForm from "./DomainForm.tsx";
import { Button } from "@/components/base/buttons/button";

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
        <ul>
          {points.map((p, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontWeight:  "normal",
                textDecoration: "none",
              }}
            >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={
                    {fontWeight:"bold"}
                }>
                ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                </span>
                <span>
                {p.from[0]} </span>
                <span>
                {p.from[1]}
                </span>
            </div>
              <Button
                onClick={(event: { stopPropagation: () => void; }) => {
                  event.stopPropagation();
                  setPoints((prev) => prev.filter((_, i) => i !== idx));
                }}
                style={{
                  marginRight: "5px",
                  color: "black",
                  background: "grey",
                  padding: "2px 4px",
                }}
              >
                <FaTrash />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntersectionPointList;
