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


window.addEventListener('keydown', (e) => {
    let numArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    let operArray = ['+', '-', '/', '*'];

    if (e.key === '.' && getIsPointPressed() === true) {
        return;
    }

    for (let i = 0; i < numArray.length; i++) {
        if (numArray[i] === e.key) {
            if (isEqualPressed === true) {
                display.textContent = e.key;
                secDisplay.textContent = '';
                firstValue = '';
                secondValue = '';
                operator = '';
                value = '';
                isEqualPressed = false;
                isOperatorPressed = false;
            } else if (isOperatorPressed === true) {
                display.textContent = e.key;
                isOperatorPressed = false;
            } else {
                display.textContent += e.key; 
                isOperatorPressed = false;
            }
            return;
        }
    }
    for (let i = 0; i < operArray.length; i++) {
        if (operArray[i] === e.key) {
            if (isOperatorPressed === true) {
                return;
            }
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
            firstValue = display.textContent;
            operator = e.key;
            isOperatorPressed = true;
            secDisplay.textContent = firstValue + ' ' + operator;
            isEqualPressed = false;
            return;
        }
    }
    if (e.key === '=' || e.key === 'Enter') {
        if (isOperatorPressed === true) {
            return;
        }
        if (firstValue === '') {
            return;
        }
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
        return;
    }
    if (e.key === 'Backspace') {
        backspace();
        return;
    }
    if (e.key == 'Escape') {
        clear();
        return;
    }


})


numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.textContent === '.' && getIsPointPressed() === true) {
            return;
        }
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
        if (isOperatorPressed === true) {
            return;
        }
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
    if (isOperatorPressed === true) {
        return;
    }
    if (firstValue === '') {
        return;
    }
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



function getIsPointPressed() {
    let str = display.textContent;
    let array = str.split('');
    let isPointPressed = false;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '.') {
            isPointPressed = true;
            break;
        } else {
            isPointPressed = false;
        }
    }

    return isPointPressed;
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
    let x = a + b;
    return Math.round(1000 * x) / 1000;
}

function subtract(a, b) {
    let x = a - b;
    return Math.round(1000 * x) / 1000;
}

function multiply(a ,b) {
    let x = a * b;
    return Math.round(1000 * x) / 1000;
}

function divide(a, b) {
    return Math.round(1000 * (a / b)) / 1000;
}


function operate(operator, a, b) {
    let x = Number(a);
    let y = Number(b);
    if (operator === '+') {
        return add(x, y);
    } else if (operator === '-') {
        return subtract(x, y);
    } else if (operator === '*') {
        return multiply(x, y);
    // } else if (operator === '/' && b === '0') {
    //     divideZero();
    } else if (operator === '/') {
        return divide(x, y);
    } else {
        return null;
    }

}