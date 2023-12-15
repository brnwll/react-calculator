import React from "react";
import "./Display.css";

const Display = ({ display }) => {
  return (
    <div id="display">
      <div>{display}</div>
    </div>
  );
};

export default Display;
