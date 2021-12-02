const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const mnozenje = document.getElementById("mnozi");
const deljenje = document.getElementById("deli");
const dodaj = document.getElementById("saberi");
const oduzimanje = document.getElementById("oduzmi");
const decimala = document.getElementById("zarez");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
let num1 = parseFloat(currentOperandTextElement.innerHTML);
let num2 = parseFloat(previousOperandTextElement.innerHTML);
let brojevi = [
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
];

function taster(t) {
  if (brojevi.includes(t.code)) {
    if (currentOperandTextElement.innerHTML === "0") {
      currentOperandTextElement.innerHTML = t.code.substr(6);
    } else {
      currentOperandTextElement.innerHTML += t.code.substr(6);
    }
  }

  if (t.code === "Backspace") {
    if (currentOperandTextElement.innerHTML.length > 1) {
      currentOperandTextElement.innerHTML =
        currentOperandTextElement.innerHTML.slice(0, -1);
    } else {
      currentOperandTextElement.innerHTML = "0";
    }
  }

  if (t.code === "NumpadMultiply") {
    mnozenje.click();
  } else if (t.code === "NumpadDivide") {
    deljenje.click();
  } else if (t.code === "NumpadSubtract") {
    oduzimanje.click();
  } else if (t.code === "NumpadAdd") {
    dodaj.click();
  } else if (t.code === "NumpadDecimal") {
    decimala.click();
  } else if (t.code === "NumpadEnter") {
    equalsButton.click();
  }
}
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      button.innerHTML === "." &&
      currentOperandTextElement.innerHTML.includes(".")
    ) {
      currentOperandTextElement.innerHTML = currentOperandTextElement.innerHTML;
    } else {
      if (
        button.innerHTML === "." &&
        currentOperandTextElement.innerHTML.slice(-1) === "."
      ) {
        currentOperandTextElement.innerHTML =
          currentOperandTextElement.innerHTML;
      }
      if (
        currentOperandTextElement.innerHTML === "0" &&
        button.innerHTML !== "."
      ) {
        currentOperandTextElement.innerHTML = button.innerHTML;
      } else {
        currentOperandTextElement.innerHTML += button.innerHTML;
      }
    }
  });
});

equalsButton.addEventListener("click", () => {
  num1 = parseFloat(currentOperandTextElement.innerHTML);
  num2 = parseFloat(previousOperandTextElement.innerHTML);
  if (previousOperandTextElement.innerHTML.slice(-1) === "+") {
    num2 += num1;
  } else if (previousOperandTextElement.innerHTML.slice(-1) === "-") {
    num2 -= num1;
  } else if (previousOperandTextElement.innerHTML.slice(-1) === "*") {
    num2 *= num1;
  } else if (previousOperandTextElement.innerHTML.slice(-1) === "/") {
    num2 /= num1;
  } else {
    num2 = num1;
  }
  currentOperandTextElement.innerHTML = "0";
  previousOperandTextElement.innerHTML = num2;
  num1 = 0;
  num2 = 0;
});

allClearButton.addEventListener("click", () => {
  previousOperandTextElement.innerHTML = "0";
  currentOperandTextElement.innerHTML = "0";
});

deleteButton.addEventListener("click", () => {
  currentOperandTextElement.innerHTML =
    currentOperandTextElement.innerHTML.slice(0, -1);
  if (currentOperandTextElement.innerHTML.length === 0) {
    currentOperandTextElement.innerHTML = "0";
  }
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    num1 = parseFloat(currentOperandTextElement.innerHTML);
    num2 = parseFloat(previousOperandTextElement.innerHTML);
    if (previousOperandTextElement.innerHTML.slice(-1) === "+") {
      num2 += num1;
    } else if (previousOperandTextElement.innerHTML.slice(-1) === "-") {
      num2 -= num1;
    } else if (previousOperandTextElement.innerHTML.slice(-1) === "*") {
      num2 *= num1;
    } else if (previousOperandTextElement.innerHTML.slice(-1) === "/") {
      num2 /= num1;
    } else {
      num2 = num1;
    }
    previousOperandTextElement.innerHTML = num2 + button.innerHTML;
    currentOperandTextElement.innerHTML = "0";
  });
});
document.onkeyup = taster;
