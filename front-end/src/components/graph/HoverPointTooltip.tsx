import React, { useEffect, useState } from "react";
import type { Point } from "../../type";

interface HoveredPointTooltipProps {
  point: Point;
  screenPos: { x: number; y: number } | null;
  deletePoint: () => void;
  hideTooltip: () => void;
}

const HoveredPointTooltip: React.FC<HoveredPointTooltipProps> = ({
  point,
  screenPos,
  deletePoint,
  hideTooltip,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!point) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      hideTooltip();
    }, 1000); // optional auto-hide
    return () => clearTimeout(timer);
  }, [point]);

  const handleDelete = () => {
    deletePoint();
    setVisible(false);
    hideTooltip();
  };

  if (!visible || !screenPos) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: `${screenPos.x}px`,
        top: `${screenPos.y}px`,
        transform: "translate(-50%, -100%)",
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "6px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div>{`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}</div>
      <button
        onClick={handleDelete}
        style={{
          marginTop: "4px",
          background: "red",
          color: "white",
          border: "none",
          padding: "2px 6px",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Click again to delete point
      </button>
    </div>
  );
};

export default HoveredPointTooltip;
