import React, { useState } from "react";

interface ManualRangeInputProps {
  addPoint: (x: number, y: number) => void;
}

const ManualRangeInput: React.FC<ManualRangeInputProps> = ({ addPoint }) => {
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
        placeholder="Min Range: -5"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <input
        id="input-y"
        type="text"
        placeholder="Max Range: 5"
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <button id="add-point-btn" onClick={handleAdd}>
        Change Range
      </button>
    </div>
  );
};

export default ManualRangeInput;
