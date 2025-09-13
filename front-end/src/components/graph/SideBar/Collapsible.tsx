import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div id="collapsible-section">
      <div
        id="collapsible-header"
        onClick={() => setOpen(!open)}
      >
        <span id="collapsible-title">{title}</span>
        <span
          id="collapsible-arrow"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ▶
        </span>
      </div>
      {open && <div id="collapsible-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
