
// Flags to stop two operators being entered
let hasOperator = 0;
let duringOperator = 0;
let numberPresent = 0;
// Note if hasOperator == 1 and duringOperator == 0 means expression correctly entered
let errorDisplayed = 0;
let resultDisplayed = 0;
let operatorIndex = 0;

let displayExpression = document.querySelector("#expression");
let displayResult = document.querySelector("#result");

// Linking buttons to display

// Numbers
const numButtons = document.querySelectorAll(".num");
numButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (resultDisplayed == 1) {
            clearCalculator();
        }
        if (errorDisplayed == 0) {
            displayExpression.textContent += e.target.textContent;
            duringOperator = 0;
            numberPresent = 1;
        }
    });
})

// Operators - allow for operator switching
const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (duringOperator == 1) {
            let display = displayExpression.textContent.toString();
            display = display.slice(0, display.length - 3);
            displayExpression.textContent = display;
            hasOperator = 0;
        }
        if (hasOperator == 0 && numberPresent == 1 && errorDisplayed == 0) {
            displayExpression.textContent += ` ${e.target.textContent} `
            hasOperator = 1;
            duringOperator = 1;
            resultDisplayed = 0;
            operatorIndex = displayExpression.textContent.length;
        } 
    })
})

// Controlling the display

// Entering an expression
const equals = document.querySelector("#enter");
equals.addEventListener("click", computeDisplayedExpression);

function computeDisplayedExpression () {
    if (duringOperator == 0 && hasOperator == 1) {
        let expression = displayExpression.textContent.toString().split(" ");
        let result = operation(Number(expression[0]), expression[1], Number(expression[2]));
        if(typeof result === "number") {
            if (Number.isInteger(result) == false) {
                result = result.toFixed(2);
            }
            displayExpression.textContent = result;
        } else {
            displayResult.textContent = result;
            errorDisplayed = 1;
        }
        hasOperator = 0;
        duringOperator = 0;
        resultDisplayed = 1;
        operatorIndex = 0;
    }
}

// Clearing
const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);

function clearCalculator () {
    hasOperator = 0;
    duringOperator = 0;
    errorDisplayed = 0;
    resultDisplayed = 0;
    numberPresent = 0;
    operatorIndex = 0;

    displayExpression.textContent = "";
    displayResult.textContent = "";
}

// Mathematics Functions

// Execute operation
function operation (num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            if (num2 == 0) {
                return "No.";
            }
            return divide(num1, num2);
        case "%":
            return rem(num1, num2);
    }
}

// Basic Operations
function add (a,b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function rem (a, b) {
    return a % b;
}