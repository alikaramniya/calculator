let buttons = document.getElementById("buttons");
let display = document.getElementById("display");

let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let minus = document.getElementById("minus");
let plus = document.getElementById("plus");

let root = document.getElementById("root");
let square = document.getElementById("square");

let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let equal = document.getElementById("equal");

let operator,
  signValue,
  valIsZero = true,
  checkEqual = false,
  number = 0;

function setNumber(input) {
  if (input) {
    if (input == "." && !display.textContent.includes(".")) {
      display.textContent += ".";
    }

    if (display.textContent.includes(".") && input === "0") {
      display.textContent += input;
    } else if (input != ".") {
      display.textContent += input;
      display.textContent = Number(display.textContent);
    }

    if (valIsZero && signValue === "-") {
      display.textContent = "-" + input;
    }

    valIsZero = false;

    if (checkEqual) {
      let lastChar = Array.from(display.textContent).pop();

      if (lastChar == ".") {
        display.textContent = "0.";
      } else {
        display.textContent = lastChar;
      }

      checkEqual = false;
    }
  }
}

function backspaceChar() {
  let arr = Array.from(display.textContent);

  arr.pop();

  if (arr.length > 0) {
    display.textContent = arr.join("");
  } else {
    display.textContent = 0;
  }
}

buttons.addEventListener("click", function (e) {
  let input = e.target.dataset.input;

  setNumber(input);
});

divide.addEventListener("click", calculate);
minus.addEventListener("click", calculate);
plus.addEventListener("click", calculate);
multiply.addEventListener("click", calculate);

function calculate(e) {
  let operatorValue = e.target.textContent;

  if (valIsZero) {
    signValue = operatorValue;

    return;
  }

  number = Number(display.textContent);
  display.textContent = 0;

  switch (operatorValue) {
    case "+":
      operator = "+";
      break;
    case "-":
      operator = "-";
      break;
    case "×":
      operator = "*";
      break;
    case "/":
      operator = "/";
      break;
  }
}

square.addEventListener("click", function () {
  display.textContent **= 2;
});

root.addEventListener("click", function () {
  display.textContent = Math.sqrt(Number(display.textContent));
});

function calculateResult() {
  switch (operator) {
    case "+":
      display.textContent = Number(number) + Number(display.textContent);
      break;
    case "-":
      display.textContent = Number(number) - Number(display.textContent);
      break;
    case "*":
      display.textContent = Number(number) * Number(display.textContent);
      break;
    case "/":
      display.textContent = Number(number) / Number(display.textContent);
      break;
  }

  [checkEqual, valIsZero, number] = [true, true, 0];
}

equal.addEventListener("click", function () {
  if (number) {
    calculateResult();
  }
});

backspace.addEventListener("click", function () {
  backspaceChar();
});

clear.addEventListener("click", () => {
  display.textContent = 0;

  number = 0;
});

// calculate with keyword

function setOperator(e) {
  if (e.shiftKey && e.code == "Equal") {
    operator = "+";
    number = display.textContent;
    display.textContent = 0;
  }

  if (e.shiftKey && e.code == "Digit8") {
    operator = "*";
    number = display.textContent;
    display.textContent = 0;
  }

  switch (e.code) {
    case "Minus":
      operator = "-";
      number = display.textContent;
      display.textContent = 0;
      break;
    case "NumpadMultiply":
      operator = "*";
      number = display.textContent;
      display.textContent = 0;
      break;
    case "Slash":
      operator = "/";
      number = display.textContent;
      display.textContent = 0;
      break;
    case "NumpadDivide":
      operator = "/";
      number = display.textContent;
      display.textContent = 0;
      break;
  }
}

let listNumbers = [...Array(10).keys()];

document.addEventListener("keydown", function (e) {
  if (listNumbers.includes(Number(e.key)) || e.key == ".") setNumber(e.key);

  // backspace
  if (e.code === "Backspace") backspaceChar();

  // Set operator
  setOperator(e);

  // cancel calculate
  if (e.code == "Escape") {
    display.textContent = 0;
    number = 0;
    operator = null;
  }

  // Equal
  if (e.code === "Equal" || e.code === "Enter") {
    calculateResult();
  }
});
