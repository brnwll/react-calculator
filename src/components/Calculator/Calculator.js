import React, { useState, useEffect } from "react";
import Display from "../Display/Display";
import Button from "../Button/Button";
import StateDashboard from "../StateDashboard/StateDashboard";
import "./Calculator.css";

// TODO: Implement breadcrumbs to use toExpontential() on term1 and term2
//       when they are too long to display in the display div.
// TODO: Implement StateDashboard to use toExpontential() on term1 and term2
//       when they are too long to display in the display div.

const buttons = [
  ["C", "+/-", "%", "+"],
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
  expression: "", // term1 + operator + term2 + "="
};

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbState);
  const [term1, setTerm1] = useState("");
  const [operator, setOperator] = useState("");
  const [term2, setTerm2] = useState("");
  // ↓ Tracks: '=' click. Clear calculator if subsequent click is on number
  const [clearOnNumberClick, setClearOnNumberClick] = useState(false);

  const getActiveTermAndSetter = () => ({
    term: operator ? term2 : term1,
    setTerm: operator ? setTerm2 : setTerm1,
  });

  const toExponential = (value, threshold = 12, expLength = 8) =>
    String(value).length > threshold
      ? Number.parseFloat(value).toExponential(expLength)
      : value;

  function handleClear() {
    setBreadcrumbs(initialBreadcrumbState);
    [setDisplay, setTerm1, setOperator, setTerm2].forEach((fn) => fn(""));
  }

  function handleNegate() {
    const { term, setTerm } = getActiveTermAndSetter();
    const updatedTerm = term ? -1 * term : "";
    setTerm(updatedTerm);
    setDisplay(toExponential(updatedTerm));
  }

  function handlePercent() {
    const { term, setTerm } = getActiveTermAndSetter();
    const updatedTerm = term ? term / 100 : "";
    setTerm(updatedTerm);
    setDisplay(toExponential(updatedTerm));
  }

  function handleNumber(number) {
    let { term, setTerm } = getActiveTermAndSetter();
    term = term === "0" ? "" : term; // prevent leading zeros
    let updatedTerm = term ? term + number : number;
    if (clearOnNumberClick) {
      updatedTerm = number;
      setBreadcrumbs(initialBreadcrumbState);
      setClearOnNumberClick(false);
    }
    if (term1 && operator && !term2) {
      setBreadcrumbs({
        ...initialBreadcrumbState,
        term1: term1,
        operator: operator,
      });
    }
    setTerm(updatedTerm);
    setDisplay(toExponential(updatedTerm));
  }

  function handleDecimal() {
    const { term, setTerm } = getActiveTermAndSetter();
    if (clearOnNumberClick) {
      setTerm("0.");
      setDisplay("0.");
      setClearOnNumberClick(false);
    } else if (!String(term).includes(".")) {
      // prevent multiple decimals
      const updatedTerm = term ? term + "." : "0.";
      setTerm(updatedTerm);
      setDisplay(toExponential(updatedTerm));
    }
  }

  function handleOperator(operator) {
    if (term1 && term2 && operator) {
      handleEquals();
      const expression = `${term1} ${operator} ${term2} =`;
      setBreadcrumbs({ ...initialBreadcrumbState, term1: expression });
    } else if (term1 && operator) {
      setBreadcrumbs({ term1, operator, term2: "", expression: "" });
    }
    if (term1) {
      setOperator(operator);
    }
  }

  function handleEquals() {
    if (term1 && term2 && operator) {
      const result = operators[operator](Number(term1), Number(term2));
      const expression = `${term1} ${operator} ${term2} =`;
      setBreadcrumbs({ ...initialBreadcrumbState, expression });
      setTerm1(result);
      setTerm2("");
      setOperator("");
      setDisplay(toExponential(result));
      setClearOnNumberClick(true);
    }
  }

  const handleButtonClick = ({ target: { value } }) => {
    value === buttons[0][0] && handleClear(); // C
    value === buttons[0][1] && handleNegate(); // +/-
    value === buttons[0][2] && handlePercent(); // %
    value === buttons[4][1] && handleDecimal(); // .
    value === buttons[4][2] && handleEquals(); // =
    /\d/.test(value) && handleNumber(value); // 0-9
    Object.keys(operators).includes(value) && handleOperator(value); // + - x ÷
  };

  const normalizeKeyPress = (key) => {
    if (key === "Escape") return buttons[0][0]; // clear
    if (key === "%") return buttons[0][2]; // handlePercent
    if (key === "*") return buttons[2][3]; // multiply
    if (key === "/") return buttons[3][3]; // divide
    if (key === "Enter") return buttons[4][2]; // equals
    return key;
  };

  const handleKeyDown = ({ key }) => {
    handleButtonClick({ target: { value: normalizeKeyPress(key) } });
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
              handleButtonClick={handleButtonClick}
            />
          ))
        )}
      </div>
      <StateDashboard
        term1={term1}
        operator={operator}
        term2={term2}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
};

export default Calculator;
