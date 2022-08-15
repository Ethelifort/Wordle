import { WORDS } from "./words.js";


const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];//The words guessed will be placed in here for future comparison.
let nextLetter = 0; //Index of an array.
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];//Random word chosen.
console.log(rightGuessString);



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

document.addEventListener("keyup", (e)=>{

     if(guessesRemaining === 0){
        return;
    }

    let pressedKey = String(e.key);
    if(pressedKey === "Backspace" && nextLetter != 0){
        deleteLetter();
        return;
    }

    if(pressedKey === "Enter"){
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);//Reg ex
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

//Interacting with user

function checkGuess(){
    let row =  document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);


    for(const val of currentGuess){
        guessString += val;
    }

    if(guessString.length != 5){
        alert("Not enough letters");
        return;
    }

    if(!WORDS.includes(guessString)){
        alert("Word not in list")
        return;

    }

    for(let i = 0;  i < 5; i++){

        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];

        let letterPosition = rightGuess.indexOf(currentGuess[i]); //Is user word has letters thats in the right guess.
        //Formating
        if(letterPosition === -1){
            letterColor = 'grey';
        } else {
            if(currentGuess[i] === rightGuess[i]){
                letterColor = 'green';
            } else{
                letterColor = 'yellow';
            }

            rightGuess[letterPosition] = '#';
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor;
            shadeKeyBoard(letter, letterColor);
        }, delay)

    }

        if(guessString === rightGuessString){
            alert("You are correct, Game over!")
            guessesRemaining = 0;
            return;

        } else { //Reseting variables to start the next guess on a new row.
            guessesRemaining -=1;
            currentGuess = [];
            nextLetter = 0;
        }

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }

    }


function shadeKeyBoard(letter,color){

    for(const elem of document.getElementsByClassName('keyboard-button')){

        if(elem.textContent === letter){

            let oldColor = elem.style.backgroundColor;
            if (oldColor === 'green'){
                return;
            }

            if(oldColor === 'yellow' && color !== 'green'){
                return;
            }

            elem.style.backgroundColor = color;
            break;

        }

    }
}

document.getElementById('keyboard-cont').addEventListener('click',(e) =>{

    const target = e.target;

    if(!target.classList.contains('keyboard-button')){
        return;
    }

    let key = target.textContent;

    if(key === 'Del'){
        key = 'Backspace';
    }

    document.dispatchEvent(new KeyboardEvent('keyup',{'key':key}))
})