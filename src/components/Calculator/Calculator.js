import React from "react";
import Button from "../Button/Button";
import "./Calculator.css";

const Calculator = () => {
  const buttons = [
    ["C", "+/-", "%", "+"],
    ["1", "2", "3", "-"],
    ["4", "5", "6", "X"],
    ["7", "8", "9", "/"],
    ["0", ".", "="],
  ];

  const onButtonClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <div id="calculator">
      <div id="display">123,689</div>
      {buttons.map((row, i) =>
        row.map((btn, j) => (
          <Button
            key={`${i}${j}`}
            buttonText={btn}
            onButtonClick={onButtonClick}
          />
        ))
      )}
    </div>
  );
};

export default Calculator;
