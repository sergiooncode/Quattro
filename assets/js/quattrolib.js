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
				
				function randomFromInterval(from,to){
    			return Math.floor(Math.random()*(to-from+1)+from);
				}
				
				function chngPlayer(tp){if (tp == 'R') {turnPlayer = 'Y';} else {turnPlayer = 'R';}}
				
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
//    			var filled = 1;
//    			for (var c = 0; c <= 6; c++) {
//        		for (var r = 5; r >= 0; r--) {
//            	if (matrix[r][c] == 'W') {
//              	filled = 0;
//            	}
//        		}
//    			}
          	if (getColumnWin(matrix) != noWinPos && isThereWinner) {return true;} 
    				if (getRowWin(matrix) != noWinPos && isThereWinner){return true;} 
    				if (getDiagonalLeftToRightWin(matrix) != noWinPos && isThereWinner) {return true;} 
    				if (getDiagonalRightToLeftWin(matrix) != noWinPos && isThereWinner) {return true;}  
						return false;
//    			if (filled == 1) {
//        		if (getRowWin(matrix) == noWinPos || getColumnWin(matrix) == noWinPos || getDiagonalLeftToRightWin(matrix) == noWinPos || getDiagonalRightToLeftWin(matrix) == noWinPos) {
//            	return true;
//        		}	
//        		return false;
//    			} 
				}
				
				// Listens to all the buttons in the pagebody
				rstBttn.click(function () {
					//Clear previous notifications
					$('#ntf').html("");
					initBoard();
					drawBoard(matrix);
					if (randomFromInterval(1,2) == 1) {
						turnPlayer = 'R'; 
						$('#ntf').html("You start!").css("color", "red"); 
					} else {
						turnPlayer = 'Y'; 
						$('#ntf').html("The machine starts!").css("color", "red"); 
						var pc = randomFromInterval(0,6);
						var rd = getDropPosition(matrix, pc);
    				if (rd == -1) {
    					$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    				} else {
    					matrix[rd][pc] = turnPlayer;
    				}
    				drawBoard(matrix);
    				chngPlayer(turnPlayer);
					}
    		});
				
    		buttonCol1.click(function () {
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
    					var rd = getDropPosition(matrix, 0);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    						matrix[rd][0] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
    		});
    		
        buttonCol2.click(function () {
        	if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
        			var rd = getDropPosition(matrix, 1);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    						matrix[rd][1] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        
        buttonCol3.click(function () {
    			//col3Row6.css( "background-color", "red" );	
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
    					var rd = getDropPosition(matrix, 2);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    						matrix[rd][2] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        
        buttonCol4.click(function () {
    			//col4Row6.css( "background-color", "yellow" );	
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
    					var rd = getDropPosition(matrix, 3);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    					matrix[rd][3] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        
        buttonCol5.click(function () {
    			//col5Row6.css( "background-color", "red" );	
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
    					var rd = getDropPosition(matrix, 4);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    						matrix[rd][4] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        
        buttonCol6.click(function () {
    			//col6Row6.css( "background-color", "red" );	
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    					$('#ntf').html("");
    					var rd = getDropPosition(matrix, 5);
    					if (rd == -1) {
    						$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    					} else {
    						matrix[rd][5] = turnPlayer;
    					}
    					drawBoard(matrix);
    					chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        
        buttonCol7.click(function () {
    			//col7Row6.css( "background-color", "red" );	
    			if (gameStarted == false) {
    				$('#ntf').html("Press RESET/PLAY</br>button to start!").css("color", "red");
    			} else {
    				$('#ntf').html("");
    				var rd = getDropPosition(matrix, 6);
    				if (rd == -1) {
    					$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    				} else {
    					matrix[rd][6] = turnPlayer;
    				}
    				drawBoard(matrix);
    				chngPlayer(turnPlayer);
    				if (isGameOver(matrix)) {
    					$('#ntf').html("Game Over!").css("color", "red"); 
    					var answer = confirm("OK with the result?"); 
    					if (answer) {
    						initBoard();
    						drawBoard (matrix);
    						$('#ntf').html("");
    					} else {initBoard();drawBoard (matrix);$('#ntf').html("");}
    				}
    				if (turnPlayer == "Y"){
    					var pc = randomFromInterval(0,6);
							var rd = getDropPosition(matrix, pc);
    						if (rd == -1) {
    							$('#ntf').html("Column complete!</br>Pick a different one").css("color", "red");
    						} else {
    							matrix[rd][pc] = turnPlayer;
    						}
    						drawBoard(matrix);
    						chngPlayer(turnPlayer);
    				}
    			}
        });
        // Caching some of the selectors for better performance
				// Column 1
//				var col0Row5 = $('#col-0-row-5'),col0Row4 = $('#col-0-row-4'),col0Row3 = $('#col-0-row-3'),col0Row2 = $('#col-0-row-2'),col0Row1 = $('#col-0-row-1'),col0Row0 = $('#col-0-row-0');
//				// Column 2
//				var col1Row5 = $('#col-1-row-5'),col1Row4 = $('#col-1-row-4'),col1Row3 = $('#col-1-row-3'),col1Row2 = $('#col-1-row-2'),col1Row1 = $('#col-1-row-1'),col1Row0 = $('#col-1-row-0');
//				// Column 3
//				var col2Row5 = $('#col-2-row-5'),col2Row4 = $('#col-2-row-4'),col2Row3 = $('#col-2-row-3'),col2Row2 = $('#col-2-row-2'),col2Row1 = $('#col-2-row-1'),col2Row0 = $('#col-2-row-0');
//				// Column 4
//				var col3Row5 = $('#col-3-row-5'),col3Row4 = $('#col-3-row-4'),col3Row3 = $('#col-3-row-3'),col3Row2 = $('#col-3-row-2'),col3Row1 = $('#col-3-row-1'),col3Row0 = $('#col-3-row-0');
//				// Column 5
//				var col4Row5 = $('#col-4-row-5'),col4Row4 = $('#col-4-row-4'),col4Row3 = $('#col-4-row-3'),col4Row2 = $('#col-4-row-2'),col4Row1 = $('#col-4-row-1'),col4Row0 = $('#col-4-row-0');
//				// Column 6
//				var col5Row5 = $('#col-5-row-5'),col5Row4 = $('#col-5-row-4'),col5Row3 = $('#col-5-row-3'),col5Row2 = $('#col-5-row-2'),col5Row1 = $('#col-5-row-1'),col5Row0 = $('#col-5-row-0');
//				// Column 7
//				var col6Row5 = $('#col-6-row-5'),col6Row4 = $('#col-6-row-4'),col6Row3 = $('#col-6-row-3'),col6Row2 = $('#col-6-row-2'),col6Row1 = $('#col-6-row-1'),col6Row0 = $('#col-6-row-0');
});