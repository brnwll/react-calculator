import React from 'react'
import './Calculator.css'

const Calculator = () => {
  return (
    <div id="calculator">
      <div id='display'>123689</div>
      <div class="button other">C</div>
      <div class="button other">+/-</div>
      <div class="button other">%</div>
      <div class="button operator">+</div>
      <div class="button">1</div>
      <div class="button">2</div>
      <div class="button">3</div>
      <div class="button operator">-</div>
      <div class="button">4</div>
      <div class="button">5</div>
      <div class="button">6</div>
      <div class="button operator">X</div>
      <div class="button">7</div>
      <div class="button">8</div>
      <div class="button">9</div>
      <div class="button operator">/</div>
      <div id="num0" class="button">0</div>
      <div class="button">.</div>
      <div class="button operator">=</div>
    </div>
  )
}

export default Calculator;