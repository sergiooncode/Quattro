$(document).ready ( function () {
	var ROWNUM = 6;
	var COLNUM = 7;
	var matrix = new Array(ROWNUM);
	var turnPlayer;
	var gameStarted = false;
	var isThereWinner;

	// Buttons to select a column
	var buttonCol1 = $('#buttonCol1'),
	buttonCol2 = $('#buttonCol2'),
	buttonCol3 = $('#buttonCol3'),
	buttonCol4 = $('#buttonCol4'),
	buttonCol5 = $('#buttonCol5'),
	buttonCol6 = $('#buttonCol6'),
	buttonCol7 = $('#buttonCol7');
	// Reset button
	var rstBttn = $('#resetButton');
				
	function initBoard(){
  	// Initialize the board with a two-dimensional array:
  	// with 6 rows and 7 columns, setting all values to 0.
  	for (var i = 0; i < matrix.length; i++)
  		matrix[i] = new Array(COLNUM);
  		
  	for (var row = 0; row < matrix.length; row++) {
  		for (var col = 0; col < matrix[row].length; col++) {matrix[row][col] = 'W';}
  	}
  	gameStarted = true;
  	isThereWinner = false;
	}

  function pressResetNtf() {$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");}

  function gameOverNtf() {$('#ntf').html("Game Over!").css("color", "red");}

  function columnCompleteNtf() {$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");}

  function machineStartsNtf() {$('#ntf').html("The machine starts!").css("color", "red");}

  function humanStartsNtf() {$('#ntf').html("You start!").css("color", "red");}

  function randomFromInterval(from,to){return Math.floor(Math.random()*(to-from+1)+from);}

  function cleanNotifications() {$('#ntf').html("");}

  function endGameMsg(tp) {
    var winner = "";
    if (tp == "R") {
      winner = "You, human,";
    } else {
      winner = "The Machine";
    }
    var answer = confirm(winner + " won. Press any button to play again."); 
    if (answer) {
      cleanNotifications();
      initBoard();
      drawBoard (matrix);
      if (randomFromInterval(1,2) == 1) {
        turnPlayer = "R"; 
        humanStartsNtf();
      } else {
        turnPlayer = "Y"; 
        machineStartsNtf(); 
        var pc = randomFromInterval(0,6);
        var rd = getDropPosition(matrix, pc);
        if (rd == -1) {
          columnCompleteNtf();
        } else {
          matrix[rd][pc] = turnPlayer;
        }
        drawBoard(matrix);
        chngPlayer(turnPlayer);
      }
    } else {
      cleanNotifications();
      initBoard();
      drawBoard (matrix);
      if (randomFromInterval(1,2) == 1) {
        turnPlayer = "R"; 
        humanStartsNtf();
      } else {
        turnPlayer = "Y"; 
        machineStartsNtf(); 
        var pc = randomFromInterval(0,6);
        var rd = getDropPosition(matrix, pc);
        if (rd == -1) {
          columnCompleteNtf();
        } else {
          matrix[rd][pc] = turnPlayer;
        }
        drawBoard(matrix);
        chngPlayer(turnPlayer);
      }
    }    
  }

  function chngPlayer(tp){
    if (tp == 'R') {
      turnPlayer = 'Y';
    } else {
      turnPlayer = 'R';
    }
  }

	function drawBoard (table) {
  	for (var row = 0; row < table.length; row++) {
  		for (var col = 0; col < table[row].length; col++) {
  			if (matrix[row][col] == 'R') {
  				var idtn = "#col-" + col.toString()+"-row-" + row.toString();
  				$(idtn).css( "background-color", "red" );
  			}
  			if (matrix[row][col] == 'Y') {
  				var idtn = "#col-" + col.toString()+"-row-" + row.toString();
  				$(idtn).css( "background-color", "yellow" );
  			}
  			if (matrix[row][col] == 'W') {
  				var idtn = "#col-" + col.toString()+"-row-" + row.toString();
  				$(idtn).css( "background-color", "white" );
  			} 
  		}
  	}
	}
				
	function getDropPosition(matrix, columnPosition){
  	// This method returns the position of row (i.e., cell's row position)
  	// Find the blank cell {i.e., for value 0} from row 5 to 0.
  	// If there is no blank cell in that column return -1.
  	var rindex = ROWNUM-1;
  	while (rindex >= 0) {
  		if (matrix[rindex][columnPosition] == 'W') {
      	return rindex;
  		}
      rindex--;
  	}
  	return -1;
	}
				
	function getRowWin(matrix){
  	// set 4 [i,j] values to a functionault cell position say -1 in a list.
  	// [[-1,-1][-1,-1][-1,-1][-1,-1]]
  	// For each row, check if any 4 consecutive similar values are there,
  	// if so return the positions as a list [[row1, col1],[row2, col2],[row3, col3],[row4, col4]].
  	var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
  	var row = 5;
  	while(row >= 0){
  		var col = 0;
  		while(col <= 3){
      	if(matrix[row][col] != 'W'){
          val = matrix[row][col];
          if(matrix[row][col + 1] == val && matrix[row][col + 2] == val && matrix[row][col + 3] == val){
          	winPositions = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
          	isThereWinner = true;
          	return winPositions;
          }
      	}
      	col = col + 1;
  		}
  		row = row - 1;
  	}
  	return winPositions;
	} 
	
	function getColumnWin(matrix){
  	// Similarly, set 4 [i,j] functionault values in a list, for each column,
  	// check for any 4 consecutive cells with same values and then return
  	// their positions in the list.
  	var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
  	var col = 0;
  	while(col <= 6){
  		var row = 5;
  		while(row >= 3){
      	if(matrix[row][col] != 'W'){
          val = matrix[row][col];
          if(matrix[row - 1][col] == val && matrix[row - 2][col] == val && matrix[row - 3][col] == val){
          	winPositions = [[row, col], [row - 1, col], [row - 2, col], [row - 3, col]];
          	isThereWinner = true;
            return winPositions;
          }
      	}
      	row = row - 1;
  		}
  		col = col + 1;
  	}
  	return winPositions;
	}  

	function getDiagonalLeftToRightWin(matrix){
  	// Similarly, set 4 [i,j] functionault values in a list.
  	// Starting from left corner for each diagonal going right up check for 4 consecutive cells
  	// with same values and return their positions.
  	var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
  	var col = 0;
  	while(col <= 3){
  		var row = 5;
  		while(row >= 3){
      	if(matrix[row][col] != 'W'){
        	val = matrix[row][col];
          if(matrix[row - 1][col + 1] == val && matrix[row - 2][col + 2] == val && matrix[row - 3][col + 3] == val){
          	winPositions = [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]];
          	isThereWinner = true;
            return winPositions;
          }
      	}
      	row = row - 1;
  		}
  		col = col + 1;
  	}
  	return winPositions;
	}  

	function getDiagonalRightToLeftWin(matrix){
  	// Similarly, set 4 [i,j] functionault values in a list.
  	// Starting from right corner for each diagonal going left up check for 4 consecutive cells
  	// with same values and return their positions.
  	var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
  	var col = 6;
  	while(col >= 3){
  		var row = 5;
  		while(row >= 3){
      	if(matrix[row][col] != 'W'){
        	val = matrix[row][col];
          if(matrix[row - 1][col - 1] == val && matrix[row - 2][col - 2] == val && matrix[row - 3][col - 3] == val){
          	winPositions = [[row, col], [row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3]];
          	isThereWinner = true;
            return winPositions;
          }
      	}
      	row = row - 1;
  		}
  		col = col - 1;
  	}
  	return winPositions;
	}

	function isGameOver(matrix){
  	// If the entire matrix is filled and there are no winners then the Game is Over.
  	var noWinPos = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
   	if (getColumnWin(matrix) != noWinPos && isThereWinner) {return true;} 
  		if (getRowWin(matrix) != noWinPos && isThereWinner){return true;} 
  		if (getDiagonalLeftToRightWin(matrix) != noWinPos && isThereWinner) {return true;} 
  		if (getDiagonalRightToLeftWin(matrix) != noWinPos && isThereWinner) {return true;}  
			return false;
	}
				
	// Listens to all the buttons in the pagebody
	rstBttn.click(function () {
		//Clear previous notifications
		cleanNotifications();
		initBoard();
		drawBoard(matrix);
		if (randomFromInterval(1,2) == 1) {
			turnPlayer = 'R'; 
			humanStartsNtf();
		} else {
			turnPlayer = 'Y'; 
			machineStartsNtf();
			var pc = randomFromInterval(0,6);
			var rd = getDropPosition(matrix, pc);
  		if (rd == -1) {
  			columnCompleteNtf();
  		} else {
  			matrix[rd][pc] = turnPlayer;
  		}
  		drawBoard(matrix);
  		chngPlayer(turnPlayer);
		}
  });
				
  buttonCol1.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
  			if (turnPlayer == "R") {
          var rd = getDropPosition(matrix, 0);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  				  matrix[rd][0] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf(); 
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			   var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  			 if (rd == -1) {
  			   columnCompleteNtf();
  			 } else {
  				  matrix[rd][pc] = turnPlayer;
  			 }
  			 drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf(); 
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		  }
  	}
  });
    		
  buttonCol2.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
        if (turnPlayer == "R") {
  			 var rd = getDropPosition(matrix, 1);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  				  matrix[rd][1] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf(); 
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			 var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf(); 
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
  
  buttonCol3.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
        if (turnPlayer == "R") {
  			 var rd = getDropPosition(matrix, 2);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  				  matrix[rd][2] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			 var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
  
  buttonCol4.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
  			if (turnPlayer == "R") {
          var rd = getDropPosition(matrix, 3);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  			 matrix[rd][3] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			 var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
  
  buttonCol5.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
  			if (turnPlayer == "R") {
          var rd = getDropPosition(matrix, 4);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  				  matrix[rd][4] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			 var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
  
  buttonCol6.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  			cleanNotifications();
  			if (turnPlayer == "R") {
          var rd = getDropPosition(matrix, 5);
  			 if (rd == -1) {
  				  columnCompleteNtf();
  			 } else {
  				  matrix[rd][5] = turnPlayer;
  			 }
  			 drawBoard(matrix);
  		    if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
  		    } else {chngPlayer(turnPlayer);}
        }
  		  if (turnPlayer == "Y"){
  			 var pc = randomFromInterval(0,6);
				  var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
  
  buttonCol7.click(function () {
  	if (gameStarted == false) {
  		pressResetNtf();
  	} else {
  		cleanNotifications();
      if (turnPlayer == "R") {
  		  var rd = getDropPosition(matrix, 6);
  		  if (rd == -1) {
  			 columnCompleteNtf();
  		  } else {
  			 matrix[rd][6] = turnPlayer;
  		  }
  		  drawBoard(matrix);
  		  if (isGameOver(matrix)) {
  			 gameOverNtf();
          endGameMsg(turnPlayer);
  		  } else {chngPlayer(turnPlayer);}
      }
  		if (turnPlayer == "Y"){
  			var pc = randomFromInterval(0,6);
				var rd = getDropPosition(matrix, pc);
  				if (rd == -1) {
  					columnCompleteNtf();
  				} else {
  					matrix[rd][pc] = turnPlayer;
  				}
  				drawBoard(matrix);
          if (isGameOver(matrix)) {
            gameOverNtf();
            endGameMsg(turnPlayer);
          } else {chngPlayer(turnPlayer);}
  		}
  	}
  });
});