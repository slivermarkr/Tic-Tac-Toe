function Gameboard() {
 const rows = 3;
 const columns = 3;
 const board = [];

 for(let i = 0; i  < rows; i++) {
  board[i] = [];
  for(let j = 0; j < columns; j++){
   board[i].push(Cell());
  }
 }

 const getBoard = () => board;

 const printBoard = () => {
  const cellWithValues = board.map((row) => row.map((cell) => cell.getToken()));
  console.log(cellWithValues);
 };

 const drawToken = (row, column, player) => {
  board[row][column].addToken(player);
 }

 const checkForWin = (board, player) => {
  //horizontal wins
  console.log("Checking for win...")
  for(let i = 0; i < rows; i++) {
   if(board[i][0].getToken() === player && board[i][1].getToken() === player && board[i][2].getToken() === player)
   return true;
 }
  return false;
 }
 return{
  getBoard,
  printBoard,
  drawToken,
  checkForWin
}
}

function Cell() {
 let value = 0;

const getToken = () => value;

const addToken = (player) => {
 value = player
}
return {
 getToken,
 addToken
}
}

function GameController() {
 const board = Gameboard()
 const players = [
  {
   name: "black",
   token: "X"
  }
 ]
 let currentPlayer = players[0];

 const getActivePlayer = () => currentPlayer;

 const playRound = (row, col) => {
  board.drawToken(row,col,getActivePlayer().token);
  board.printBoard();
  if(board.checkForWin(board.getBoard(),getActivePlayer().token)){
   console.log(`${getActivePlayer().name} wins!!`);
  }
 }

 return{
  playRound,
  getBoard: board.getBoard,
  checkWin: board.checkForWin,
  getActivePlayer
 }
}