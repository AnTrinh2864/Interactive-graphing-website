import React from "react";

interface CursorTooltipProps {
  coords: { x: number; y: number };
  mousePos: { x: number; y: number };
}

const CursorTooltip: React.FC<CursorTooltipProps> = ({ coords, mousePos }) => (
  <div
    style={{
      position: "fixed",
      left: `${mousePos.x}px`,
      top: `${mousePos.y}px`,
      transform: "translate(-50%, -100%)",
      background: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      zIndex: 999,
      pointerEvents: "none",
    }}
  >
    {`x: ${coords.x.toFixed(2)}, y: ${coords.y.toFixed(2)}`}
  </div>
);

export default CursorTooltip;
