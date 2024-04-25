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
  board.filter(row => {
   if(!row[column].getToken() === 0) return;
  })
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
 let value = 0;

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
 playerOneName = "Mark",
 playerTwoName = "Henry"
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

  board.drawToken(row,column,getActivePlayer().token);
  switchPlayerTurn()
  printNewBoard()
 }
 printNewBoard()
 return {
  switchPlayerTurn,
  getActivePlayer,
  printNewBoard,
  playRound
 }
}
