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
          <div style={{display:"flex"}}>
          <div style={{width:"91%", fontWeight:"600"}}>Delete All Equations</div>
          <div className="equation-actions">
            <button
              onClick={clearEquations}
              className="delete-btn"
              title="Delete All Equations"
            >
              <FaTrash />
            </button>
          </div>
          </div>
          <ul className="equation-list">
            {equations.map((eq) => (
              <li
                key={eq.id}
                className={`equation-item ${
                  highlighted.includes(eq.id) ? "highlighted" : ""
                } ${hidden.includes(eq.id) ? "hidden" : ""}`}
              >
                <span
                  className="equation-name"
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
                  className="delete-btn"
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
