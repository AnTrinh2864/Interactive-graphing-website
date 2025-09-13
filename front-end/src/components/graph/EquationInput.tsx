import React from "react";

interface EquationInputProps {
  equation: string;
  setEquation: (eq: string) => void;
  plotEquation: () => void;
}

const EquationInput: React.FC<EquationInputProps> = ({
  equation,
  setEquation,
  plotEquation
}) => (
  <div style={{ marginBottom: "10px" }}>
    <input
      type="text"
      placeholder="Enter equation, e.g. 2*x + 3"
      value={equation}
      onChange={(e) => setEquation(e.target.value)}
      style={{ marginRight: "10px" }}
    />
    <button onClick={plotEquation}>Plot Equation</button>
  </div>
);

export default EquationInput;
