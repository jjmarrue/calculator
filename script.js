// Grab DOM elements

const clear = document.getElementById('clear');
const percent = document.getElementById('percentage');
const plusminus = document.getElementById('plusminus');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('result');
const display = document.querySelector('#display span');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');

// Define global variables

display.textContent = "0";
let total = 0;
let num1 = 0;
let num2 = 0;
let operatorVal = null;

// Operations 

function addTwoNumbers(num1, num2) {
  return +num1 + +num2;
}

function substractTwoNumbers(num1, num2) {
  return num1 - num2;
}

function multiplyTwoNumbers(num1, num2) {
  return num1 * num2;
}

function divideTwoNumbers(num1, num2) {
  if (num2 === 0) {
    return 'LOL';
  }
  return num1 / num2;
}

// Use correct operator on numbers

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

//console.log(operate(recordOperation(), -3.6, 5));


// function displayValue(num) {
//   if (display.textContent === '0'|| recordOperation() === true) {
//     display.textContent = num.value;
//   } else {
//     display.textContent += num.value;
//   }
// }


numbers.forEach(num => {
  num.addEventListener('click', (e) => {
    let lastPressedVal = num.value;
    if (operatorVal == null) {
      if (num1 === 0) {
        num1 = lastPressedVal;
      } else {
        num1 += lastPressedVal;
      }
      
    } else {
      if (num2 === 0 || num2 == null) {
        num2 = lastPressedVal;
      } else {
        num2 += lastPressedVal;
      }           
    }
    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`);
  });
});

operations.forEach(operator => {
  operator.addEventListener('click', (e) =>{
    operatorVal = operator.value; 
    total = operate(operatorVal, num1, num2);
    num1 = total; //first number now holds the current total
    num2 = null;  //reset second number so user can set a new value
    console.log(`num1 on operation: ${num1}`);
    console.log(`num2 on operation: ${num2}`);
    console.log(`total: ${total}`); 
  });
});


  equals.addEventListener('click', (e) => {
    // total = num1;
    // total = operate(operator, num1, num2);
  
  });


