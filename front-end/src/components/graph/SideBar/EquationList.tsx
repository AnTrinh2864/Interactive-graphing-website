import React from "react";
import { FaTrash } from "react-icons/fa";
import type { Equation } from "../../../type.ts";

interface EquationListProps {
  equations: Equation[];
  setEquations: React.Dispatch<React.SetStateAction<Equation[]>>;
  highlighted: string[];
  setHighlighted: React.Dispatch<React.SetStateAction<string[]>>;
  hidden: string[];
  setHidden: React.Dispatch<React.SetStateAction<string[]>>;
}

const EquationList: React.FC<EquationListProps> = ({
  equations,
  setEquations,
  highlighted,
  setHighlighted,
  hidden,
  setHidden,
}) => {
  const clearEquations = () => {
    setEquations([]);
    setHighlighted([]);
    setHidden([]);
  };

  return (
    <div>
      {equations.length === 0 ? (
        <p>No equations plotted</p>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              onClick={clearEquations}
              style={{
                marginLeft: "10px",
                color: "black",
                background: "grey",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                padding: "4px 6px",
              }}
              title="Delete All Equations"
            >
              <FaTrash />
            </button>
          </div>
        <ul>
          {equations.map((eq) => (
            <li
              key={eq.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: highlighted.includes(eq.id) ? "bold" : "normal",
                textDecoration: hidden.includes(eq.id) ? "line-through" : "none",
              }}
            >
              <span
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (hidden.includes(eq.id)) {
                    setHidden(hidden.filter((id) => id !== eq.id));
                  } else {
                    setHidden([...hidden, eq.id]);
                    setHighlighted(highlighted.filter((id) => id !== eq.id));
                  }
                }}
                onClick={() => {
                  if (highlighted.includes(eq.id)) {
                    setHighlighted(highlighted.filter((id) => id !== eq.id));
                  } else {
                    setHighlighted([...highlighted, eq.id]);
                    setHidden(hidden.filter((id) => id !== eq.id));
                  }
                }}
              >
                {eq.name}
              </span>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setEquations((prev) => prev.filter((e) => e.id !== eq.id));
                  setHighlighted(highlighted.filter((i) => i !== eq.id));
                  setHidden(hidden.filter((i) => i !== eq.id));
                }}
                style={{
                  marginRight: "5px",
                  color: "black",
                  background: "grey",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 4px",
                }}
                title="Delete equation"
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

export default EquationList;
