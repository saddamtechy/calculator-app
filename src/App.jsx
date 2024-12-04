// src/App.jsx
import React, { useState } from 'react';
import Display from './assets/components/Display';
import Button from './assets/components/Button';
import './App.css';

const App = () => {
  const [input, setInput] = useState('0');
  const [calculation, setCalculation] = useState('');

  const handleClick = (value) => {
    if (value === "=") {
      try {
        // Evaluate the calculation and round to 2 decimal places
        const result = parseFloat(eval(calculation).toFixed(2)); 
        setInput(result.toString()); // Update the display
        setCalculation(result.toString()); // Allow chaining further calculations
      } catch (error) {
        // Handle invalid calculations
        setInput("Error");
        setCalculation("");
      }
    } else if (value === "clear") {
      // Reset the calculator to the initial state
      setInput("0");
      setCalculation("");
    } else {
      // Prevent multiple leading zeros
      if (value === "0" && (input === "0" || calculation === "")) return;
  
      // Prevent multiple decimals in the same number
      const lastOperand = calculation.split(/[\+\-\*\/]/).pop();
      if (value === "." && lastOperand.includes(".")) return;
  
      // Handle consecutive operators by replacing the last one
      const lastChar = calculation[calculation.length - 1];
      if (
        ["+", "-", "*", "/"].includes(value) &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        setCalculation(calculation.slice(0, -1) + value);
      } else {
        setCalculation(calculation + value); // Add the new value to the calculation string
      }
  
      // Update the display
      setInput(
        ["+", "-", "*", "/"].includes(value) ? value : calculation + value
      );
    }
  };
  

  return (
    <div className="calculator">
      <Display value={input} />
      <div className="buttons">
        <Button id="seven" value="7" onClick={handleClick} />
        <Button id="eight" value="8" onClick={handleClick} />
        <Button id="nine" value="9" onClick={handleClick} />
        <Button id="divide" value="/" onClick={handleClick} />
        <Button id="four" value="4" onClick={handleClick} />
        <Button id="five" value="5" onClick={handleClick} />
        <Button id="six" value="6" onClick={handleClick} />
        <Button id="multiply" value="*" onClick={handleClick} />
        <Button id="one" value="1" onClick={handleClick} />
        <Button id="two" value="2" onClick={handleClick} />
        <Button id="three" value="3" onClick={handleClick} />
        <Button id="subtract" value="-" onClick={handleClick} />
        <Button id="zero" value="0" onClick={handleClick} />
        <Button id="decimal" value="." onClick={handleClick} />
        <Button id="equals" value="=" onClick={handleClick} />
        <Button id="add" value="+" onClick={handleClick} />
        
        <Button id="clear" value="clear" onClick={handleClick} />
      </div>
    </div>
  );
};

export default App;
