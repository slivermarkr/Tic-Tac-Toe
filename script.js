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

function Player() {

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
  console.log(`Drawing ${getActivePlayer().name}'s token to ${row} and ${column}`)
  
  if(board.getBoard()[row][column].getToken() !== "") return;
  board.drawToken(row,column,getActivePlayer().token);
  switchPlayerTurn()
  printNewBoard()
 }
 printNewBoard()
 return {
  getActivePlayer,
  playRound,
  getBoard: board.getBoard
 }
}


function ScreenController() {
 const playerOne = prompt("Enter Player One:")
 const playerTwo = prompt("enter Player Two:")
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

StartGame();