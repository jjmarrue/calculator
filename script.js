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
let num2 = 0;
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
  if (num2 === 0) {
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


let lastClickedBtn;
let currentClickedBtn;
const allBtns = document.querySelectorAll('.btn');

window.addEventListener('DOMContentLoaded', trackClickedButtons);

function trackClickedButtons() {
  allBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      lastClickedBtn = currentClickedBtn;
      currentClickedBtn = btn.value;
      //console.log(`last button: ${lastClickedBtn}`);
      //console.log(`current button: ${currentClickedBtn}`);
       
      if (btn.classList.contains('number')) {
        if (tempNum === null) {
          tempNum = currentClickedBtn;
        } else {
          tempNum += currentClickedBtn;
          
        }
        console.log(`num on screen: ${tempNum}`);     
      }
      
      if (btn.classList.contains('operator')) {
        if (tempNum != null) {
          num1 = tempNum;
        } else {
          num2 = tempNum;
          num1 = total;
          
        }

      
      operatorVal = currentClickedBtn; 

      //console.log(`operator on screen: ${operatorVal}`);
      
      total = operate(operatorVal, num1, num2);
      console.log(`num1: ${num1}`);
      console.log(`num2: ${num2}`); 
      console.log(`total: ${total}`); 
      tempNum = null;
      }
    
    
    });
    
  });


  equals.addEventListener('click', (e) => {
    num2 = tempNum;
    total = operate(operatorVal, num1, num2);
    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`); 
    console.log(`equals: ${total}`); 
    
    num1 = total; //first number now holds the current total
    tempNum = null;
  });
}





function obtainNumber() {
  numbers.forEach(num => {
    num.addEventListener('click', (e) => {
      return num.value;
    });
  });
}


// numbers.forEach(num => {
//   num.addEventListener('click', (e) => {
//     lastPressedVal = num.value;
//     if (operatorVal == null) {
//       if (num1 === 0) {
//         num1 = lastPressedVal;
//       } else {
//         num1 += lastPressedVal;
//       }
//       total = num1;
      
//     } else {
//       if (num2 === 0 || num2 == null) {
//         num2 = lastPressedVal;
//       } else {
//         num2 += lastPressedVal;
//       }           
//     }
//     console.log(`num1: ${num1}`);
//     console.log(`num2: ${num2}`);
//   });
// });





// operations.forEach(operator => {
//   operator.addEventListener('click', (e) =>{
//     operatorVal = operator.value;
//     console.log(operatorVal);
     
//     //console.log(`total upon operation: ${total}`); 
//     num1 = total; //first number now holds the current total
//     num2 = null;  //reset second number so user can set a new value
//   });
// });








