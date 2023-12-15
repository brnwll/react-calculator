import React, { useState } from "react";
import "./Button.css";

const Button = ({
  buttonText,
  handleButtonClick,
  activeOperator,
  functionButtonsArray,
  operatorButtonsArray,
}) => {
  const [active, setActive] = useState(false);
  const handleMouseDown = () => setActive(true);
  const handleMouseUp = () => setActive(false);

  // Construct the class name for the button
  const getClassName = () => {
    let className = operatorButtonsArray.includes(buttonText)
      ? " operator"
      : "";
    className = functionButtonsArray.includes(buttonText)
      ? `${className} function`
      : className;
    className = buttonText === "0" ? `${className} btn0` : className;
    className =
      activeOperator === buttonText ? `${className} activeOperator` : className;
    return `button ${className}${active ? " active" : ""}`;
  };

  return (
    <button
      className={getClassName()}
      value={buttonText}
      onClick={handleButtonClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {buttonText}
    </button>
  );
};

export default Button;
