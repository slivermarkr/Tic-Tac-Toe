//Gameboard has 3x3 dimension cell
// creatte 2d array board object
//createt function that draw out the players symbol
//create function that printsBoard;

// Cell is an object that has value , read value and add value function needed


function Gameboard() {
 const rows = 3;
 const columns =  3;
 const board = [];
}

function Cell() {
 let value = 0;

 
 const addToken = (player) => {
  value = player;
 }
 const getValue = () => value;

 return {
  addSymbol,
  getValue
 }
}