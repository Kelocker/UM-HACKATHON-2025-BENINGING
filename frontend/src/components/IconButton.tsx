import React from "react";

const IconButton = ({ onClick, Icon, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 focus:outline-none  ${className}`}
      style={{ touchAction: "manipulation" }}
    >
      <Icon className="w-6 h-6 text-black" />
    </button>
  );
};

export default IconButton;
