import React, { useState, useEffect } from "react";
import Display from "../Display/Display";
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
  [buttons[0][3]]: (x, y) => x + y, // +
  [buttons[1][3]]: (x, y) => x - y, // -
  [buttons[2][3]]: (x, y) => x * y, // x
  [buttons[3][3]]: (x, y) => x / y, // ÷
};

const initialBreadcrumbState = {
  term1: "",
  operator: "",
  term2: "",
  fullExpression: "",
};

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbState);
  const [term1, setTerm1] = useState("");
  const [operator, setOperator] = useState("");
  const [term2, setTerm2] = useState("");

  const [result, setResult] = useState("");

  // to clear display when a number is clicked after equals
  const [equalsClicked, setEqualsClicked] = useState(false);

  const getCurrentTermAndSetter = () => ({
    term: operator ? term2 : term1,
    setTerm: operator ? setTerm2 : setTerm1,
  });

  function clearCalculator() {
    setDisplay("");
    setBreadcrumbs(initialBreadcrumbState);
    [setTerm1, setOperator, setTerm2].forEach((fn) => fn(""));
  }

  function negateCurrentTerm() {
    const { term, setTerm } = getCurrentTermAndSetter();
    const updatedTerm = term ? -1 * term : "";
    setTerm(updatedTerm);
    setDisplay(updatedTerm);
  }

  function undo() {
    function undoOperator() {
      setOperator("");
      setDisplay(term1);
    }
    function undoTerm() {
      const { term, setTerm } = getCurrentTermAndSetter();
      const updatedTerm = String(term).slice(0, -1);
      setTerm(updatedTerm);
      setDisplay(updatedTerm);
    }
    term1 && operator && !term2 ? undoOperator() : undoTerm();
  }

  function addNumberToCurrentTerm(number) {
    let { term, setTerm } = getCurrentTermAndSetter();
    if (term === "0") term = ""; // prevent leading zeros
    let updatedTerm = term ? term + number : number;
    if (equalsClicked) {
      updatedTerm = number;
      //setBreadcrumbs(initialBreadcrumbState);
      setEqualsClicked(false);
    }
    setTerm(updatedTerm);
    setDisplay(updatedTerm);
  }

  function addDecimalToCurrentTerm() {
    const { term, setTerm } = getCurrentTermAndSetter();
    const noDecimalsIn = (term) => !term.includes(".");
    if (noDecimalsIn(term)) {
      const updatedTerm = term ? term + "." : "0.";
      setTerm(updatedTerm);
      setDisplay(updatedTerm);
    }
  }

  function handleOperatorClick(operator) {
    // BUG: Breadcrumbs are a little off when chaining
    //
    //
    //
    //
    //
    //

    if (term1 && term2 && operator) {
      handleEqualsClick();
      const fullExpression = `${term1} ${operator} ${term2} =`;
      setBreadcrumbs({ ...initialBreadcrumbState, term1: fullExpression });
    } else if (term1 && operator) {
      setBreadcrumbs({
        term1,
        operator,
        term2: "",
        fullExpression: "",
      });
    }
    if (term1) {
      setOperator(operator);
      /*
      setBreadcrumbs({
        term1,
        operator,
        term2: "",
        fullExpression: "",
      });
      */
    }
  }

  function handleEqualsClick() {
    if (term1 && term2 && operator) {
      const result = operators[operator](Number(term1), Number(term2));
      const fullExpression = `${term1} ${operator} ${term2} =`;
      setBreadcrumbs({ ...initialBreadcrumbState, fullExpression });
      setTerm1(result);
      setTerm2("");
      setOperator("");
      setDisplay(result);
      setEqualsClicked(true);
    }
  }

  const onButtonClick = (e) => {
    const { value } = e.target;
    value === buttons[0][0] && clearCalculator(); // clear
    value === buttons[0][1] && negateCurrentTerm(); // negate
    value === buttons[0][2] && undo(); // undo
    value === buttons[4][1] && addDecimalToCurrentTerm(); // decimal
    value === buttons[4][2] && handleEqualsClick();
    /\d/.test(value) && addNumberToCurrentTerm(value);
    Object.keys(operators).includes(value) && handleOperatorClick(value);
  };

  const normalizeKeyPress = (key) => {
    if (key === "Escape" || key === "c") return buttons[0][0]; // clear
    if (key === "Backspace") return buttons[0][2]; // undo
    if (key === "*") return buttons[2][3]; // multiply
    if (key === "/") return buttons[3][3]; // divide
    if (key === "Enter") return buttons[4][2]; // equals
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
        <Display display={display} breadcrumbs={breadcrumbs} />
        {buttons.map((row, i) =>
          row.map((btn, j) => (
            <Button
              key={`${i}${j}`}
              buttonText={btn}
              activeOperator={operator && !term2 ? operator : ""}
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

      <br />
      <br />
      <br />
      <div>Term 1: {term1}</div>
      <div>Operator: {operator}</div>
      <div>Term 2: {term2}</div>
    </>
  );
};

export default Calculator;
