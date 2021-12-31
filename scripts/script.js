let firstValue = '';
let secondValue = '';
let operator = '';
let value = '';
let isEqualPressed = false;
let isOperatorPressed = false;
let dividedByZero = false;


const display = document.querySelector('.screen');
const numButtons = document.querySelectorAll('.num');
const operButtons = document.querySelectorAll('.operator');
const secDisplay = document.querySelector('.top-buttons');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');


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
            isOperatorPressed = false;
        } else if (isOperatorPressed === true) {
            display.textContent = e.target.textContent;
            isOperatorPressed = false;
        } else {
            console.log(e.target.textContent);
            display.textContent += e.target.textContent; 
            isOperatorPressed = false;
        }

    });
});

operButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (firstValue !== '' && operator === '/' && display.textContent === '0') {
            divideZero();
            return;
        }
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
        // display.textContent = '';
        isOperatorPressed = true;
        secDisplay.textContent = firstValue + ' ' + operator;
        isEqualPressed = false;
    });
});

equalButton.addEventListener('click', () => {
    secondValue = display.textContent;
    if (secondValue === '0' && operator === '/') {
        divideZero();
        return;
    }
    secDisplay.textContent = firstValue + ' ' + operator + ' ' + secondValue;
    value = operate(operator, firstValue, secondValue);
    display.textContent = value;
    firstValue = '';
    isEqualPressed = true;
    isOperatorPressed = false;
});

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', backspace);


function backspace() {
    if (firstValue === '' && secondValue === '' && operator === '') {
        let str = display.textContent;
        let lastIndex = str.length - 1;
        let ada = str.charAt(lastIndex);
        let part = str.replace(ada, '');
        display.textContent = part;
        return;
    } else if (firstValue !== '' && operator !== '' && isOperatorPressed === true) {
        display.textContent = firstValue;
        firstValue = '';
        secondValue = '';
        operator = '';
        value = '';
        isEqualPressed = false;
        isOperatorPressed = false;
        secDisplay.textContent = '';
        return;
    } else if (firstValue !== '' && operator !== '' && isOperatorPressed === false) {
        let str1 = display.textContent;
        let lastIndex1 = str1.length - 1;
        let ada1 = str1.charAt(lastIndex1);
        let part1 = str1.replace(ada1, '');
        display.textContent = part1;
        if (part1 === '') {
            isOperatorPressed = true;
        }
        return;
    }

}





function clear() {
    firstValue = '';
    secondValue = '';
    operator = '';
    value = '';
    isEqualPressed = false;
    isOperatorPressed = false;
    secDisplay.textContent = '';
    display.textContent = '';
}




function divideZero() {
    alert('You cannot divide by zero');
    clear();
}






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
    return Math.round(1000 * (a / b)) / 1000;
}


function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    // } else if (operator === '/' && b === '0') {
    //     divideZero();
    } else if (operator === '/') {
        return divide(a, b);
    } else {
        return null;
    }

}