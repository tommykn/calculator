let firstValue = '';
let secondValue = '';
let operator = '';
let value = '';
let isEqualPressed = false;


const display = document.querySelector('.screen');
const numButtons = document.querySelectorAll('.num');
const operButtons = document.querySelectorAll('.operator');
const secDisplay = document.querySelector('.top-buttons');
const equalButton = document.querySelector('.equal');


numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (isEqualPressed === true) {
            display.textContent = e.target.textContent;
            secDisplay.textContent = '';
            firstValue = '';
            secondValue = '';
            operator = '';
            value = '';
            isEqualPressed = false;
        } else {
            console.log(e.target.textContent);
            display.textContent += e.target.textContent; 
        }

    });
});

operButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (firstValue !== '') {
            if (display.textContent === '') {
                firstValue = '';
                secondValue = '';
                operator = '';
                value = '';
            }
            secondValue = display.textContent;
            secDisplay.textContent = firstValue + ' ' + operator + ' ' + secondValue;
            value = operate(operator, firstValue, secondValue);
            display.textContent = value;
        }
        console.log(e.target.textContent);
        firstValue = display.textContent;
        operator = e.target.textContent;
        display.textContent = '';
        secDisplay.textContent = firstValue + ' ' + operator;
    });
});

equalButton.addEventListener('click', () => {
    secondValue = display.textContent;
    secDisplay.textContent = firstValue + ' ' + operator + ' ' + secondValue;
    value = operate(operator, firstValue, secondValue);
    display.textContent = value;
    firstValue = '';
    isEqualPressed = true;
});



















function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a ,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    } else {
        return null;
    }

}