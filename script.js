import { WORDS } from "./words.js";


const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];//The words guessed will be placed in here for future comparison.
let nextLetter = 0; //Index of an array.
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];//Random word chosen.




//Build the gameboard

function initBoard(){
    let board = document.getElementById('game-board');

     
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div") //Creating the rows.
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div") //Putting the boxes on the rows.
            box.className = "letter-box"
            row.appendChild(box) 
        }

        board.appendChild(row) //Adding the rows to the board.
    }
}

initBoard();

document.addEventListener("keyup,", (e)=>{

    if(guessesRemaining === 0){
        return;
    }

    let pressedKey = String(e.key);
    if(pressedKey === "Backspace" && nextLetter !==0){
        deleteLetter();
        return;
    }

    if(pressedKey === "Enter"){
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);//Reg 
    if(!found || found.length > 1){
            return;
    } else{
        insertLetter(pressedKey); 
    }
})

function insertLetter(pressedKey){

    if(nextLetter === 5){
        return;
    }

    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining]; //Check were not at the end of a row.
    let box = row.children[nextLetter];//Figure out the box on the row where it needs to go.
    box.textContent = pressedKey;

    box.classList.add("filled-box");
    currentGuess.push(pressedKey); // Add the pressed key.
    nextLetter += 1;
    
}

function deleteLetter(){
    let row =  document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let box =  row.children[nextLetter-1]
    box.textContent = '';
    box.classList.remove('filled-box');
    currentGuess.pop()

    nextLetter -=1;
}