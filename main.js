function Gameboard() {
 const rows = 3;
 const columns =  3;
 const board = [];

 for(let i = 0 ; i < rows; i++) {
  board[i] = [];
  for(let j = 0 ; j < columns; j++) {
   board[i].push(Cell());
  } 
 }

 const getBoard = () => board;

 const drawToken = (row, column, player) => {

  board.filter(row => {
   if(row[column].getValue() !== "") return;
  })
  board[row][column].addToken(player);
 }

 const printBoard = () => {
  
   const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
   console.log(boardWithCellValues);
   
 }

 return {
  drawToken,
  printBoard,
  getBoard
 }
}

function Cell() {
 let value = 0;
 
 const addToken = (player) => {
  value = player;
 }
 const getValue = () => value;

 return {
  addToken,
  getValue
 }
}

function Player() {
 let name = "";
 const addPlayerName = (input) => {
  name = input
 };
 const getPlayerName = () => name;

 return {
  getPlayerName,
  addPlayerName
 }
}

function GameController() {
 const board = Gameboard()
 const playerOne = Player();
 const playerTwo = Player()

 const players = [
  {
    name: playerOne,
    token: "X"
  },
  {
    name: playerTwo,
    token: "O"
  }
];
let currentPlayer = players[0];

const switchPlayersTurn = () => {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[1]
}
const getActivePlayer = () => currentPlayer;
 return {
  switchPlayersTurn,
  getActivePlayer,
  getBoard: board.getBoard,
  playerOne,
  playerTwo
 }
}
