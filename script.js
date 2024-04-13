function Gameboard() {
 const rows = 3;
 const columns = 3;
 const board = [];

 for(let i = 0; i < rows; i++) {
  board[i] = [];
  for(let j = 0; j < columns; j ++) {
   board[i].push(Cell());
  }
 }

 const getBoard = () => board;

 const drawToken = (row,column,playerToken) => {
  board.filter(row => {
   if(row[column].getToken()=== "") return;
  })
  board[row][column].addToken(playerToken);
 }

 const printBoard = () => {
  const boardWithCellValues = board.map((row) => row.map(cell => cell.getToken()))

  console.log(boardWithCellValues);
 }
 
 return {
  getBoard,
  drawToken,
  printBoard
 }
}

function Cell() {
 let value  = "";

 const addToken = (playerToken) => {
  value = playerToken
 }

 const getToken = () => value;

 return {addToken, getToken};
}

function Player() {
 let name = "";

 const addPlayerName = (input) => {
  name = input;
 }

 const getPlayerName = () => name;
 
 return {
  addPlayerName,
  getPlayerName
 }
}

function GameController() {
const board = Gameboard();

const playerOne = Player();
const playerTwo = Player();

playerOne.addPlayerName("Mark")
playerTwo.addPlayerName("Henry")

const players = [
 {
  name: playerOne.getPlayerName(),
  token: "X"
 },
 {
  name: playerTwo.getPlayerName(),
  token: "O"
 }
]

let currentPlayer = players[0];

const switchCurrentPlayer = () => {
 currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
}
const getActivePlayer = () => currentPlayer;

const printNewRound = () => {
 board.printBoard();
 console.log(`${getActivePlayer().name}'s turn`);
}
return {
 players,
 switchCurrentPlayer,
 getActivePlayer,
 printNewRound
}
}

