import React from "react";

const Display = ({ display, breadcrumbs }) => {
  const { term1, operator, term2, fullExpression } = breadcrumbs;
  return (
    <div id="display">
      <div>
        {fullExpression}
        {term1} {operator} {term2}
      </div>
      <div>{display}</div>
    </div>
  );
};

export default Display;
