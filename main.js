function Gameboard() {
 const rows = 3;
 const columns = 3;
 const board = [];


 for(let i = 0;  i < rows; i++) {
  board[i] = [];
  for(let j = 0; j < columns; j++) {
   board[i].push(Cell());
  }
 };

 co= dropToken = (player) => {
  const availableCell = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
 }

 const printBoard = () => {

 }
}

function Cell() {
 let value = ""

 const addToken = (player) => {
  value = player
 }

 const getValue = () => value;

 return {
  addToken,
  getValue
 }
}