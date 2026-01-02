function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}
let isError = false;
let hasOperator = false;
let firstNumber;
let secondNumber;
let operation;

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  }
  if (operator === "-") {
    return subtract(a, b);
  }
  if (operator === "/") {
    return divide(a, b);
  }
  if (operator === "*") {
    return multiply(a, b);
  }
}

const display = document.getElementById("display");
const container = document.getElementById("container");
container.addEventListener("click", clicked);
let btn = document.querySelectorAll(".num");
function clicked(e) {
  if (isError) {
    if (e.target.classList.contains("delete")) {
      isError = false;
    } else {
      return;
    }
  }

  if (e.target.classList.contains("delete")) {
    firstNumber = undefined;
    secondNumber = undefined;
    operation = undefined;
    display.textContent = "0";
    hasOperator = false;
  }
  if (e.target.classList.contains("number")) {
    if (firstNumber === undefined && operation === "-") {
      firstNumber = `${operation}${e.target.textContent}`;
      display.textContent = `${operation}${e.target.textContent}`;
      operation = undefined;
      hasOperator = false;
    } else if (!hasOperator && firstNumber === undefined) {
      display.textContent = e.target.textContent;
      firstNumber = e.target.textContent;
    } else if (firstNumber !== undefined && !hasOperator) {
      display.textContent += e.target.textContent;
      firstNumber += e.target.textContent;
    } else if (hasOperator && secondNumber === undefined) {
      display.textContent = e.target.textContent;
      secondNumber = e.target.textContent;
    } else if (hasOperator && secondNumber !== undefined) {
      display.textContent += e.target.textContent;
      secondNumber += e.target.textContent;
    }
  }
  if (e.target.classList.contains("operat")) {
    if (!hasOperator) {
      operation = e.target.textContent;
      display.textContent = e.target.textContent;
      hasOperator = true;
    } else if (hasOperator && secondNumber !== undefined) {
      if (operation === "/" && Number(secondNumber) === 0) {
        display.textContent = "Error";
        secondNumber = undefined;
        firstNumber = undefined;
        operation = undefined;
        isError = true;
        hasOperator = false;
        return;
      } else {
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        firstNumber = operate(operation, firstNumber, secondNumber);
        display.textContent = `${firstNumber}${e.target.textContent}`;
        secondNumber = undefined;
        hasOperator = true;
        operation = e.target.textContent;
      }
    } else if (hasOperator && secondNumber === undefined) {
      display.textContent = e.target.textContent;
      operation = e.target.textContent;
    }
  }

  if (e.target.classList.contains("equals")) {
    if (Number(secondNumber) === 0 && operation === "/") {
      display.textContent = "Error";
      firstNumber = undefined;
      secondNumber = undefined;
      operation = undefined;
      isError = true;
      hasOperator = false;
      return;
    } else if (
      secondNumber === undefined ||
      operation === undefined ||
      firstNumber === undefined
    ) {
      display.textContent = "Error";

      firstNumber = undefined;
      secondNumber = undefined;
      operation = undefined;
      isError = true;
      hasOperator = false;
      return;
    } else {
      firstNumber = Number(firstNumber);
      secondNumber = Number(secondNumber);
      let result = operate(operation, firstNumber, secondNumber);
      display.textContent = result;
      console.log(result);
      firstNumber = result;
      secondNumber = undefined;
      operation = undefined;
      hasOperator = false;
    }
  }
}

container.addEventListener("mouseover", function (e) {
  if (
    e.target.classList.contains("operat") ||
    e.target.classList.contains("delete") ||
    e.target.classList.contains("equals")
  ) {
    e.target.classList.add("mouseenter");
  }
});
container.addEventListener("mouseout", function (e) {
  e.target.classList.remove("mouseenter");
  e.target.classList.remove("mouseenter1");
});
container.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("number")) {
    e.target.classList.add("mouseenter1");
  }
});
