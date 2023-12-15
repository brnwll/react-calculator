import React from "react";
import "./Display.css";

const Display = ({ display, breadcrumbs }) => {
  const { inProgress, operator, complete } = breadcrumbs;
  return (
    <div id="display">
      <div>
        {complete}
        {inProgress} {operator}
      </div>
      <div>{display}</div>
    </div>
  );
};

export default Display;
