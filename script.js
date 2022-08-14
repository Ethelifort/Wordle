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
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

