// array to store paths of elements
var greenArray  = ["g1", "g2", "g3", "g4", "g5", "y0", "y1", "y2","y3","y4","y5","y17","y6","y7","y8","y9","y10","y11","b0", "b1", "b2","b3","b4","b5","b17","b6","b7","b8","b9","b10","b11","r6","r7","r8","r9","r10","r11","r12","r0","r1","r2","r3","r4","r5","g6","g7","g8","g9","g10","g11","g12","g13", "g14", "g15", "g16", "g17"];
var blueArray   = ["b7","b8","b9","b10","b11","r6","r7","r8","r9","r10","r11","r12","r0","r1","r2","r3","r4","r5","g6","g7","g8", "g9", "g10", "g11" ,"g12", "g0","g1", "g2", "g3", "g4", "g5", "y0", "y1", "y2","y3","y4","y5","y17","y6","y7","y8","y9","y10","y11","b0", "b1","b2","b3","b4","b5","b17","b16","b15","b14","b13","b12"];
var yellowArray = ["y7","y8","y9","y10","y11","b0", "b1", "b2","b3","b4","b5","b17","b6","b7","b8","b9","b10","b11", "r6","r7","r8","r9","r10","r11","r12","r0","r1","r2","r3","r4","r5","g6","g7","g8", "g9", "g10", "g11" ,"g12", "g0","g1", "g2", "g3", "g4", "g5", "y0", "y1", "y2","y3","y4","y5","y17", "y16", "y15", "y14", "y13","y12"];
var redArray    = ["r1","r2","r3","r4","r5", "g6","g7","g8", "g9", "g10", "g11" ,"g12", "g0","g1", "g2", "g3", "g4", "g5", "y0", "y1", "y2","y3","y4","y5","y17","y6","y7","y8","y9","y10","y11","b0", "b1", "b2","b3","b4","b5","b17","b6","b7","b8","b9","b10","b11","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15","r16","r17"] ;

var idArray = [redArray ,greenArray, yellowArray, blueArray];

// colors array 
var colors = ["red", "green", "yellow", "blue"];
var clr = ["r", "g", "y", "b"];
var pre_clr = ["white", "white", "white", "white"];

// which element is going to move out
var onBoard = [0,0,0,0];

// arrays to store the colors positions
var rindex = [-1,-1,-1,-1];
var gindex = [-1,-1,-1,-1];
var yindex = [-1,-1,-1,-1];
var bindex = [-1,-1,-1,-1];

 var index = [rindex, bindex, yindex, gindex];

// which player's turn is this
var turn = 0;

// to guess the number
var guessNum = 0;


//showing headline
var headline = "=>  Game is going on...";


//list of number of winning pieces
var winpieces = [0,0,0,0];

// function used to move the piece out of the block
function movePieceOut()
{
    //check whether is there any piece is in block or not
    // then setting that block white and updating the headline
    if (onBoard[turn] <= 3)
    {
        var str = clr[turn]+"b"+onBoard[turn];
        document.getElementById(str).style.backgroundColor = "white";
        headline = "=>   " + colors[turn].toUpperCase() + " moved out ";
        document.getElementById("hdl").style.color = "black";
    }
    else
    {
        // error message on console
        console.log("All pieces are out");
    }
}


// function is used to check if the current piece is 
// overlaping the already occupied piece
function checkKill()
{
    // we need to check the previous colour of that piece, if overlapted, then
    // surely be moved into its block
    // we change prevoius colour, onboard number and index (position) to move it out.
    // then updating the headline
    switch(pre_clr[turn])
    {
        // red turn 
        case "red": 
            var str = clr[0]+"b"+onBoard[0];
            document.getElementById(str).style.backgroundColor = "#bb281e";     
            index[0][onBoard[0]] = -1;
            pre_clr[turn] = pre_clr[0];
            headline = "=>   " + colors[turn].toUpperCase() + "   killed   RED";  
            document.getElementById("hdl").style.color = "red";
            break;
        //green turn
        case "green": 
            var str = clr[1]+"b"+onBoard[1];
            document.getElementById(str).style.backgroundColor = "#84c21f";            
            index[1][onBoard[1]] = -1;
            pre_clr[turn] = pre_clr[1];
            headline = "=>   " + colors[turn].toUpperCase() + "   killed   Green";  
            document.getElementById("hdl").style.color = "red";

            break;
        // yellow turn
        case "yellow":
            var str = clr[2]+"b"+onBoard[2];
            document.getElementById(str).style.backgroundColor = "#e6bc04";            
            index[2][onBoard[2]] = -1;
            pre_clr[turn] = pre_clr[2];
            headline = "=>   " + colors[turn].toUpperCase() + "   killed   YELLOW";  
            document.getElementById("hdl").style.color = "red";

            break;
        // blue turn
        case "blue":
            var str = clr[3]+"b"+onBoard[3];
            document.getElementById(str).style.backgroundColor = "#11a0e7";            
            index[3][onBoard[3]] = -1;
            pre_clr[turn] = pre_clr[3];
            headline =  "=>   " + colors[turn].toUpperCase() + "   killed   BLUE"; 
            document.getElementById("hdl").style.color = "red";

            break;   
    }
}


