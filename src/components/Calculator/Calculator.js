import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

const buttons = [
  ["C", "⎌", "+"],
  ["1", "2", "3", "-"],
  ["4", "5", "6", "×"],
  ["7", "8", "9", "÷"],
  ["0", ".", "="],
];

const operators = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  // term1 operator term2 = result
  // store result to term1 to enable chaining
  const [term1, setTerm1] = useState("");
  const [operator, setOperator] = useState(""); // make this a function???
  const [term2, setTerm2] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      // A number is pressed
      // Build term1 if no operator is set
      // Build term2 if operator is set
      if (/\d/.test(key)) {
        // number 0 - 9 pressed
        if (!operator && !term2) {
          const updatedTerm = term1 ? term1 + key : key;
          setTerm1(updatedTerm);
          setDisplayValue(updatedTerm);
        } else if (operator) {
          const updatedTerm = term2 ? term2 + key : key;
          setTerm2(updatedTerm);
          setDisplayValue(updatedTerm);
        }
      }

      // An operator is pressed
      if (["+", "-", "*", "/"].includes(key)) {
        // operator pressed
        if (term1 && !term2) {
          setOperator(key);
        }
      }

      if (key === "c" || key === "C" || key === "Escape") {
        // clear calculator
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [operator, term1, term2, displayValue]);

  function clearCalculator() {
    setDisplayValue("");
    [setTerm1, setOperator, setTerm2].forEach((fn) => fn(""));
  }

  const onButtonClick = (e) => {
    // TODO: Use programmatic keydown events to trigger the same functionality
    // as the keyboard. Still being implemented...
    const keydownEvent = new KeyboardEvent("keydown", {
      key: "-",
      keyCode: 189, // KeyCode for - key
      code: "Minus",
      shiftKey: false,
      ctrlKey: false,
      altKey: false,
    });
  };

  return (
    <>
      <div id="calculator">
        <div id="display">{displayValue}</div>
        {buttons.map((row, i) =>
          row.map((btn, j) => (
            <Button
              key={`${i}${j}`}
              buttonText={btn}
              activeOperator={operator}
              onButtonClick={onButtonClick}
            />
          ))
        )}
      </div>
      <div>
        <p>term1: {term1}</p>
        <p>operator: {operator}</p>
        <p>term2: {term2}</p>
      </div>
    </>
  );
};

export default Calculator;
