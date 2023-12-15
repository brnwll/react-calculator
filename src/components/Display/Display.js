import React from "react";
import "./Display.css";

// TODO: This is a temporary hack that simply
// returns a message if the display is too long.
// Refactor to use a better solution, ie scientific notation
const format = (text) => {
  if (text.length > 37) {
    return "...some really big numbers";
  } else {
    return text;
  }
};

const Display = ({ display, breadcrumbs }) => {
  const { inProgress, operator, complete } = breadcrumbs;
  return (
    <div id="display">
      <div>
        {format(complete)}
        {format(inProgress)} {operator}
      </div>
      <div>{display}</div>
    </div>
  );
};

export default Display;
