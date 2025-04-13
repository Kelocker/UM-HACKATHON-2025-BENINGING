import React from "react";
import errorImg from "../assets/error.png";
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
        src={errorImg}
        alt="Error"
        style={{ maxWidth: "80%", maxHeight: "60%" }}
      />
      <button
        onClick={handleGoHome}
        className="mt-3 px-5 py-2 text-base text-white bg-black rounded-md hover:opacity-90"
      >
        Back to Home Page
      </button>
    </div>
  );
};

export default ErrorPage;
