import React, { useState } from "react";

interface ManualPointInputProps {
  addPoint: (x: number, y: number) => void;
}

const ManualPointInput: React.FC<ManualPointInputProps> = ({ addPoint }) => {
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");

  const handleAdd = () => {
    const xNum = parseFloat(x);
    const yNum = parseFloat(y);

    if (isNaN(xNum) || isNaN(yNum)) {
      alert("Please enter valid numbers for X and Y.");
      return;
    }

    addPoint(xNum, yNum);
    setX("");
    setY("");
  };

  return (
    <div id="manual-point-container">
      <input
        id="input-x"
        type="text"
        placeholder="X"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <input
        id="input-y"
        type="text"
        placeholder="Y"
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <button id="add-point-btn" onClick={handleAdd}>
        Add Point
      </button>
    </div>
  );
};

export default ManualPointInput;
