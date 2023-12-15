import React from "react";
import "./StateDashboard.css";

const StateDashboard = ({ display, term1, operator, term2, breadcrumbs }) => {
  return (
    <div id="state-dashboard">
      <h2>State Dashboard</h2>
      <div className="stateSlice">
        <div>Display</div>
        <div>{display}</div>
      </div>
      <div className="stateSlice">
        <div>Term 1</div>
        <div>{term1}</div>
      </div>
      <div className="stateSlice">
        <div>Operator</div>
        <div>{operator}</div>
      </div>
      <div className="stateSlice">
        <div>Term 2</div>
        <div>{term2}</div>
      </div>
      <span>Breadcrumbs {"{...}"} </span>
      <div className="stateSlice">
        <div>Term 1</div>
        <div>{breadcrumbs.term1}</div>
      </div>
      <div className="stateSlice">
        <div>Operator</div>
        <div>{breadcrumbs.operator}</div>
      </div>
      <div className="stateSlice">
        <div>Expression</div>
        <div>{breadcrumbs.expression}</div>
      </div>
    </div>
  );
};

export default StateDashboard;
