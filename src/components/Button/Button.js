import React from "react";
import "./Button.css";

const Button = ({ buttonText, onButtonClick }) => {
  // Construct the id for the button
  const getId = () => {
    switch (buttonText) {
      case "C":
        return "btnClear";
      case "+/-":
        return "btnNegate";
      case "%":
        return "btnPercent";
      case "+":
        return "btnAdd";
      case "-":
        return "btnSubtract";
      case "X":
        return "btnMultiply";
      case "/":
        return "btnDivide";
      case "=":
        return "btnEquals";
      default:
        return "btn" + buttonText;
    }
  };

  // Construct the class name for the button
  // TODO: Refactor this method to avoid hardcoding the operators and functions
  const getClassName = () => {
    const operators = ["+", "-", "×", "÷", "="];
    const functions = ["C", "+/-", "%"];
    let className = operators.includes(buttonText) ? " operator" : "";
    className = functions.includes(buttonText)
      ? `${className} function`
      : className;
    return "button" + className;
  };

  const id = getId();
  const className = getClassName();
  return (
    <button
      id={id}
      className={className}
      onClick={onButtonClick}
      value={buttonText}
    >
      {buttonText}
    </button>
  );
};

export default Button;
