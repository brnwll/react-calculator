import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

const buttons = [
  ["C", "+/-", "⎌", "+"],
  ["1", "2", "3", "-"],
  ["4", "5", "6", "x"],
  ["7", "8", "9", "÷"],
  ["0", ".", "="],
];

const operators = {
  [buttons[0][3]]: (x, y) => x + y,
  [buttons[1][3]]: (x, y) => x - y,
  [buttons[2][3]]: (x, y) => x * y,
  [buttons[3][3]]: (x, y) => x / y,
};

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [term1, setTerm1] = useState("");
  const [operator, setOperator] = useState("");
  const [term2, setTerm2] = useState("");

  const getCurrentTermAndSetter = () => ({
    term: operator ? term2 : term1,
    setTerm: operator ? setTerm2 : setTerm1,
  });

  function clearCalculator() {
    setDisplayValue("");
    [setTerm1, setOperator, setTerm2].forEach((fn) => fn(""));
  }

  function negateCurrentTerm() {
    // TODO: Bug fix. Click undo after equals
    const { term, setTerm } = getCurrentTermAndSetter();
    const updatedTerm = term ? -1 * term : "";
    setTerm(updatedTerm);
    setDisplayValue(updatedTerm);
  }

  function undo() {
    // TODO: Bug fix. Click undo after equals
    const { term, setTerm } = getCurrentTermAndSetter();
    const updatedTerm = term.slice(0, -1);
    setTerm(updatedTerm);
    setDisplayValue(updatedTerm);
  }

  function addNumberToCurrentTerm(number) {
    // TODO: Prevent leading zeros
    // TODO: Clear display after equals is clicked and then a number is clicked
    //       This will require another state slice to monitor when equals is clicked
    let { term, setTerm } = getCurrentTermAndSetter();
    if (term === "0") term = ""; // prevent leading zeros
    const updatedTerm = term ? term + number : number;
    setTerm(updatedTerm);
    setDisplayValue(updatedTerm);
  }

  function addDecimalToCurrentTerm() {
    const { term, setTerm } = getCurrentTermAndSetter();
    const noDecimalsIn = (term) => !term.includes(".");
    if (noDecimalsIn(term)) {
      const updatedTerm = term ? term + "." : "0.";
      setTerm(updatedTerm);
      setDisplayValue(updatedTerm);
    }
  }

  function handleOperatorClick(operator) {
    if (term1 && term2 && operator) handleEqualsClick();
    setOperator(operator);
  }

  function handleEqualsClick() {
    if (term1 && term2 && operator) {
      const result = operators[operator](Number(term1), Number(term2));
      setTerm1(result);
      setTerm2("");
      setOperator("");
      setDisplayValue(result);
    }
  }

  const onButtonClick = (e) => {
    const { value } = e.target;
    value === "C" && clearCalculator();
    value === "+/-" && negateCurrentTerm();
    value === "⎌" && undo();
    value === "." && addDecimalToCurrentTerm();
    value === "=" && handleEqualsClick();
    /\d/.test(value) && addNumberToCurrentTerm(value);
    ["+", "-", "x", "÷"].includes(value) && handleOperatorClick(value);
  };

  const normalizeKeyPress = (key) => {
    if (key === "Escape" || key === "c") return "C"; // clear calculator
    if (key === "Backspace") return "⎌"; // undo
    if (key === "*") return "x"; // multiply
    if (key === "/") return "÷"; // divide
    if (key === "Enter") return "="; // equals
    return key;
  };

  const handleKeyDown = ({ key }) => {
    onButtonClick({ target: { value: normalizeKeyPress(key) } });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <div id="calculator">
        <div id="display">{displayValue}</div>
        {buttons.map((row, i) =>
          row.map((btn, j) => (
            <Button
              key={`${i}${j}`}
              buttonText={btn}
              operatorButtonsArray={Object.keys(operators).concat(
                buttons[4][2]
              )}
              functionButtonsArray={[
                buttons[0][0],
                buttons[0][1],
                buttons[0][2],
              ]}
              onButtonClick={onButtonClick}
            />
          ))
        )}
      </div>
      {/* TODO: Delete the follow div once development is complete */}
      <div>
        <br />
        <br />
        <p>Term1: {term1}</p>
        <p>Operator: {operator}</p>
        <p>Term2: {term2}</p>
      </div>
    </>
  );
};

export default Calculator;
