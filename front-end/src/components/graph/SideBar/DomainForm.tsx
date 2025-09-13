import React from "react";
import { Button } from "@/components/base/buttons/button";
interface DomainFormProps {
  xMin: number;
  xMax: number;
  numPoints: number;
  setXMin: React.Dispatch<React.SetStateAction<number>>;
  setXMax: React.Dispatch<React.SetStateAction<number>>;
  setNumPoints: React.Dispatch<React.SetStateAction<number>>;
  handleFindIntersections: () => void;
  handleClearIntersections: () => void;
  isLoading: boolean
}

const DomainForm: React.FC<DomainFormProps> = ({
  xMax,
  xMin,
  setXMax,
  setXMin,
  numPoints,
  setNumPoints,
  handleFindIntersections,
  handleClearIntersections,
  isLoading
}) => {
  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 500,
    marginRight: "10px",
    flex: "1",
  };

  const inputStyle: React.CSSProperties = {
    flex: "0 0 100px",
    padding: "4px 6px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    textAlign: "right",
  };

  return (
    <div>
    <div style={{ padding: "10px" }}>
    
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div style={rowStyle}>
          <label style={labelStyle}>Minimum x value</label>
          <input
            type="number"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Maximum x value</label>
          <input
            type="number"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Num Points</label>
          <input
            type="number"
            value={numPoints}
            onChange={(e) => setNumPoints(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
      </form>
      <Button color= {"secondary"}size= {"lg"} showTextWhileLoading= {true} isLoading={isLoading} onClick={handleFindIntersections}>Find Intersections</Button>
      <Button color = {"secondary-destructive"} size= {"lg"} onClick={handleClearIntersections}>
          Clear Intersections
      </Button>
    </div>
    </div>
  );
};

export default DomainForm;
