
// Dictionary of possibilities for the words the user has to guess

const wordChoices = {
    "bulbasaur": "assets/images/bulbasaur.png",
    "caterpie": "assets/images/caterpie.png",
    "chansey": "assets/images/chansey.png",
    "charmander": "assets/images/charmander.png",
    "dratini": "assets/images/dratini.png",
    "gastly": "assets/images/gastly.png",
    "growlithe": "assets/images/growlithe.png",
    "jigglypuff": "assets/images/jigglypuff.png",
    "jynx": "assets/images/jynx.png",
    "kangaskhan": "assets/images/kangaskhan.png",
    "lickitung": "assets/images/lickitung.png",
    "mew": "assets/images/mew.png",
    "pikachu": "assets/images/pikachu.png",
    "pinsir": "assets/images/pinsir.png",
    "snorlax": "assets/images/snorlax.png",
    "squirtle": "assets/images/squirtle.png",
    "staryu": "assets/images/staryu.png",
    "tangela": "assets/images/tangela.png"
};

// Holds the score
var wins = 0;
var losses = 0;
var guesses

// Variables that hold text to display
var wordText = document.getElementById("word-text");
var wrongGuessesText = document.getElementById("wrongguesses-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var instructionsText = document.getElementById("instructions-text");
var gameOutcomeText = document.getElementById("game-outcome-text");
var imageLocText = document.getElementById("image-loc");


var wordLetters
var wrongGuesses
var wordChoice
var wordChoiceImage
var image = document.createElement("img");
const spaceBar = 32;
const a = 65;
const z = 90;
const maxGuesses = 12;

var resetGame = function() {
    var random = Math.floor(Math.random() * Object.keys(wordChoices).length);
    wordChoice = Object.keys(wordChoices)[random];
    console.log(wordChoice);
    wordChoiceImage = Object.values(wordChoices)[random];
    wordLetters = [];
    guesses = 0;
    wrongGuesses = [];

    //creates an array of under scores to show how many letters are in the word the user needs to guess
    for (var i = 0; i < wordChoice.length; i++) {
        wordLetters.push("_");
    }
}

var displayStats = function() {
    wordText.textContent = wordLetters.join(" ");
    wrongGuessesText.textContent = wrongGuesses.sort().join(" ");
    guessesLeftText.textContent = maxGuesses - guesses;
    winsText.textContent = wins;
    lossesText.textContent = losses;
}

document.onkeyup = function (event) {
    var startKeyCode = event.keyCode

    if (startKeyCode === spaceBar) {

        resetGame();
        displayStats();
        instructionsText.textContent = "";
        
        document.onkeyup = function (event) {
            var letter = event.key;
            var userGuess = letter.toLowerCase();
            var userGuessKeyCode = event.keyCode;

            // If the user guesses a letter
            if (userGuessKeyCode >= a && userGuessKeyCode <= z) {

                for (var j = 0; j < wordChoice.length; j++) {
                    
                    //If the letter is not in the word yet, place it in and add to the guess count
                    if (wordChoice[j] === userGuess && wordLetters[j] === "_" && !wordLetters.includes(userGuess)) {
                        wordLetters[j] = userGuess;
                        guesses++;
                    }
                    // Does not add to the guess count if the letter was previously guessed
                    else if (wordChoice[j] === userGuess && wordLetters[j] === "_") {
                        wordLetters[j] = userGuess;
                    }
                }
                //If the word does not include the letter the user guessed
                if (!wordChoice.includes(userGuess)) {

                    // If the letter has been guessed before, do nothing. Otherwise push it to the wrong guess array and add one to the number of guesses.
                    if (!wrongGuesses.includes(userGuess)) {
                        wrongGuesses.push(userGuess);
                        guesses++;
                    }
                }
                //if the word no longer has blank spaces and the guesses haven't exceeded the max guesses, you win!
                if (!wordLetters.includes("_") && guesses <= maxGuesses) {
                    wins++;
                    image.src = wordChoiceImage;
                    image.className = "text-center";
                    imageLocText.appendChild(image);
                    gameOutcomeText.className = "text-success text-center";
                    gameOutcomeText.textContent = "You win! The answer was " + wordChoice + "!";
                    resetGame();
                }

                //If the word still has blank spaces and the max guesses has been reached, you lose!
                else if (wordLetters.includes("_") && guesses === maxGuesses) {
                    losses++;
                    image.src = "assets/images/sad.gif";
                    image.className = "text-center";
                    imageLocText.appendChild(image);
                    gameOutcomeText.className = "text-danger text-center";
                    gameOutcomeText.textContent = "You lose! The answer was " + wordChoice + ".";
                    resetGame();
                }

                displayStats();
            }
        }
    }
}