import { useState } from "react";
import GraphContainer from "./components/graph/GraphContainer";
import SmileApp from "./components/base/intro/smileFace";
import GraphPlot from "./components/graph/GraphPlot";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [exiting, setExiting] = useState(false);

  const handleClick = () => {
    if (showSplash && !exiting) {
      setExiting(true); // trigger exit animation
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", paddingTop: "20px", paddingLeft: "20px" }} onClick={handleClick}>
      {showSplash ? (
        <SmileApp
          isExiting={exiting}
          onExitComplete={() => setShowSplash(false)} // unmount after animation
        />
      ) : (
        <>
          {/* there are graph container with tabs but need to work on it */}
          <GraphPlot/>
        </>
      )}
    </div>
  );
}

export default App;
