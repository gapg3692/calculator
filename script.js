const upperLine = document.querySelector(".upperLine");
upperLine.textContent = "0";
const resultLine = document.querySelector(".resultLine");
resultLine.textContent = "";
let operatorVar = "";
let cleanUpperLine = 0;

let result = 0;
let previousNumber = 0; //this is the number that holds the upper line previous value

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
    else return "UNDEFINED";
}

function mod(numberA, numberB) {
    if (numberB !== 0) return numberA % numberB;
    else return "UNDEFINED";
}

function operator(numberA, numberB, operator) {
    if (operator === "+") return sum(numberA, numberB).toFixed(2);
    else if (operator === "-") return subtract(numberA, numberB).toFixed(2);
    else if (operator === "*") return multiply(numberA, numberB).toFixed(2);
    else if (operator === "/") return divide(numberA, numberB).toFixed(2);
    else if (operator === "%") return mod(numberA, numberB).toFixed(2);
}

function writeText(line, text) {
    if (line.textContent.length > 9) return;
    line.textContent += text;
}

function operatorResolve(element) {
    if (element.textContent === "AC") {
        upperLine.textContent = "0";
        resultLine.textContent = "";
        operatorVar = "";
        cleanUpperLine = 0;
        result = 0;
        previousNumber = 0;
    } else if (element.textContent === "=") {
        if (resultLine.textContent !== "")
            upperLine.textContent = resultLine.textContent;
        operatorVar = "";
    } else if (!(
            element.textContent.search(/[\-\+\*\/\%]/) !== -1 &&
            element.textContent.length === 1
        )) {
        if (
            (upperLine.textContent === "0" && element.textContent !== ".") ||
            cleanUpperLine === 1
        ) {
            cleanUpperLine = 0;
            upperLine.textContent = "";
            if (element.textContent === "+/-") upperLine.textContent = "-";
        }
        if (element.textContent !== "+/-")
            writeText(upperLine, element.textContent);
        else if (upperLine.textContent !== "-") {
            if (upperLine.textContent[0] === "-")
                upperLine.textContent = upperLine.textContent.slice(1);
            else upperLine.textContent = "-" + upperLine.textContent;
        }
        if (upperLine.textContent !== "-") operations();
    } else {
        element.classList.add("gray");
        element.classList.remove("orange");
        if (operatorVar.length === 0)
            resultLine.textContent = upperLine.textContent;
        else {
            document
                .querySelector(`button[data-key="${operatorVar}"]`)
                .classList.add("orange");
            document
                .querySelector(`button[data-key="${operatorVar}"]`)
                .classList.remove("gray");
        }
        operatorVar = element.textContent;
        previousNumber = Number(resultLine.textContent);
        cleanUpperLine = 1;
    }
}

function operations() {
    if (operatorVar.length > 0) {
        if (
            upperLine.textContent === "" &&
            (operatorVar === "*" || operatorVar === "/" || operatorVar === "%")
        ) {
            resultLine.textContent = operator(
                previousNumber,
                1,
                operatorVar
            ).toString();
        } else {
            resultLine.textContent = operator(
                previousNumber,
                Number(upperLine.textContent),
                operatorVar
            ).toString();
        }
        let temp = resultLine.textContent.split(".");
        if (temp[1] === "00") resultLine.textContent = temp[0];
        document
            .querySelector(`button[data-key="${operatorVar}"]`)
            .classList.add("orange");
        document
            .querySelector(`button[data-key="${operatorVar}"]`)
            .classList.remove("gray");
    }
}

function keyPress(event) {
    const key = document.querySelector(`button[data-key="${event.key}"]`);
    console.log(event.key);
    event.preventDefault();
    if (event.type === "keydown" && key) operatorResolve(key);
    else if (event.type === "click") operatorResolve(event.target);
    if (event.key === "Backspace") {
        upperLine.textContent = upperLine.textContent.substring(
            0,
            upperLine.textContent.length - 1
        );
        if (upperLine.textContent !== "-") operations();
    }
    return;
}

// window.addEventListener("keydown", keyPress);

const button = Array.from(document.querySelectorAll("button"));
document.addEventListener("keydown", keyPress);

button.forEach((element) => element.addEventListener("click", keyPress));