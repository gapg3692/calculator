function sum(numberA, numberB) {
    return numberA + numberB;
}

function subtract(numberA, numberB) {
    return numberA - numberB;
}

function multiply(numberA, numberB) {
    return numberA * numberB;
}

function divide(numberA, numberB) {
    if (numberB !== 0) return numberA / numberB;
    else return undefined;
}

function mod(numberA, numberB) {
    if (numberB !== 0) return numberA % numberB;
    else return undefined;
}

function operator(numberA, numberB, operator) {
    if (operator === "+") return sum(numberA, numberB);
    else if (operator === "-") return subtract(numberA, numberB);
    else if (operator === "*") return multiply(numberA, numberB);
    else if (operator === "/") return divide(numberA, numberB);
    else if (operator === "%") return mod(numberA, numberB);
}