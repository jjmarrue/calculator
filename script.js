// Grab DOM elements

const clear = document.getElementById('clear');
const percent = document.getElementById('percentage');
const plusminus = document.getElementById('plusminus');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const display = document.querySelector('#display span');
const calculation = document.getElementById('calculation');
const result = document.getElementById('result');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const allBtns = document.querySelectorAll('.btn');

// Define global variables

let num1 = null;
let num2 = null;
let total = 0;
let tempNum = null;
let operatorVal = null;
let previousOperator;
let currentClickedBtn;
const decimalPlaces = 8;
// Functions for each operation 

function addTwoNumbers(num1, num2) {
  return (+num1 + +num2).toFixed(decimalPlaces);
}

function substractTwoNumbers(num1, num2) {
  return (+num1 - +num2).toFixed(decimalPlaces);
}

function multiplyTwoNumbers(num1, num2) {
  return (+num1 * +num2).toFixed(decimalPlaces);
}

function divideTwoNumbers(num1, num2) {
  if (num2 == 0) {
    return 'LOL';
  } 
    return (+num1 / +num2).toFixed(decimalPlaces);
 
}

// Use correct operator on numbers based on operator value

function operate(operator, num1, num2) {
  if (operator === '-') {
    return substractTwoNumbers(num1, num2);
  }
  if (operator === '+') {
    return addTwoNumbers(num1, num2);
  }
  if (operator === 'x') {
    return multiplyTwoNumbers(num1, num2);
  }
  if (operator === '/') {
    return divideTwoNumbers(num1, num2);
  }
}

// Run the function as soon as the HTML document finishes loading

window.addEventListener('DOMContentLoaded', trackClickedButtons);

function trackClickedButtons() {
  allBtns.forEach(btn => {
    btn.addEventListener('click', e => {

      // Keep track of the last operator so it can be used later

      previousOperator = operatorVal;

      // Keep track of the key that was just pressed

      currentClickedBtn = btn.value;
      
      // NUMBERS

      if (btn.classList.contains('number')) {
        if (tempNum === null) {
          tempNum = currentClickedBtn;
          result.textContent = tempNum;
        } else {
          tempNum += currentClickedBtn;
          result.textContent = tempNum;
        }
        console.log(`num on screen: ${tempNum}`);     
      }
      
      // OPERATORS

      if (btn.classList.contains('operator') || btn.classList.contains('equals')) {
        operatorVal = currentClickedBtn;
        calculation.textContent += tempNum;
        calculation.textContent += operatorVal;
        console.log(`current operator: ${operatorVal}`);

        if (num1 === null) {
          num1 = tempNum;
          tempNum = null;
        } else {   
          num2 = tempNum;
          tempNum = null;
        }
       
        // To allow chain operations, perform each operation using the value of the previous operator

        if (previousOperator) {
          console.log(`previous operator: ${previousOperator}`); 
          console.log(`num1: ${num1}`);
          console.log(`num2: ${num2}`);
          total = operate(previousOperator, num1, num2);    
          console.log(`total: ${total}`);

          num1 = total;
        }
    }
  });    
});
}

// Pressing equals handles variables a little differently

equals.addEventListener('click', (e) => {
  if (num1 !== null) {
    num2 = tempNum;
    total = operate(previousOperator, num1, num2);
    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`);
    console.log(`equals: ${total}`);
    result.textContent = total;
    calculation.textContent = num1 + previousOperator + num2;
    num1 = total; //first number now holds the current total
    num2 = null;
    operatorVal = null;
  }
});

// Clear everything

clear.addEventListener('click', (e) => {
  num1 = null;
  num2 = null;
  total = 0;
  tempNum = null;
  operatorVal = null;
  previousOperator = null;
  result.textContent = '0';
  calculation.textContent = '';
});