import React from "react";
import "./Display.css";

const Display = ({ display, breadcrumbs }) => {
  const { term1, operator, term2, expression } = breadcrumbs;
  return (
    <div id="display">
      <div>
        {expression}
        {term1} {operator} {term2}
      </div>
      <div>{display}</div>
    </div>
  );
};

export default Display;
