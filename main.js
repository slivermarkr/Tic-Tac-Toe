//Gameboard has 3x3 dimension cell
// creatte 2d array board object
//createt function that draw out the players symbol
//create function that printsBoard;

// Cell is an object that has value , read value and add value function needed


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
 const drawToken = (column, player,row) => {

  board.filter(row => {
   if(row[column].getValue() !== "") return;
  })
  board[row][column].addToken(player);
 }

 const printBoard = () => {


  return {
   drawToken,
   printBoard,
   getBoard
  }
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

function Players() {

}