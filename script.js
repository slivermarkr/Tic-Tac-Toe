function Gameboard() {
 const rows = 3;
 const columns = 3;
 const board = [];

 for(let i = 0; i < rows; i++) {
  board[i] = [];
  for(let j = 0; j < columns; j++) {
   board[i].push(Cell());
  }
 }

 const getBoard = ()  => board;

 
 const drawToken = (row, column, player) => {
  board[row][column].addToken(player);

 }

 const printBoard = () => {
  const cellWithValues = board.map((row) => row.map(cell => cell.getToken()));
  console.log(cellWithValues);
 }

 return {
  getBoard,printBoard,drawToken
 }
}

function Cell() {
 let value = "";

 const addToken = (playerToken) =>  {
  value = playerToken
 } 

 const getToken = () => value;

 return {
  addToken,getToken
 }
}

function GameController(
 playerOneName,
 playerTwoName
) {

 const board = Gameboard();

 const players = [
  {
   name: playerOneName,
   token: "X"
  },
  {
   name: playerTwoName,
   token: "O"
  }
 ]
 
 let activePlayer = players[0];

 const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
 }

 const getActivePlayer = () => activePlayer 

 const printNewBoard = () => {
  console.log(`${getActivePlayer().name}'s turn...`)
  board.printBoard();
 }

 const playRound = (row, column) => {
  console.log(`Drawing ${getActivePlayer().name}'s token to ${row} and ${column}`);

  if (board.getBoard()[row][column].getToken() !== "") return;

  
  board.drawToken(row, column, getActivePlayer().token);
  switchPlayerTurn();
  printNewBoard();
  if(CheckWin(board.getBoard(),getActivePlayer().token)){
    alert(`${getActivePlayer().name} wins!`);
    return;
  }
  if(CheckDraw(board.getBoard())){
    alert("It's a draw!");
    return;
  }
};
 printNewBoard()
 return {
  getActivePlayer,
  playRound,
  getBoard: board.getBoard
 }
}


function ScreenController() {
 const playerOne = prompt("Enter Player One:")
 const playerTwo = prompt("Enter Player Two:")
 const game = GameController(`${playerOne}`,`${playerTwo}`)
 const playerTurnDiv = document.querySelector('.turn');
 const boardDiv = document.querySelector('.board');
 const greetings = document.querySelector('.greetings');

 const resetButton = document.querySelector('.reset');
 greetings.style.display = "none";

 const updateScreen =  () => {
 boardDiv.textContent = ''
 const board = game.getBoard();
 const activePlayer = game.getActivePlayer();

 playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

 board.forEach((row,indexRow) => {
  row.forEach((cell, indexCol) => {
   const cellButton = document.createElement('button');
   cellButton.classList.add('cell');

   cellButton.dataset.row = indexRow;
   cellButton.dataset.column = indexCol;
   cellButton.textContent = cell.getToken();
   boardDiv.appendChild(cellButton);
  })
 })
 }

 function clickHandlerBoard (e) {
  if(!e.target.classList.contains('cell')) return;
  const selectedRow = e.target.dataset.row;
  const selectedCol = e.target.dataset.column;
  const board = game.getBoard();
  game.playRound(selectedRow,selectedCol);
  updateScreen()
 }  
 boardDiv.addEventListener("click",clickHandlerBoard);
 updateScreen()

 const reset = () => {
  const board = game.getBoard()
  board.forEach((row) => {
   row.forEach((cell) => {
    cell.addToken("")
   })
  })
  updateScreen()
 }

 resetButton.addEventListener('click',reset)
}
function StartGame() {
 const startButton = document.querySelector('.start');
 startButton.addEventListener('click' , ScreenController);
}

function CheckWin(board, player) {
    console.log("Checking win condition for player:", player);
    console.log(board);
 for (let i = 0; i < 3; i ++) {
     if(board[i][0].getToken() === player && board[i][1].getToken() === player &&  board[i][2].getToken() === player) {
     return true
  }
 }

 for (let i = 0; i < 3; i ++) {
  if(board[0][i].getToken() === player && board[1][i].getToken() === player &&  board[2][i].getToken() === player) {
   return true
  }
 }

 if ((board[0][0].getToken() === player && board[1][1].getToken() === player && board[2][2].getToken() === player) ||
 (board[0][2].getToken() === player && board[1][1].getToken() === player && board[2][0].getToken() === player)) {
 return true;
}
 return false;
}
function CheckDraw(board) {
    console.log("Checking draw condition...");
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j].getToken()==="")
            return false
        }
    }
    return true;
}
StartGame();

