import { useEffect, useState } from "react";
import { pingBackend } from "../apis/backend";

export default function HelloBackend() {
  const [msg, setMsg] = useState("...");

  useEffect(() => {
    pingBackend().then((res) => setMsg(res));
  }, []);

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Backend Test</h2>
      <p>Backend says: {msg}</p>
    </div>
  );
}
