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
const buttons = document.querySelector(".container");

// Define global variables

let num1 = null;
let num2 = null;
let total = 0;
let tempNum = '';
let operatorVal = null;
let previousOperator;
let currentClickedBtn;
const decimalPlaces = 10;
let percentVal = null;
const maxDigits = 10;
const fractionDigits = 8;

// Use number.EPSILON to provide accurate rounding

Number.prototype.round = function(n) {
  const d = Math.pow(10, n);
  return Math.round((this + Number.EPSILON) * d) / d;
}

const limitDisplay = function(n) {
  if (n !== null) {
    n = n.toString();
    if (n.length > maxDigits) {    
      n = n.substring(0, maxDigits);
    }   
    return n;
  } else {
    return n;
  }  
}

const convertToScientificNotation = function(n) {
  n = n.toString();
  if (n.length > maxDigits) {
    return Number.parseFloat(n).toExponential(fractionDigits);
  }
  else {
    return n;
  }
}

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
  if (operator == '-') {
    return substractTwoNumbers(num1, num2);
  }
  if (operator == '+') {
    return addTwoNumbers(num1, num2);
  }
  if (operator == '*') {
    return multiplyTwoNumbers(num1, num2);
  }
  if (operator == '/') {
    return divideTwoNumbers(num1, num2);
  }
}


const calculatorAction = (e) => {
  console.log(e);
  previousOperator = operatorVal;

  // Handle backspace

  if (e == 'Backspace') {
    const arrayofNums = Array.from(String(tempNum), Number);
    arrayofNums.pop();
    tempNum = arrayofNums.join('');
    if (tempNum.length === 0) {
      tempNum = 0;
    }
    display.textContent = tempNum;
  }

  if (!(isNaN(e))) {     
    if (tempNum == null || tempNum == 0) {
      tempNum = e;
      tempNum = limitDisplay(tempNum);
      display.textContent = tempNum;   
    } else {
      tempNum += e;
      tempNum = limitDisplay(tempNum);
      display.textContent = tempNum;
    }
    console.log(tempNum);
  }

  if (e == '%') {
    percentVal = e; 
  }
  
  if (e == '/' || e == '*' || e == '+' || e == '-') {
    operatorVal = e;
    if (tempNum === null && num1 == null) {
      num1 = 0;
    } else if (tempNum === null && num1 !== null) {
      tempNum = 0;
      display.textContent += tempNum;
    } 
    if (num1 === null) {
      num1 = tempNum;
      tempNum = null;
    } else {  
      if(percentVal !== null) {
        console.log(num1);
        console.log(tempNum);
        num2 = getPercentage(num1, tempNum, percentVal);
      } else {
        num2 = tempNum;
      }
      tempNum = null;
    }
    
    // Chanined operations

    if (previousOperator && num2 !== null) {
      total = operate(previousOperator, num1, num2);
      total = convertToScientificNotation(total);
      display.textContent = total;
      num1 = total;
      num2 = null;
    }
  }

  if (e == '.') {
    if (display.textContent.indexOf('.') === -1) {
      if (tempNum === null) {
        tempNum = e;
        display.textContent = tempNum;   
      } else {
        tempNum += e;
        display.textContent = tempNum;
      }
    } else {
      return false;
    }
  }

  if (e == 'Enter') {
    if (tempNum === null) {
      tempNum = 0;
    }
    if (num1 !== null && previousOperator !== null) {
      if(percentVal !== null) {
        num2 = getPercentage(num1, tempNum, percentVal);
      } else {
        num2 = tempNum;
      }
      total = operate(previousOperator, num1, num2);
      console.log(num2);
      display.textContent = total;
      percentVal = null;
    } else {
      display.textContent = total;
    }
    num1 = total;
    console.log('num1: ' + num1);
    console.log('num2: ' + num2);
    console.log('total: ' + total);
  }

  if (e == 'Escape') {
    num1 = null;
    num2 = null;
    total = 0;
    tempNum = null;
    operatorVal = null;
    previousOperator = null;
    percentVal = null;
    display.textContent = '0';
  }

  if (e == '+/-') {
    if (total !== 0) {
      total = -total;
      display.textContent = total; 
    }
    else {
      tempNum = -tempNum;
      display.textContent = tempNum; 
    }
    operatorVal = null;
  }

}

buttons.addEventListener('click', (e) => {
  const buttonValue = (e.target.value);
  calculatorAction(buttonValue);
})



document.addEventListener('keydown', function(e) {
  let eventKey = (e.key) ? e.key : KeyboardEvent.keyCode;
  if (eventKey >= 0 && eventKey <= 9 || eventKey == 'Enter' || eventKey == '%' || eventKey == 'Escape' || eventKey == '/' || eventKey == '*' || eventKey == '-' || eventKey == '+' || eventKey == '=' || eventKey == '.') {
    calculatorAction(e.key);   
  }
});


