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
  isLoading: boolean;
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
  isLoading,
}) => {
  return (
    <div id="domain-form-container">
      <form id="domain-form">
        <div className="form-row">
          <label className="form-label">Minimum x value</label>
          <input
            id="x-min-input"
            type="number"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Maximum x value</label>
          <input
            id="x-max-input"
            type="number"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Number of Points</label>
          <input
            id="num-points-input"
            type="number"
            value={numPoints}
            onChange={(e) => setNumPoints(Number(e.target.value))}
          />
        </div>
      </form>

      <div id="button-group">
         <Button
          id="find-btn"
          size="lg"
          onClick={handleFindIntersections}
          disabled={isLoading} // prevent clicks while loading
        >
          {isLoading ? "Loading..." : "Find Intersections"}
        </Button>

        <Button
          id="clear-btn"
          size="lg"
          onClick={handleClearIntersections}
        >
          Clear Intersections
        </Button>
      </div>
    </div>
  );
};

export default DomainForm;
