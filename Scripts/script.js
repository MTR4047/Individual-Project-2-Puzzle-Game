rowsize = 4; colsize = 4;
Move_Val = 0; document.getElementById("MovesSpentVar").innerText = Move_Val;

Time_Val = 0; document.getElementById("TimeSpentVar").innerText = Time_Val; 
Timer_Interval = null; // Interval variable

function incrementTimeUnit()
{
	Time_Val++; document.getElementById("TimeSpentVar").innerText = Time_Val;
}

function startTimer() 
{
    // Check if the timer is already running
    if (!Timer_Interval) 
	{
        Timer_Interval = setInterval(() => 
		{incrementTimeUnit();}, 1000); // Increment and update the timer every 1000 ms
    }
}

function stopTimer() 
{
    clearInterval(Timer_Interval); Timer_Interval = null; // Stop the timer and reset the variable
}

function resetTimer()
{
	stopTimer();
	Time_Val = 0; document.getElementById("TimeSpentVar").innerText = Time_Val;
	startTimer(); // Reset timer
}

function setOriginalPositions() 
{
	stopTimer();
    Time_Val = 0; document.getElementById("TimeSpentVar").innerText = Time_Val;
	Moves_Val = 0; document.getElementById("MovesSpentVar").innerText = Moves_Val;
	
    // Reset the tiles' inner text to their original numbers
    initialValuesArr = 
	[
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];
	
	cellElement = document.getElementById("cell4-4"); cellElement = "tile16"; // Set whitespace as default

    for (var row = 1; row <= rowsize; row++) // Traverse each row of the grid
	{
		// Traverse each column in the specified row
		for (var col = 1; col <= colsize; col++) 
		{
            cellID = `cell${row}-${col}`; // Construct the cell ID
            cellElement = document.getElementById(cellID); // Get the cell element
            
			cellElement.className = `tile${initialValuesArr[row - 1][col - 1]}`;
        }
    }
}

function swapTiles(cell1, cell2) 
{
	Move_Val += 1; document.getElementById("MovesSpentVar").innerText = Move_Val;
	
	var temp = document.getElementById(cell1).className;
	document.getElementById(cell1).className = document.getElementById(cell2).className;
	document.getElementById(cell2).className = temp;
}

function shuffle() 
{
	resetTimer();
	
	for(var row = 1; row <= rowsize; row++) // Traverse each row of the grid
	{
		// Traverse each column in the specified row
		for (var col = 1; col <= colsize; col++) 
		{
			// pick a random row from 1 to rowsize
			var row2 = Math.floor(Math.random()*rowsize+1);
			
			// pick a random column from 1 to colsize
			var col2 = Math.floor(Math.random()*colsize+1);
			
			swapTiles("cell"+row+"-"+col, "cell"+row2+"-"+col2); //swap the look & feel of both cells
		}
	}
	
	Move_Val = 0; document.getElementById("MovesSpentVar").innerText = Move_Val;
}

function simpleShuffle() 
{
	setOriginalPositions();
	resetTimer();
	
	var Sentinel = Math.floor(Math.random() * 2);
	
	if (Sentinel == 1)
	{
		swapTiles("cell4-4", "cell4-3");
	}
	else
	{
		swapTiles("cell4-4", "cell3-4");
	}
	
	Move_Val = 0; document.getElementById("MovesSpentVar").innerText = Move_Val;
}

function clickTile(row, col) 
{
    var cell = document.getElementById("cell" + row + "-" + col);
    var tile = cell.className;
	
    if (tile != "tile16") // If not the empty tile
	{ 
        // Check if the empty tile is right
        if (col < 4) 
		{
            if (document.getElementById("cell" + row + "-" + (col + 1)).className == "tile16") 
			{
                swapTiles("cell" + row + "-" + col, "cell" + row + "-" + (col + 1));
				setTimeout(() => {Win()}, 1000); 
                return;
            }
        }
        // Check if the empty tile is left
        if (col > 1) 
		{
            if (document.getElementById("cell" + row + "-" + (col - 1)).className == "tile16") 
			{
                swapTiles("cell" + row + "-" + col, "cell" + row + "-" + (col - 1));
				setTimeout(() => {Win()}, 1000); 
                return;
            }
        }
        // Check if the empty tile is above
        if (row > 1) 
		{
            if (document.getElementById("cell" + (row - 1) + "-" + col).className == "tile16") 
			{
                swapTiles("cell" + row + "-" + col, "cell" + (row - 1) + "-" + col);
				setTimeout(() => {Win()}, 1000); 
                return;
            }
        }
        // Check if the empty tile is below
        if (row < 4) 
		{
            if (document.getElementById("cell" + (row + 1) + "-" + col).className == "tile16") 
			{
                swapTiles("cell" + row + "-" + col, "cell" + (row + 1) + "-" + col);
				setTimeout(() => {Win()}, 1000); 
                return;
            }
        }
    }
}

function Win()
{
	//Write some code logic here that determines if the tiles are all in order, hence the puzzle is won. If so, alert to the user that they won.

	if(document.getElementById("cell1-1").className=="tile1" && document.getElementById("cell1-2").className=="tile2" && document.getElementById("cell1-3").className=="tile3" && document.getElementById("cell1-4").className=="tile4" 
	&& document.getElementById("cell2-1").className=="tile5" && document.getElementById("cell2-2").className=="tile6" && document.getElementById("cell2-3").className=="tile7" && document.getElementById("cell2-4").className=="tile8" 
	&& document.getElementById("cell3-1").className=="tile9" && document.getElementById("cell3-2").className=="tile10" && document.getElementById("cell3-3").className=="tile11" && document.getElementById("cell3-4").className=="tile12" 
	&& document.getElementById("cell4-1").className=="tile13" && document.getElementById("cell4-2").className=="tile14" && document.getElementById("cell4-3").className=="tile15" && document.getElementById("cell4-4").className=="tile16")
	{
		window.alert("Congratulations!!\nAmount spent on current game in seconds: " + Time_Val +"\nNumber of moves so far: " + Move_Val +"\nWould you like to play again?");
		window.location.reload(); //Reload page upon confirmation
	}
}