//function to move the piece , it performs all the functionallity of game
function moveIt()
{
    // first we check weither the board index is -1 
    //(mean the piece is in its block or not)

    // if the piece is in block, we just need to place
    // the piece on the start of the path
    if (index[turn][onBoard[turn]] == -1)
    {
        // but we also need to check whether
        // the random number is 6 or not, only
        // on 6 , we have to place the piece 
        // on the path
        if (guessNum == 6)
        {
            movePieceOut();
            index[turn][onBoard[turn]] = 0;
            pre_clr[turn] = document.getElementById(idArray[turn][index[turn][onBoard[turn]]]).style.backgroundColor;
            document.getElementById(idArray[turn][index[turn][onBoard[turn]]]).style.backgroundColor = colors[turn];
        }
    }
    else
    {
        // if the piece is outside the box
        // then move it according to guessed number
        document.getElementById(idArray[turn][index[turn][onBoard[turn]]]).style.backgroundColor = pre_clr[turn];
        index[turn][onBoard[turn]] += guessNum;

        // check if the piece have passed the board or not
        if (index[turn][onBoard[turn]] >=56)
        {
            // if yes , then clear the piece and move to new piece
            headline = "=>   " + colors[turn].toUpperCase() + " passed ... ";
            document.getElementById("hdl").style.color = "green";
            winpieces[turn]++;
            onBoard[turn]++;
            return;
        }

        // otherwise move piece to new position
        pre_clr[turn] = document.getElementById(idArray[turn][index[turn][onBoard[turn]]]).style.backgroundColor;

        // calling kill checkker function
        checkKill();

        // changing the color of new piece position
        document.getElementById(idArray[turn][index[turn][onBoard[turn]]]).style.backgroundColor = colors[turn];
    }

    //repeat turn if guessed number is 6
    if (guessNum == 6)
    {
        turn--;
    }
}


// function is used to decorate the runs (Wining Pieces) box on html page.
function setWinPieces()
{
    document.getElementById("rpe").innerText = "RED = " + winpieces[0];
    document.getElementById("gpe").innerText = "GREEN = " + winpieces[1];
    document.getElementById("ype").innerText = "YELLOW = " + winpieces[2];
    document.getElementById("bpe").innerText = "BLUE = " + winpieces[3];
}


// function is used to see if there all the players have won the game or not
// if yes , then the headline should be " GAME OVER... "
function isWin()
{
    if(winpieces[0] >= 4 && winpieces[1] >= 4 && winpieces[2] >= 4 && winpieces[3] >= 4)
    {
        document.getElementById("hdl").innerText = "=>   GAME OVER ...";
        document.getElementById("hdl").style.color = "rgb(4, 71, 73)";
        return true;
    }
    else
    {
        return false;
    }
}


// function called everytime when roll button is pressed
function rollDice()
{

    // check for all winners or not
    if (isWin() == true)
    {
        return;
    }

    //resetting headline string
    // headline = "=>   ";

    // getting new available turn
    if (onBoard[turn] > 3)
    {
        while(onBoard[turn] > 3)
        {
            turn = (turn+1) % 4;
        }
    }

    // guessing a random number using JavaScript math's library
    guessNum = Math.floor((Math.random() * 6) + 1);
    
    //decorating the box of guessed number 
    document.getElementById("tbox").innerText = guessNum;
    document.getElementById("tbox").style.borderColor = colors[turn];
    document.getElementById("table1").innerText = colors[turn].toUpperCase()+ " got:"; 
    document.getElementById("table1").style.color = colors[turn];

    // if the number is 6, then next turn should be of it self
    if (guessNum != 6)
    {
        // getting next available block, if guessed number is not 6
        var j = 1;
        while(onBoard[(turn+j)%4] > 3)
        {
            j++;
        }

        // decorating the box of next one's turn 
        document.getElementById("table2").innerText = "Its " + colors[(turn+j)%4].toUpperCase()+ "\'s turn"; 
        document.getElementById("table2").style.color = colors[(turn+j)%4];
    }

    //moving the piece of respected turn
    moveIt();

    // decorating the runs (Wining Pieces) box on html page.
    setWinPieces();
    // updating headline on frontend (html page)
    document.getElementById("hdl").innerText = headline;

    // moving towards next turn
    turn = (turn + 1)% 4;
}
