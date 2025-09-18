import React, { useState } from "react";
import styles from "./graphContainer.module.scss";
import { Dock } from "../../themeSetting/components/dock/Dock";
import { DockCard } from "../../themeSetting/components/dock-card/DockCard";
import { Card } from "../../themeSetting/components/card/Card";
import GraphPlot from "./GraphPlot";

interface Tab {
  id: string;
  label: string;
}

export default function GraphContainer() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: "tab1", label: "Tab 1" }]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = useState(false);

  const addTab = () => {
    const newId = `tab${tabs.length + 1}`;
    setTabs([...tabs, { id: newId, label: `Tab ${tabs.length + 1}` }]);
    setActiveTab(newId);
  };

  const deleteTab = (id: string) => {
    if (tabs.length === 1) return; // prevent deleting the last tab

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    // if the active tab was deleted, switch to the first one
    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button className={styles.toggleButton} onClick={() => setOpen(!open)}>
        Tabs
      </button>

      {/* Panel with tab options */}
      <div className={`${styles.themePanel} ${open ? styles.open : ""}`}>
        <Dock>
         {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          {/* Tab card */}
          <DockCard onClick={() => setActiveTab(tab.id)}>
            <Card src={"/assets/TabsIcon.png"} />
          </DockCard>

          {/* Delete card (only if more than 1 tab) */}
          {tabs.length > 1 && (
            <DockCard onClick={() => deleteTab(tab.id)}>
              <Card src={"/assets/x-mark.png"} />
            </DockCard>
          )}
        </React.Fragment>
      ))}

          {/* Add new tab */}
          <DockCard key="add" onClick={addTab}>
            <Card src={"/assets/add.png"} />
          </DockCard>
        </Dock>
      </div>

      {/* Graph area */}
      <div style={{ marginTop: "60px" }}>
        <GraphPlot key={activeTab} />
      </div>
    </>
  );
}
