
function updateDisplay(string) {
    for (item of document.getElementsByClassName('pixel')) {
        item.style.backgroundColor = 'rgb(7, 3, 245)'
    }
    let digit = 0;
    for (let char of string.split('').reverse()) {
        displayChar( digit, char);
        digit++;
    }
}

function displayChar( digit, char ) {
    for (item of pixelValues) {
        if (item.id === char) {
            pixelArray = item.pixels;
        }
    }
    for (item of pixelArray) {
        document.getElementById(`digit${digit}_column${item[0]}_pixel${item[1]}`).style.backgroundColor = 'rgb(183, 190, 231)'
    }
}

const pixelValues = [
    { id: '0', pixels: 
        [ [1,0],[2,0],[3,0],[0,1],[4,1],[0,2],[3,2],[4,2],[0,3],[2,3],[4,3],[0,4],[1,4],[4,4],[0,5],[4,5],[1,6],[2,6],[3,6], ]},
    { id: '1', pixels: [[0,6],[1,1],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,6],[4,6] ]},
    { id: '2', pixels: [ [1,0],[2,0],[3,0],[0,1],[0,6],[1,5],[1,6],[2,4],[2,6],[3,3],[3,6],[4,1],[4,2],[4,6] ]},
    { id: '3', pixels: [[0,0],[0,5],[1,0],[1,6],[2,0],[2,2],[2,6],[3,0],[3,1],[3,3],[3,6],[4,0],[4,4],[4,5] ]},
    { id: '4', pixels: [ [0,3],[0,4],[1,2],[1,4],[2,1],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,4] ]},
    { id: '5', pixels: [ [0,0],[0,1],[0,2],[0,5],[1,0],[1,2],[1,6],[2,0],[2,2],[2,6],[3,0],[3,2],[3,6],[4,0],[4,3],[4,4],[4,5], ]},
    { id: '6', pixels: [[0,2],[0,3],[0,4],[0,5],[1,1],[1,3],[1,6],[2,0],[2,3],[2,6],[3,0],[3,3],[3,6],[4,4],[4,5] ]},
    { id: '7', pixels: [ [0,0],[1,0],[1,4],[1,5],[1,6],[2,0],[2,3],[3,0],[3,2],[4,0],[4,1] ]},
    { id: '8', pixels: [ [0,1],[0,2],[0,4],[0,5],[1,0],[1,3],[1,6],[2,0],[2,3],[2,6],[3,0],[3,3],[3,6],[4,1],[4,2],[4,4],[4,5] ]},
    { id: '9', pixels: [ [0,1],[0,2],[1,0],[1,3],[1,6],[2,0],[2,3],[2,6],[3,0],[3,3],[3,5],[4,1],[4,2],[4,3],[4,4] ]},
    { id: '(', pixels: [ [1,2],[1,3],[1,4],[2,1],[2,5],[3,0],[3,6] ]},
    { id: ')', pixels: [ [1,0],[1,6],[2,1],[2,5],[3,2],[3,3],[3,4] ]},
    { id: '/', pixels: [ [0,5],[1,4],[2,3],[3,2],[4,1] ]},
    { id: '-', pixels: [ [1,3],[2,3],[3,3] ]},
    { id: '*', pixels: [ [0,2],[0,4],[1,3],[2,1],[2,2],[2,3],[2,4],[2,5],[3,3],[4,2],[4,4] ]},
    { id: '+', pixels: [ [0,3],[1,3],[2,1],[2,2],[2,3],[2,4],[2,5],[3,3],[4,3] ]},
    { id: '.', pixels: [ [2,6] ]},
    { id: 'A', pixels: [ [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[1,3],[2,0],[2,3],[3,0],[3,3],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ]},
    { id: 'N', pixels: [ [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,2],[2,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ]},
    { id: 'S', pixels: [ [0,1],[0,2],[0,6],[1,0],[1,3],[1,6],[2,0],[2,3],[2,6],[3,0],[3,3],[3,6],[4,0],[4,4],[4,5] ]},
]

const buttons = {
    numberButtons: [
       { id: 'zero', value: 0 },
       { id: 'one', value: 1 },
       { id: 'two', value: 2 },
       { id: 'three', value: 3 },
       { id: 'four', value: 4 },
       { id: 'five', value: 5 },
       { id: 'six', value: 6 },
       { id: 'seven', value: 7 },
       { id: 'eight', value: 8 },
       { id: 'nine', value: 9 },
    ],
     operatorButtons: [
        { id: 'divide', value: '/'},
        { id: 'multiply', value: '*' },
        { id: 'subtract', value: '-' },
        {  id: 'plus', value: '+'}
    ],     
    specialButtons: [
        { id: 'clear', value: ''},
        { id: 'equals', value: '='},
        { id: 'ans', value: 'ANS'},
    ],
    parenButtons: [
        { id: 'leftParen', value: '(' },
        { id: 'rightParen', value: ')'}
    ],
    decimalButton: [
        {id: 'decimal', value: '.'}
    ]
}

let currentValue = '';
let display = '';
let currentOperation = '';
let lastButton = '';
let lastAnswer = '0';
let isFloat = false;
let leftParens = 0;
let rightParens = 0;
let displayValue = document.getElementById('lcdDisplay');
let pixelArray = [];

buttons.numberButtons.map(button => {
    document.getElementById(button.id).addEventListener('click', 
    () => {display += button.value;
    updateDisplay(display.substring(0,16));
    currentValue += button.value;
    lastButton = 'number';
    })
})


buttons.operatorButtons.map(button => {
    document.getElementById(button.id).addEventListener('click', 
    () => { if (lastButton != 'operator') {
        display += button.value;
        updateDisplay(display.substring(0,16));
        currentValue += button.value;
        lastButton = 'operator';
        isFloat = false;
        }
    });
})

document.getElementById(buttons.decimalButton[0].id).addEventListener('click',
    () => {
        if ( !isFloat) {
            display += '.';
            currentValue += '.';
            updateDisplay(display.substring(0,16));
            isFloat = true;
        }
    })

buttons.parenButtons.map(button => {
    document.getElementById(button.id).addEventListener('click',
    () => { if (button.id === 'rightParen' && leftParens > rightParens && lastButton != ('leftParen' || 'ans')) {
                display += ')';
                updateDisplay(display.substring(0,16));
                currentValue += ')';
                lastButton = 'rightParen';
                rightParens++;
        }
        if (button.id === 'leftParen' && lastButton != ('rightParen' || 'ans')) {
            display += '(';
            updateDisplay(display.substring(0,16));
            currentValue += '(';
            lastButton = 'leftParen';
            leftParens++;
        }
    })
})


buttons.specialButtons.map(button => {
    document.getElementById(button.id).addEventListener('click', 
    () => { if (button.id === 'ans' && lastButton === 'operator') {
            display += 'ANS';
            updateDisplay(display.substring(0,16));
            currentValue += lastAnswer;
            lastButton = 'ans';
            isFloat = false;
        }
        if (button.id === 'clear') {
            display = '';
            updateDisplay(display.substring(0,16));
            currentValue = '';
            lastButton = '';
            isFloat = false;
        }
        if (button.id === 'equals' && rightParens === leftParens) {
            lastAnswer = eval(currentValue);
            if (lastAnswer === 'infinity'){
                display = 'NAN'
            } else {
            display = `${lastAnswer}`;
            }
            updateDisplay(display.substring(0,16));
            lastButton = 'equals';
            isFloat = false;
        }
    })
 }, )

