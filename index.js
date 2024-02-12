//by seeing the demo project we observe that
// 1 - Keep a track on 'X','0' users and initially a User X is playing then '0' user plays
// 2- initially all boxes of grids are empty
// 3- initially the newGame button is invisible
// 4 - we have to know and store the winning locations -(total of 8 such positions)
// 5- so making an array of winning positions and initialising the current 
// player value, emptying all 9 boxes & making newGame button invisible
// 6 - We observe that when if 'X' user clicks on box it reads the value X and
// then this box cannot be clicked again and '0' clicks then it reads '0' value
// 7 - so we are adding a event listener to all the boxes on the "click" event
// Then calling the handleClick function with index of the box that has been clicked
// HandleClick will put the value either 'X' or '0' depending on the current player
// 8- Then each time afer click Check whether the users X or 0 has Won the game
// 9 - In the handle slider first we we checking if the gameGrid at that index is
// empty then only update the value X/0 on the ui(box) as well as on gameGrid(index)
// 10 - Then we call swapturn, it basically swaps the turns if 'X' has played then
// next chance is for '0' and vice-versa
//*** IN our initGame function we are emptying the gameGrid but we are not updating
// in the UI so update the boxes for each box to "empty"
// 11 - then checking if thany player has won the game or not


const boxes = document.querySelectorAll(".block");
const gameInfo = document.querySelector(".game-info");
const gamebtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;
const winning=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]
initGame();
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });

    gamebtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
    boxes.forEach((box) => {
        box.classList.remove("win");
    });

}


function gameover(){
    let answer="";
    winning.forEach((position) => {
        if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {
                
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "0";
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";//to stop the game after winning
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        gamebtn.classList.add("active");
        return;
    }

    let count =0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            count++;
    });

    if(count==9){
        gameInfo.innerText ="Game Tied ";
        gamebtn.classList.add("active");
    }

}

function swapTurns(){
    if(currentPlayer=="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;// updating on the UI
        gameGrid[index] = currentPlayer;//Updating inside our code
        boxes[index].style.pointerEvents = "none";
        //now swapping the TURNS from ONE PLAYER to OTHER PLAYER

        swapTurns();

        // DID ANYONE WON?? SO checking......GameOver

        gameover();

    }
}

boxes.forEach((box,index) => {

    box.addEventListener("click",()=>{
        handleClick(index);
    });
//here we are passing index to know which box has been clicked
});
 
gamebtn.addEventListener("click",initGame);