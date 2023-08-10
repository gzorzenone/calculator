function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if(num2 === 0) {
    alert("ERROR: Division by zero");
    resetDisplay();
    return "0";
  }
  else {
    return Math.round(num1 / num2 * 1000) / 1000;
  }
}

function operate(num1, num2, operator) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    default:
      return divide(num1, num2);
  }
}

function updateDisplay(btnTextContent) {
  const display = document.querySelector(".display");

  if(displayNum2 !== "") {
    resetDisplay();
  }
  else if((operations || displayValue === "0") && /[0-9]/.test(btnTextContent)) {
    displayValue = "";
  }
  else if(displayValue.at(-1) === "0" && /[+\-*\/]/.test(displayValue.at(-2))) {
    displayValue = displayValue.slice(0, -1);
  }
  else if(/[+\-*\/]/.test(displayValue.at(-1)) && /[+\-*\/]/.test(btnTextContent)) {
    displayValue = displayValue.slice(0, -1);
  }

  displayValue += btnTextContent;
  if(operations) {
    operations = false;
  }

  display.textContent = displayValue;
}

function resetDisplay() {
  displayNum1 = "";
  displayNum2 = "";
  displayOperator = "";
  displayValue = "";
}

let displayNum1 = "";
let displayNum2 = "";
let displayOperator = "";
let displayValue = "";
let operations = false;

updateDisplay("0");

const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    updateDisplay(number.textContent);
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if(displayOperator !== "") {
      if(displayValue.length !== displayNum1.length + displayOperator.length) {
        displayNum2 = displayValue.slice(displayNum1.length + displayOperator.length);
        updateDisplay(operate(Number(displayNum1), Number(displayNum2), displayOperator));
        operations = true;
      }
      else {
        displayNum1 = displayValue.slice(0, -1);
      }
    }
    else {
      displayNum1 = displayValue;
    }
    
    updateDisplay(operator.textContent);

    if(displayNum1 === "") {
      displayNum1 = displayValue.slice(0, -1);
    }

    displayOperator = displayValue.slice(displayNum1.length);
  });
});

const equals = document.querySelector("#equals");

equals.addEventListener("click", () => {
  if(displayValue.length === 1) {
    alert("ERROR: No operator found");
    resetDisplay();
    updateDisplay("0");
  }
  else if(!(displayOperator !== "" && (displayValue.length !== displayNum1.length + displayOperator.length))) {
    alert("ERROR: No second number found");
    resetDisplay();
    updateDisplay("0");
  }
  else {
    displayNum2 = displayValue.slice(displayNum1.length + displayOperator.length);
    updateDisplay(operate(Number(displayNum1), Number(displayNum2), displayOperator));
    operations = true;
  }
});

const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
  resetDisplay();
  updateDisplay("0");
});