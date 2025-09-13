import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: 600,
          borderBottom: "1px solid #ccc",
          padding: "6px 0",
        }}
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "0.2s" }}>
          ▶
        </span>
      </div>
      {open && <div style={{ marginTop: "6px" }}>{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
