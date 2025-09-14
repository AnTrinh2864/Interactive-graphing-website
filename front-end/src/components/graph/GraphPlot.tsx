import React, { useState } from "react";
import EquationInput from "./EquationInput";
import ManualPointInput from "./ManualPointInput";
import CursorTooltip from "./CursorTooltip";
import RightSidebar from "./SideBar/SideBar";
import { fetchIntersections, plotEquationAPI } from "../../apis/backend";
import { usePlotly } from "../../hooks/usePlotly";
import type { Point, Equation, IntersectionPoint } from "../../type";

const GraphPlot: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]); 
  const [equationData, setEquationData] = useState<Equation[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [cursorCoords, setCursorCoords] = useState<Point | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [equation, setEquation] = useState("");
  const [highlightedEquationIds, setHighlightedEquationIds] = useState<string[]>([]);
  const [highlightedPointIndices, setHighlightedPointIndices] = useState<number[]>([]);
  const [hiddenEquationIds, setHiddenEquationIds] = useState<string[]>([]);
  const [hiddenPointIndices, setHiddenPointIndices] = useState<number[]>([]);
  const [, setHoveredPointScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  // drawing mode states
  const [allowLine, setAllowLine] = useState(false);
  const [allowCurve, setAllowCurve] = useState(false);
  const [allowCircle, setAllowCircle] = useState(false);
  const [intersectionPoints, setIntersectionPoints] = useState<IntersectionPoint[]>([]);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [numPoints, setNumPoints] = useState(5000);

  // ✅ loading state
  const [loading, setLoading] = useState(false);

  const handleFindIntersections = async () => {
    setLoading(true); // show overlay
      let submitInfo = {
        equations: equationData,
        x_min: xMin,
        x_max: xMax,
        num_points: numPoints
      };
      const data = await fetchIntersections(submitInfo);
      if (data) {
        setIntersectionPoints(data);
        setLoading(false)
      } else {
        console.log("Fetched NULL");
        setLoading(false)
      }
  };

  const handleClearIntersections = () => {
    setIntersectionPoints([]);
  };

  const { plotRef } = usePlotly({
    points,
    setPoints,
    equationData,
    setEquationData,
    highlightedEquationIds,
    highlightedPointIndices,
    hiddenEquationIds,
    hiddenPointIndices,
    hoveredPoint,
    setHoveredPoint,
    setHoveredPointScreenPos,
    setMousePos,
    setCursorCoords,
    selectedPoints,
    setSelectedPoints,
    allowLine,
    allowCurve,
    allowCircle,
    intersectionPoints
  });

  const plotEquation = async () => {
    try {
      const eqData = await plotEquationAPI(equation);
      const newEq: Equation[] = eqData.map((eq) => ({
        ...eq,
        id: crypto.randomUUID(),
        name: "y = " + eq.name
      }));
      setEquationData((prev) => [...prev, ...newEq]);
      setEquation("");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const clearPoints = () => {
    setPoints([]);
    setSelectedPoints([]);
    setHoveredPoint(null);
    setHiddenPointIndices([]);
    setHighlightedPointIndices([]);
  };

  const addPoint = (x: number, y: number) =>
    setPoints((prev) => [...prev, { x, y }]);

    return (
    <div className="graph-container">
      {/* Left: Plot */}
      <div className="left-panel">
        <EquationInput
          equation={equation}
          setEquation={setEquation}
          plotEquation={plotEquation}
        />

        <ManualPointInput addPoint={addPoint} />

        <div className="plot-wrapper">
          <div ref={plotRef} className="plot-div" />
        </div>

        {/* Cursor tooltip */}
        {cursorCoords && !hoveredPoint && (
          <CursorTooltip coords={cursorCoords} mousePos={mousePos} />
        )}
      </div>

      {/* Right sidebar wrapper (makes sidebar responsive and scrollable) */}
      <div className="sidebar-wrapper">
        <RightSidebar
          equationData={equationData}
          points={points}
          setEquationData={setEquationData}
          setPoints={setPoints}
          highlightedEquationIds={highlightedEquationIds}
          setHighlightedEquationIds={setHighlightedEquationIds}
          highlightedPointIndices={highlightedPointIndices}
          setHighlightedPointIndices={setHighlightedPointIndices}
          hiddenEquationIds={hiddenEquationIds}
          setHiddenEquationIds={setHiddenEquationIds}
          hiddenPointIndices={hiddenPointIndices}
          setHiddenPointIndices={setHiddenPointIndices}
          clearPoints={clearPoints}
          allowLine={allowLine}
          setAllowLine={setAllowLine}
          allowCurve={allowCurve}
          setAllowCurve={setAllowCurve}
          allowCircle={allowCircle}
          setAllowCircle={setAllowCircle}
          setSelectedPoints={setSelectedPoints}
          handleClearIntersections={handleClearIntersections}
          handleFindIntersections={handleFindIntersections}
          IntersectionPoints={intersectionPoints}
          setIntersectionPoints={setIntersectionPoints}
          xMax={xMax}
          xMin={xMin}
          numPoints={numPoints}
          setXMax={setXMax}
          setXMin={setXMin}
          setNumPoints={setNumPoints}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
export default GraphPlot;