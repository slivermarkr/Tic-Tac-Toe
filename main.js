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
  console.log("Checking for win...")
  //horizontal wins
  for(let i = 0; i < rows; i++) {
   if(board[i][0].getToken() === player && board[i][1].getToken() === player && board[i][2].getToken() === player)
 
   return true;
 }
 //vertical wins
 for(let i = 0; i < rows; i++) {
  if(board[0][i].getToken() === player && board[1][i].getToken() === player && board[2][i].getToken() === player)
  return true;
 }
 //diagonal wins
 if(board[0][2].getToken() === player && board[1][1].getToken() === player && board[2][0].getToken() === player || board[0][0].getToken() === player && board[1][1].getToken() === player && board[2][2].getToken() === player){
  return true;
 } 
  return false;
 }

 const checkForDraw = (board) => {
  console.log("Checking for draw...");
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if(board[i][j].getToken() === "")
      return false;
    }
  }
  return true;
 }
 return{
  getBoard,
  printBoard,
  drawToken,
  checkForWin,
  checkForDraw
}
}

function Cell() {
 let value = "";

const getToken = () => value;

const addToken = (player) => {
 value = player
}
return {
 getToken,
 addToken
}
}

function GameController(
  playerOneName,
  playerTwoName
) {
 const board = Gameboard()
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
 let currentPlayer = players[0];

 const getActivePlayer = () => currentPlayer;

 const switchPlayerTurn = () => {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
 }
 
 const printNewBoard = () => {
  console.log(`${getActivePlayer().name}'s turn...`);
  board.printBoard()
 }

 const playRound = (row, col) => {
  if(board.getBoard()[row][col].getToken() !== "") return;
  if(board.getBoard()[row][col].getToken() === "" && board.checkForWin(board.getBoard(),getActivePlayer().token)) return;

  board.drawToken(row,col,getActivePlayer().token);

  if(board.checkForWin(board.getBoard(),getActivePlayer().token)){
   printNewBoard(); 
   console.log(`${getActivePlayer().name} wins!!`);
   return;
  }
  if(board.checkForDraw(board.getBoard())){
   printNewBoard();
   console.log("It's a draw!!");
   return;
  }
  switchPlayerTurn()
  printNewBoard()
}
const reset = () => {
  board.getBoard().forEach(row => row.forEach(cell => cell.addToken("")));
  currentPlayer = players[0];
}
 printNewBoard();

 return{
  playRound,
  getBoard: board.getBoard,
  checkWin: board.checkForWin,
  getActivePlayer,
  checkDraw: board.checkForDraw,
  reset
 }
}

function ScreenController(first,second) {
  const game = GameController(first,second);
  const boardDiv = document.querySelector('.board');
  const playerTurnDiv = document.querySelector('.turn');
  const resetButton = document.querySelector('.reset');
  
  const updateScreen = () => {
    const activePlayer = game.getActivePlayer()
    const board = game.getBoard();
    boardDiv.textContent = '';
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    board.forEach((row, indexRow) => {
      row.forEach((cell,indexCol) => {
        const cellButton = document.createElement('button') ;
        cellButton.classList.add("cell");
        cellButton.dataset.row = indexRow;
        cellButton.dataset.col = indexCol;
        cellButton.textContent = cell.getToken();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  const clickHandlerBoard = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.col;

    game.playRound(selectedRow,selectedCol);
    updateScreen();

    const activePlayer = game.getActivePlayer();
    if(game.checkWin(game.getBoard(),activePlayer.token)){
      playerTurnDiv.textContent = `${activePlayer.name} wins!!!`
      return;
    }
    if(game.checkDraw(game.getBoard())){
      playerTurnDiv.textContent = "It's a draw!!";
      return;
    }
  }

  boardDiv.addEventListener('click',clickHandlerBoard);
  
  resetButton.addEventListener('click', () => {
    game.reset();
    updateScreen();
  });

  updateScreen()
  return {
    game: GameController()
  }
}

function StartGame() {
  const modal = document.querySelector('.modal');
  const startButton = document.querySelector('.start');
  const span = document.querySelector('.close');
  const players = [];
  startButton.addEventListener('click', () => modal.style.display = "block")

  span.addEventListener('click', () => modal.style.display = "none")

  window.addEventListener('click', (e) => {
    if(e.target == modal) {
      modal.style.display = "none";
    }
  })

  function startGame() {
    var playerOneName = document.getElementById("playerOne").value;
    var playerTwoName = document.getElementById("playerTwo").value;
    modal.style.display = "none";
    ScreenController(playerOneName,playerTwoName);
  }
  const okay = document.querySelector('#okay');
  okay.addEventListener('click',startGame);
}
StartGame();