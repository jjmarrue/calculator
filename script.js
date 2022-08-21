// Grab DOM elements

const clear = document.getElementById('clear');
const percent = document.getElementById('percentage');
const plusminus = document.getElementById('plusminus');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const display = document.querySelector('#display span');
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
const myRegex = new RegExp(/^\d*\.?\d*$/);

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

function getPercentage(num1, num2, percentVal) {
  return  parseFloat(((+num2/100)*(+num1)).toFixed(decimalPlaces));
}

 



// Use correct operator on numbers based on operator value


function operate(operator, num1, num2) {
  // if (percentVal != null) {
  //   num2 = parseFloat(((+num2/100)*(+num1)).toFixed(decimalPlaces));
  //   console.log('Percentage: ' + num2);
  // }
  
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
      }

      // NUMBERS

      if (btn.classList.contains('number')) {
        if (tempNum === null) {
          tempNum = currentClickedBtn;
          display.textContent = tempNum;   
        } else {
          tempNum += currentClickedBtn;
          display.textContent = tempNum;
        }
      }
      

      // OPERATORS

      if (btn.classList.contains('operator') || btn.classList.contains('equals')) {
        console.log('operator was pressed');
        operatorVal = currentClickedBtn;
       
        // if the first number has not been entered and user presses an operator, it should go 0 [operator] [num2]

        if (num1 == null) {
          //display.textContent = 0;
        } else if (tempNum === null && num1 !== null) {
          tempNum = 0;
          display.textContent += tempNum;         
          //display.textContent += operatorVal;
        } 
 
        if (num1 === null) {
          num1 = tempNum;
          tempNum = null;
        } else {  
          if(percentVal !== null) {
            num2 = getPercentage(num1, tempNum, percentVal);
            console.log('Percentage: ' + num2);
          } else {
            num2 = tempNum;
          }
          console.log('num2: ' + num2);
          tempNum = null;
        }
       
        // To allow chain operations, perform each operation using the value of the previous operator and put total value in num1

        if (previousOperator ) {
          total = operate(previousOperator, num1, num2);
          display.textContent = total;
          num1 = total;
          num2 = null;
        }
        console.log('num1: ' + num1);
        //console.log('num2: ' + num2);
        console.log('total: ' + total); 
    } 
  });   
});
}

// Pressing equals handles variables a little differently

equals.addEventListener('click', (e) => {
  console.log('equals was pressed');
  if (tempNum === null) {
    tempNum = 0;
  }
  if (num1 !== null && previousOperator !== null) {

    if(percentVal !== null) {
      num2 = getPercentage(num1, tempNum, percentVal);
    } else {
      //num2 = tempNum;
    }
    total = operate(previousOperator, num1, num2);
    console.log(num2);
    display.textContent = total;
    percentVal = null;
  } else {
    display.textContent = tempNum;
  }
  num1 = total;
  console.log('num1: ' + num1);
  console.log('num2: ' + num2);
  console.log('total: ' + total);
});

// Clear everything

clear.addEventListener('click', (e) => {
  num1 = null;
  num2 = null;
  total = 0;
  tempNum = null;
  operatorVal = null;
  previousOperator = null;
  percentVal = null;
  display.textContent = '0';
});