import React from "react";
import { FaTrash } from "react-icons/fa";
import type { Point } from "../../../type.ts";

interface PointListProps {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  highlighted: number[];
  setHighlighted: React.Dispatch<React.SetStateAction<number[]>>;
  hidden: number[];
  setHidden: React.Dispatch<React.SetStateAction<number[]>>;
  clearPoints: () => void;
}

const PointList: React.FC<PointListProps> = ({
  points,
  setPoints,
  highlighted,
  setHighlighted,
  hidden,
  setHidden,
  clearPoints,
}) => {
  return (
    <div>
      {points.length === 0 ? (
        <p>No points added</p>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              onClick={clearPoints}
              style={{
                alignItems:"end",
                marginRight: "5px",
                color: "black",
                background: "grey",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                padding: "2px 6px",
              }}
              title="Delete All Points"
            >
              <FaTrash />
            </button>
          </div>
        <ul>
          {points.map((p, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: highlighted.includes(idx) ? "bold" : "normal",
                textDecoration: hidden.includes(idx) ? "line-through" : "none",
              }}
            >
              <span
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (hidden.includes(idx)) {
                    setHidden(hidden.filter((i) => i !== idx));
                  } else {
                    setHidden([...hidden, idx]);
                    setHighlighted(highlighted.filter((i) => i !== idx));
                  }
                }}
                onClick={() => {
                  if (highlighted.includes(idx)) {
                    setHighlighted(highlighted.filter((i) => i !== idx));
                  } else {
                    setHighlighted([...highlighted, idx]);
                    setHidden(hidden.filter((i) => i !== idx));
                  }
                }}
              >
                ({p.x.toFixed(2)}, {p.y.toFixed(2)})
              </span>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setPoints((prev) => prev.filter((_, i) => i !== idx));
                  setHidden(hidden.filter((i) => i !== idx));
                  setHighlighted(highlighted.filter((i) => i !== idx));
                }}
                style={{
                  marginRight: "5px",
                  color: "black",
                  background: "grey",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 4px",
                }}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default PointList;
