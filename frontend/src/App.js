import React, { useEffect, useState } from 'react';
import IntentBox from "./components/IntentBox";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch((err) => console.error("API not reachable:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{message || "Connecting to Flask..."}</h1>
      <IntentBox />
    </div>
  );
}

export default App;
