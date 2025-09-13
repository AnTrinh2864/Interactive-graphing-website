import React from "react";
import type { Point, Equation, IntersectionPoint } from "../../../type.ts";
import DrawingOptions from "./DrawingOptions";
import EquationList from "./EquationList";
import PointList from "./PointList";
import IntersectionPointList from "./IntersectionsList.tsx";
import CollapsibleSection from "./Collapsible";

interface RightSidebarProps {
  equationData: Equation[];
  setEquationData: React.Dispatch<React.SetStateAction<Equation[]>>;
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  highlightedEquationIds: string[];
  setHighlightedEquationIds: React.Dispatch<React.SetStateAction<string[]>>;
  highlightedPointIndices: number[];
  setHighlightedPointIndices: React.Dispatch<React.SetStateAction<number[]>>;
  hiddenEquationIds: string[];
  setHiddenEquationIds: React.Dispatch<React.SetStateAction<string[]>>;
  hiddenPointIndices: number[];
  setHiddenPointIndices: React.Dispatch<React.SetStateAction<number[]>>;
  clearPoints: () => void;
  allowLine: boolean;
  setAllowLine: React.Dispatch<React.SetStateAction<boolean>>;
  allowCurve: boolean;
  setAllowCurve: React.Dispatch<React.SetStateAction<boolean>>;
  allowCircle: boolean;
  setAllowCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  handleFindIntersections: () => void;
  handleClearIntersections: () => void;
  IntersectionPoints: IntersectionPoint[];
  setIntersectionPoints: React.Dispatch<React.SetStateAction<IntersectionPoint[]>>;
  xMin: number;
  xMax: number;
  numPoints: number;
  setXMin: React.Dispatch<React.SetStateAction<number>>;
  setXMax: React.Dispatch<React.SetStateAction<number>>;
  setNumPoints: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = (props) => {
  const {
    equationData,
    setEquationData,
    highlightedEquationIds,
    setHighlightedEquationIds,
    hiddenEquationIds,
    setHiddenEquationIds,
    points,
    setPoints,
    highlightedPointIndices,
    setHighlightedPointIndices,
    hiddenPointIndices,
    setHiddenPointIndices,
    clearPoints,
    allowLine,
    setAllowLine,
    allowCurve,
    setAllowCurve,
    allowCircle,
    setAllowCircle,
    setSelectedPoints,
    handleFindIntersections,
    handleClearIntersections,
    IntersectionPoints,
    setIntersectionPoints,
    xMax,
    xMin,
    numPoints,
    setXMax,
    setXMin,
    setNumPoints,
    isLoading
  } = props;

  return (
    <div
      style={{
        width: "370px",
        marginLeft: "20px",
        borderLeft: "1px solid cadetblue",
        paddingLeft: "10px",
        height: "690px",
        overflowY: "auto",
      }}
    >
      <CollapsibleSection title="Intersections">
        <IntersectionPointList
          points={IntersectionPoints}
          setPoints={setIntersectionPoints}
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
      </CollapsibleSection>

      <CollapsibleSection title="Drawing Options">
        <DrawingOptions
          allowLine={allowLine}
          setAllowLine={setAllowLine}
          allowCurve={allowCurve}
          setAllowCurve={setAllowCurve}
          allowCircle={allowCircle}
          setAllowCircle={setAllowCircle}
          setSelectedPoints={setSelectedPoints}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Equations">
        <EquationList
          equations={equationData}
          setEquations={setEquationData}
          highlighted={highlightedEquationIds}
          setHighlighted={setHighlightedEquationIds}
          hidden={hiddenEquationIds}
          setHidden={setHiddenEquationIds}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Points">
        <PointList
          points={points}
          setPoints={setPoints}
          highlighted={highlightedPointIndices}
          setHighlighted={setHighlightedPointIndices}
          hidden={hiddenPointIndices}
          setHidden={setHiddenPointIndices}
          clearPoints={clearPoints}
        />
      </CollapsibleSection>
    </div>
  );
};

export default RightSidebar;
