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
  checkEqual = false, // TODO: انجام عملیات checkEqual
  number = 0;

function setNumber(input) {
  if (input) {
    if (input == "." && !display.textContent.includes(".")) {
      display.textContent += ".";
    }

    if (input != ".") {
      display.textContent += input;
      display.textContent = Number(display.textContent);
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
  number = Number(display.textContent);
  display.textContent = 0;

  switch (e.target.textContent) {
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
  console.log(operator);
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
}

equal.addEventListener("click", function () {
  calculateResult();
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
  if (e.code === 'Equal' || e.code === 'Enter') {
    calculateResult()
  }
});