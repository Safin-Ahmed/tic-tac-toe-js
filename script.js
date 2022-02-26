const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const TRIANGLE_CLASS = 'triangle';
const winningCombinations = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
    
]
let turn = 'x';
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMsg');
const winningMessageTextElement = document.querySelector('[data-winning-msg-text]')
const board = document.getElementById('board');
const restartButton = document.getElementById('restartBtn');

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.classList.remove(TRIANGLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })

    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e){
    // Placemark
    const cell = e.target;
    const currentClass = turn === 'x' ? X_CLASS : turn === 'circle' ? CIRCLE_CLASS : turn === 'triangle' ? TRIANGLE_CLASS : '';
    placeMark(cell, currentClass);
    // Check for win 
    if(checkWin(currentClass)){
       endGame(false)
    }else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
 // Switch Turns
   
  
}


function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'DRAW!'
    }
    else {
        winningMessageTextElement.innerText = `${turn} Wins!`;
    }

    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(TRIANGLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    turn = turn === 'x' ? 'circle' : turn === 'circle' ? 'triangle' : turn === 'triangle' ? 'x' : '';
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(TRIANGLE_CLASS);

    if(turn === X_CLASS){
        board.classList.add(X_CLASS);
    }
    
    if(turn === CIRCLE_CLASS){
        board.classList.add(CIRCLE_CLASS);
    }

    if(turn === TRIANGLE_CLASS){
        board.classList.add(TRIANGLE_CLASS);
    }
}

function checkWin(currentClass){
    return winningCombinations.some(comb => {
        return comb.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}