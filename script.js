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
let total, num1, num2 = 0;
let operatorVal = '+';

// Operations 

function addTwoNumbers(num1, num2) {
  return num1 + num2;
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

// Call operators

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
    
  });
});

operations.forEach(operator => {
  operator.addEventListener('click', (e) =>{
    operatorVal = operator.value;
    
  });
});


  equals.addEventListener('click', (e) => {
    operate(operator, num1, num2);
  
  });





obtainNumber();
recordOperation();
