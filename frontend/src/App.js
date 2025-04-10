import React, { useEffect, useState } from "react";
import "./styles/globals.css";
import AppRouter from "./AppRouter.tsx";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/api")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    // <div>
    //   <h1>{message}</h1>
    // </div>
    <AppRouter />
  );
}

export default App;
