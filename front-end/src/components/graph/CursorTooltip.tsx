import React from "react";

interface CursorTooltipProps {
  coords: { x: number; y: number };
  mousePos: { x: number; y: number };
}

const CursorTooltip: React.FC<CursorTooltipProps> = ({ coords, mousePos }) => (
  <div
    id="cursor-tooltip"
    style={{
      left: `${mousePos.x}px`,
      top: `${mousePos.y}px`,
    }}
  >
    {`x: ${coords.x.toFixed(2)}, y: ${coords.y.toFixed(2)}`}
  </div>
);

export default CursorTooltip;
