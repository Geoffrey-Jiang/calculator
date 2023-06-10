// FLAGS

// Flags to stop two operators being entered and others
let hasOperator = 0;
let duringOperator = 0;
// Note if hasOperator == 1 and duringOperator == 0 means expression correctly entered

let numberPresent = 0;
let includesDot = 0;
// Flags for what is being displayed currently
let errorDisplayed = 0;
let resultDisplayed = 0;
// Hold index to and positive/negative symbol
let operatorIndex = 0;
let isPositive = 1;

// Getting DOM elements for Expression and Result
let displayExpression = document.querySelector("#expression");
let displayResult = document.querySelector("#result");

// Allowing for keyboard functionality
document.addEventListener("keypress", (e) => {
    let buttons = Array.from(document.querySelectorAll('button'));
    let letter = e.key;
    console.log(e.key);
    if (e.key == "Escape" || e.key == "Delete") {
        // This one doesn't quite work...
        e.preventDefault();
        letter = "A/C";
    } else if (e.key == "Enter") {
        e.preventDefault();
        letter = "=";
    } else if (e.key == "*") {
        letter = "x";
    }
    buttons.forEach((button) => {
        if (button.textContent === letter) button.click();
    });
})

// Linking buttons to display
// Numbers
const numButtons = document.querySelectorAll(".num");
numButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.textContent === '.') {
            if (errorDisplayed === 0 && includesDot === 0) {
                if (resultDisplayed === 1) {
                    clearCalculator();
                }
                displayExpression.textContent += e.target.textContent;
                duringOperator = 0;
                numberPresent = 1;
                includesDot = 1;
            }
        } else {
            if (resultDisplayed === 1) {
                clearCalculator();
            }
            if (errorDisplayed === 0) {
                displayExpression.textContent += e.target.textContent;
                duringOperator = 0;
                numberPresent = 1;
            }
        }
        
    });
})

// Operators - allow for operator switching
const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (duringOperator == 1 && errorDisplayed == 0) {
            // For changing the operator and not adding an operator
            let display = displayExpression.textContent.toString();
            display = display.slice(0, display.length - 3);
            displayExpression.textContent = display;
            hasOperator = 0;
        }
        if (hasOperator == 0 && numberPresent == 1 && errorDisplayed == 0) {
            // For adding an operator

            displayExpression.textContent += ` ${e.target.textContent} `

            // Change flags
            hasOperator = 1;
            duringOperator = 1;

            // Reset flag
            resultDisplayed = 0;
            
            // Reset positive checker as we are now considering the second number
            // i.e. hasOperator = 1
            isPositive = 1;
            operatorIndex = displayExpression.textContent.length;
            includesDot = 0;
        } else if (hasOperator == 1 && duringOperator == 0 && errorDisplayed == 0) {
            // If an expression has been written out, we must compute it then add operator
            computeDisplayedExpression();
            if (errorDisplayed == 0) {
                displayExpression.textContent += ` ${e.target.textContent} `

                // Change flags
                hasOperator = 1;
                duringOperator = 1;
    
                // Reset flag
                resultDisplayed = 0;
                
                // Reset positive checker as we are now considering the second number
                // i.e. hasOperator = 1
                isPositive = 1;
                operatorIndex = displayExpression.textContent.length;
            }
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
            if (result < 0) {
                isPositive = 0;
            } else {
                isPositive = 1;
            }
            displayExpression.textContent = result;
        } else {
            displayResult.textContent = result;
            // Set flag for error - i.e. dividing by 0
            errorDisplayed = 1;
        }
        // Reset flags as expression is shown
        hasOperator = 0;
        duringOperator = 0;
        operatorIndex = 0;

        // Set flag for result displayed
        resultDisplayed = 1;
        includesDot = 0;
    }
}

// Clearing
const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);

function clearCalculator () {
    // Reset all flags
    hasOperator = 0;
    duringOperator = 0;
    errorDisplayed = 0;
    resultDisplayed = 0;
    numberPresent = 0;
    isPositive = 1;
    operatorIndex = 0;
    includesDot = 0;

    // Reset displays
    displayExpression.textContent = "";
    displayResult.textContent = "";
}

// Positive/negative
const posneg = document.querySelector('#posneg');
posneg.addEventListener("click", applyPositiveNegative);

function applyPositiveNegative () {
    if (isPositive == 1) {
        if (hasOperator == 1) {
            displayExpression.textContent = displayExpression.textContent.slice(0, operatorIndex) 
                                            + '-' 
                                            + displayExpression.textContent.slice(operatorIndex);
        } else if (hasOperator == 0) {
            displayExpression.textContent = '-' + displayExpression.textContent;
        }
        isPositive = 0;
    } else {
        if (hasOperator == 1) {
            displayExpression.textContent = displayExpression.textContent.slice(0, operatorIndex)  
                                            + displayExpression.textContent.slice(operatorIndex + 1);
        } else if (hasOperator == 0) {
            displayExpression.textContent = displayExpression.textContent.slice(1);
        }
        isPositive = 1;
    }
    
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