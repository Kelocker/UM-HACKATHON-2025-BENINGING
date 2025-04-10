import React from "react";
import placeholderImage from "../assets/random.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src={placeholderImage}
        alt="Error"
        style={{ maxWidth: "80%", maxHeight: "60%" }}
      />
      <button
        onClick={handleGoHome}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "red",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default ErrorPage;
