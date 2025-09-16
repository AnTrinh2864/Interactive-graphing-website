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
          {/* Clear all points */}
          <div style={{display:"flex"}}>
          <div style={{width:"91%", fontWeight:"600"}}>Delete All Points</div>
          <div className="equation-actions">
            <button
              onClick={clearPoints}
              className="delete-btn"
              title="Delete All Points"
            >
              <FaTrash />
            </button>
          </div>
          </div>

          {/* Point list */}
          <ul className="point-list">
            {points.map((p, idx) => (
              <li
                key={idx}
                className={`point-item 
                  ${highlighted.includes(idx) ? "highlighted" : ""} 
                  ${hidden.includes(idx) ? "hidden" : ""}`}
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
                  className="delete-btn"
                  title="Delete Point"
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
