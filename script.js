// Grab DOM elements

const display = document.querySelector('#display span');
const buttons = document.querySelector('.container');
const buttonList = document.querySelectorAll('.btn');

// Define variables

let num1 = 0;
let num2 = 0;
let total = 0;
let tempNum = 0;
let operatorVal = null;
let previousOperator;
let percentVal = null;
let equalEnabled = false;
const decimalPlaces = 8;
const maxDigits = 10;
const fractionDigits = 6;

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

function getPercentage(num1, num2, percentVal=null) {
  if (percentVal != null) {
    return  parseFloat(((+num2/100)*(+num1)));
  }
  else {
    return num2;
  }  
}

// Use correct operator on numbers based on operator value

function operate(operator="+", num1=0, num2=0) {
  if (isNaN(num1) || isNaN(num2)) {
    return 'lol nope';
  }
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


const performCalculations = (e) => {
  if (e == 'Backspace') {
    pressButton(backspace);
    const arrayofChars = Array.from(String(tempNum), String);
    console.log(arrayofChars);
    arrayofChars.pop();
    tempNum = arrayofChars.join('');
    if (tempNum.length == 0) {
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
  }

  if (e == '%') {
    percentVal = e; 
  }

  previousOperator = operatorVal;
  
  if (e == '/' || e == '*' || e == '+' || e == '-') {
    operatorVal = e;
    if (equalEnabled) {
      num2 =0;
    }
    if (num1 == 0) {
      num1 = tempNum;
    } else {
      num2 = getPercentage(num1, tempNum, percentVal);
    }
    tempNum = null;
    
    // Chanined operations

    if (previousOperator && !equalEnabled && num2 != null) { //
      total =  convertToScientificNotation(operate(previousOperator, num1, num2));
      display.textContent = total;
      num1 = total;
      percentVal = null;
    }
    // console.log('num1 ' + num1);
    // console.log('num2 '  + num2);
    // console.log('op '  + previousOperator);
    // console.log('temp '  + tempNum);
  }

  if (e == '.') {
    if (display.textContent.indexOf('.') == -1) {
      if (tempNum == null) {
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
    equalEnabled = true;
    num2 = getPercentage(num1, tempNum, percentVal);

    if (previousOperator == null) {
      total = num1;
    } else {
      total =  convertToScientificNotation(operate(previousOperator, num1, num2));
    }

    display.textContent = total;
    console.log('total ' + total);
    num1 = total;
    percentVal = null;

    console.log('num1 ' + num1);
    console.log('num2 '  + num2);
    console.log('op '  + previousOperator);
    console.log('temp '  + tempNum);
  }

  if (e == '+/-') {
    if (total !== 0) {
      num1 = -total;
      display.textContent = num1; 
      console.log('total ' +total);
    }
    else {
      tempNum = -tempNum;
      display.textContent = tempNum; 
      console.log('temp ' +tempNum);
    }
  }

  if (e == 'Escape') {
    num1 = 0;
    num2 = 0;
    total = 0;
    tempNum = 0;
    operatorVal = null;
    previousOperator = null;
    percentVal = null;
    display.textContent = '0';
  }
}

// Handle clicks

buttons.addEventListener('click', (e) => {
  const buttonValue = (e.target.value);
  performCalculations(buttonValue);
})

// Handle keyboard keys

document.addEventListener('keydown', function(e) {
  let eventKey = (e.key) ? e.key : KeyboardEvent.keyCode;
  performCalculations(e.key);
  buttonList.forEach(button => {
    if (button.value == e.key){
      button.classList.add('btn-active');
    }
  })
  
});

document.addEventListener('keyup', function(e) {
  let eventKey = (e.key) ? e.key : KeyboardEvent.keyCode;
  buttonList.forEach(button => {
    if (button.value == e.key){
      button.classList.remove('btn-active');
    }
  })
});

const pressButton = function(button) {
  if (button.classList.contains('btn-active')) {
    button.classList.remove('btn-active');
    return;
  }
}

