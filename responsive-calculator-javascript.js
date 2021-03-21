var input = document.getElementById("input");
var precalculation = document.getElementById("pre-calculation");
input.addEventListener("input", validateInput);
var equation = [];
const OPERATORS = ["/", "*", "-", "+"];

function validateInput() {
    var currentInput = input.value;
    if (currentInput == ".") {
        input.value = "0.";
    }
    else if (isNaN(currentInput) && currentInput != "-") {
        input.value = currentInput.substring(0, currentInput.length - 1);
    }
}

function clearInput() {
    document.getElementById("input").value = "";
    precalculation.innerHTML = "";
    equation.splice(0, equation.length);
}

function buttonClick(number) {
    input.value = input.value + number;
}

function addToEquation() {
    if (input.value != "" && !isNaN(input.value)) {
        equation.push(input.value);
        input.value = "";
    }
}

function addOperatorToEquation(operatorString) {
    if (equation.length > 0 && !lastItemIsOperator()) {
        equation.push(operatorString);
        precalculation.innerHTML = equation.join(" ");
    }
    else if (lastItemIsOperator()) {
        equation.pop();
        equation.push(operatorString);
        precalculation.innerHTML = equation.join(" ");
    }
}

function divide() {
    addToEquation();
    addOperatorToEquation("/");
}

function multiply() {
    addToEquation();
    addOperatorToEquation("*");
}

function subtract() {
    addToEquation();
    addOperatorToEquation("-");
}

function add() {
    addToEquation();
    addOperatorToEquation("+");
}

function swapSign() {
    if (input.value == "") {
        input.value = "-";
    }
    else if (input.value == "-") {
        input.value = "";
    }
    if (Number(input.value) > 0) {
        input.value = "-" + input.value;
    }
    else if (Number(input.value) < 0) {
        input.value = Number(input.value) * (-1);
    }
}

function addDecimal() {
    if (input.value == "") {
        input.value = "0.";
    }
    else if (!input.value.includes(".")) {
        input.value = input.value + ".";
    }
}

function equals() {
    if (input.value != "" && equation.length > 1) {
        addToEquation();
        if (lastItemIsOperator()) {
            equation.pop();
        }
        var equationToEvaluate = equation.join(" ");
        precalculation.innerHTML = equationToEvaluate + " = ";
        input.value = eval(equationToEvaluate);
        equation.splice(0, equation.length);
        equationToEvaluate = "";
    }
}

function lastItemIsOperator() {
    for (i=0; i<OPERATORS.length; i++) {
        if (equation[equation.length - 1] == OPERATORS[i]) {
            return true;
        }
    }
    return false;
}