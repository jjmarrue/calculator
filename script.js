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
let num1 = null;
let total = 0;
let num2 = null;
let operatorVal = null;
let tempNum = null;

// Operations 

function addTwoNumbers(num1, num2) {
  return +num1 + +num2;
}

function substractTwoNumbers(num1, num2) {
  return +num1 - +num2;
}

function multiplyTwoNumbers(num1, num2) {
  return +num1 * +num2;
}

function divideTwoNumbers(num1, num2) {
  if (num2 == 0) {
    return 'LOL';
  } 
    return +num1 / +num2;
 
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


let previousOperator;
let currentClickedBtn;
const allBtns = document.querySelectorAll('.btn');

window.addEventListener('DOMContentLoaded', trackClickedButtons);

function trackClickedButtons() {
  allBtns.forEach(btn => {
    btn.addEventListener('click', e => {

      previousOperator = operatorVal;
      currentClickedBtn = btn.value;
      
      // NUMBERS

      if (btn.classList.contains('number')) {
        if (tempNum === null) {
          tempNum = currentClickedBtn;
        } else {
          tempNum += currentClickedBtn;
        }
        console.log(`num on screen: ${tempNum}`);     
      }
      
      // OPERATORS

      if (btn.classList.contains('operator')) {
        operatorVal = currentClickedBtn;
        console.log(`current operator: ${operatorVal}`);

        if (num1 === null) {
          num1 = tempNum;
          tempNum = null;
        } else {   
          num2 = tempNum;
          tempNum = null;
        }
       
        if (previousOperator) {
          console.log(`previous operator: ${previousOperator}`); 
        console.log(`num1: ${num1}`);
        console.log(`num2: ${num2}`);
        total = operate(previousOperator, num1, num2);
        console.log(`total: ${total} = ${num1} ${previousOperator} ${num2}`);
        num1 = parseFloat(total);
        }
    
        //total = operate(previousOperator, num1, num2);
        // console.log(`num1: ${num1}`);
        // console.log(`num2: ${num2}`);
        //console.log(`total: ${total} = ${num1} ${previousOperator} ${num2}`);
        //num1 = total;
    }
   
    //
    
  });    
});


  // equals.addEventListener('click', (e) => {
  //   num2 = tempNum;
  //   total = operate(operatorVal, num1, num2);
  //   console.log(`num1: ${num1}`);
  //   console.log(`num2: ${num2}`); 
  //   console.log(`equals: ${total}`); 
    
  //   num1 = total; //first number now holds the current total
  //   //console.log(`num1: ${num1}`);
  // });
}