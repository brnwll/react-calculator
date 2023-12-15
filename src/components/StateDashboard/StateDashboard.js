import React from "react";
import "./StateDashboard.css";

const StateDashboard = ({ term1, operator, term2, expression }) => {
  return (
    <div id="state-dashboard">
      <h2>State Dashboard</h2>
      <div>term1: {term1}</div>
      <div>operator: {operator}</div>
      <div>term2: {term2}</div>
      <div>expression: {expression}</div>
    </div>
  );
};

export default StateDashboard;
