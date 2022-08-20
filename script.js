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
let percentVal = null;

// Use number.EPSILON to provide accurate rounding

Number.prototype.round = function(n) {
  const d = Math.pow(10, n);
  return Math.round((this + Number.EPSILON) * d) / d;
}

// Functions for each operation. parseFloat removes trailing zeros.

function addTwoNumbers(num1, num2) {
  return parseFloat((+num1 + +num2).round(decimalPlaces));
}

function substractTwoNumbers(num1, num2) {
  return parseFloat((+num1 - +num2).toFixed(decimalPlaces));
}

function multiplyTwoNumbers(num1, num2) {
  return parseFloat((+num1 * +num2).toFixed(decimalPlaces));
}

function divideTwoNumbers(num1, num2) {
  if (num2 == 0) {
    return 'LOL';
  } 
    return parseFloat((+num1 / +num2).toFixed(decimalPlaces));
 
}

function getPercentage(num1, percentVal) {
  return parseFloat(((+percentVal/100)*num1).toFixed(decimalPlaces));
}

// Use correct operator on numbers based on operator value

function operate(operator, num1, num2, percentVal=null) {
  console.log(percentVal);
  if (percentVal != null) {
    num2 = parseFloat(((+num2/100)*(+num1)).toFixed(decimalPlaces));
    console.log('Percentage: ' + num2);
  }
  
  if (operator === '-') {
    return substractTwoNumbers(num1, num2);
  }
  if (operator === '+') {
    return addTwoNumbers(num1, num2);
  }
  if (operator === 'x') {
    return multiplyTwoNumbers(num1, num2);
  }
  if (operator === '÷') {
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
      
      // PERCENTAGE

      if (btn.id == 'percentage') {
        percentVal = btn.value;
        console.log(percentVal);
      }

      // NUMBERS

      if (btn.classList.contains('number')) {
        if (tempNum === null) {
          tempNum = currentClickedBtn;
          result.textContent = tempNum;   
        } else {
          tempNum += currentClickedBtn;
          result.textContent = tempNum;
        }
      }
      

      // OPERATORS

      if (btn.classList.contains('operator') || btn.classList.contains('equals')) {
        operatorVal = currentClickedBtn;
        if (tempNum === null) {
          tempNum = 0;
          calculation.textContent += tempNum;
          calculation.textContent += operatorVal;
        }
 
        if (num1 === null) {
          num1 = tempNum;
          tempNum = null;
        } else {   
          num2 = tempNum;
          tempNum = null;
        }

       
        // To allow chain operations, perform each operation using the value of the previous operator and put total value in num1

        if (previousOperator ) {
           // console.log(`num1: ${num1}`);
          // console.log(`num2: ${num2}`);
          // console.log(`equals: ${total}`);
          total = operate(previousOperator, num1, num2, percentVal);
          num1 = total;
        } else {

        }
    }
  });    
});
}

// Pressing equals handles variables a little differently

equals.addEventListener('click', (e) => {
  if (tempNum === null) {
    tempNum = 0;
  }

  if (num1 !== null) {
    num2 = tempNum;
    total = operate(previousOperator, num1, num2, percentVal);
    // console.log(`num1: ${num1}`);
    // console.log(`num2: ${num2}`);
    // console.log(`equals: ${total}`);
    result.textContent = total;
    calculation.textContent = num1 + previousOperator + num2;
    num1 = total;
    num2 = null;
    //operatorVal = null;
  } else {
    result.textContent = tempNum;
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