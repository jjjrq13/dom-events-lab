/*-------------------------------- Constants --------------------------------*/
const displayElement = document.querySelector('.display');

const numberElements = document.querySelectorAll('.number');

const operationElement = document.querySelectorAll('.operator');

const equalsElement = document.querySelector('.equals');

/*-------------------------------- Variables --------------------------------*/

let firstNumber = '';
let secondNumber = '';
let operator = undefined;
let calculation = 0;

/*------------------------ Cached Element References ------------------------*/

displayElement.innerText = '';

/*----------------------------- Event Listeners -----------------------------*/
numberElements.forEach((num) => {
    num.addEventListener('click', numInput);
});

operationElement.forEach((op) => {
    op.addEventListener('click', operatorInput);
});

equalsElement.addEventListener('click', calculate);

/*-------------------------------- Functions --------------------------------*/

//assigns numbers to cache
function numInput(event) {
    if (secondNumber === '' && !operator) {
        firstNumber = firstNumber + `${event.target.innerText}`;
        displayElement.innerText = `${firstNumber}`;
        noZeroFirst();
    } else {
        secondNumber = secondNumber + `${event.target.innerText}`;
        displayElement.innerText = `${firstNumber} ${operator} ${secondNumber}`;
        noZeroFirst();
    }
}

/*
if clear entry is pressed it resets all cache variables. Else, it stores a single operation value
*/
function operatorInput(event) {
    if (!event.target.innerText.includes('C')) {
        if (firstNumber === '') {
            displayElement.innerText = 'ERROR';
            return;
        } else {
            operator = event.target.innerText;
            displayElement.innerText = `${firstNumber} ${operator}`;
            secondNumber = '';
        }
    } else {
        clearEntry();
    }
}

//performs operation
function calculate(event) {
    switch (operator) {
        case '+':
            calculation = Number(firstNumber) + Number(secondNumber);
            dealWithFloats();
            displayElement.innerText = `${calculation}`;
            keepGoing();
            break;
        case '-':
            calculation = Number(firstNumber) - Number(secondNumber);
            dealWithFloats();
            displayElement.innerText = `${calculation}`;
            keepGoing();
            break;
        case '*':
            calculation = Number(firstNumber) * Number(secondNumber);
            dealWithFloats();
            displayElement.innerText = `${calculation}`;
            keepGoing();
            break;
        case '/':
            calculation = Number(firstNumber) / Number(secondNumber);
            dealWithFloats();
            displayElement.innerText = `${calculation}`;
            keepGoing();
            break;
    }
}

//assigns calculation number to first value to continue operarions if doing continues calculations
function keepGoing() {
    firstNumber = calculation;
    secondNumber = '';
    operator = undefined;
}

//resets all cache values
function clearEntry() {
    firstNumber = '';
    secondNumber = '';
    operator = undefined;
    displayElement.innerText = '';
}

//deal with numbers that connatain a lot of decimals like Pi (22/7)
//googled average number of decimals in a calculator: 10
function dealWithFloats() {
    calculation = `${calculation}`;
    if (Number(calculation) % 1 !== 0) {
        let period = calculation.indexOf('.');
        calculation = calculation.slice(0, period + 11);
    } else if (Number(calculation) % 1 === 0 && calculation.includes('.')) {
        let removePeriod;
        calculation = `${calculation}`;
        removePeriod = calculate.indexOf('.');
        calculate = calculate.slice(0, removePeriod);
    }
}

//Checks and removes as zeros first number
function noZeroFirst() {
    if (firstNumber.charAt(0) === '0') {
        firstNumber = firstNumber.slice(1);
    } else if (secondNumber.charAt(0) === '0') {
        secondNumber = secondNumber.slice(1);
    }
}
