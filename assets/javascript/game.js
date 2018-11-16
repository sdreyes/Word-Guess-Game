// Array of possibilities for the word the user has to guess
// const wordChoices = ["pikachu", "charmander", "squirtle", "bulbasaur", "meowth", "jigglypuff", "chansey", "ghastly", "gengar", "mew", "jynx", "caterpie", "kangaskhan"];
// const imageLocations = ["assets/images/pikachu.png", "assets/images/charmander.png", "assets/images/squirtle.png", "assets/images/bulbasaur.png"]

const wordChoices = {
    "pikachu": "assets/images/pikachu.png",
    "charmander": "assets/images/charmander.png",
    "squirtle": "assets/images/squirtle.png",
    "bulbasaur": "assets/images/bulbasaur.png",
    "caterpie": "assets/images/caterpie.png"
};

console.log(wordChoices);
console.log(Object.keys(wordChoices).length);

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

var wordLetters
var wrongGuesses
var wordChoice
var wordChoiceImage
var image = document.createElement("img");

var resetGame = function() {
    var random = Math.floor(Math.random() * Object.keys(wordChoices).length);
    wordChoice = Object.keys(wordChoices)[random];
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
    wrongGuessesText.textContent = wrongGuesses.join(" ");
    guessesLeftText.textContent = 12 - guesses;
    winsText.textContent = wins;
    lossesText.textContent = losses;
}

document.onkeyup = function (event) {
    var startKeyCode = event.keyCode

    if (startKeyCode === 32) {

        resetGame();
        displayStats();
        instructionsText.textContent = "";
        
        document.onkeyup = function (event) {
            var letter = event.key;
            var userGuess = letter.toLowerCase();
            var userGuessKeyCode = event.keyCode;

            console.log(wordChoice);
            console.log(guesses);

            // If the user guesses a letter
            if (userGuessKeyCode > 64 && userGuessKeyCode < 91) {

                for (var j = 0; j < wordChoice.length; j++) {
                    // Does not deduct from "guesses left" if the letter was previously guessed
                    if (wordChoice[j] === userGuess && wordLetters[j] === "_") {
                        
                        if (wordLetters.includes(userGuess)) {
                            wordLetters[j] = userGuess
                        }

                        else {
                            wordLetters[j] = userGuess
                            guesses = guesses + 1;
                            console.log(wordLetters);
                        }
                    }
                }

                if (wordChoice.indexOf(userGuess) == -1) {

                    if (wrongGuesses.indexOf(userGuess) > -1) {
                        // If the letter has been guessed before, do nothing!
                    }
                    else {
                        wrongGuesses.push(userGuess);
                        guesses = guesses + 1;
                    }
                }

                if (wordLetters.includes("_") === false && guesses <= 12) {
                    wins++;
                    image.src = wordChoiceImage;
                    instructionsText.appendChild(image);
                    gameOutcomeText.textContent = "You win!";
                    resetGame();
                }

                else if (wordLetters.includes("_") && guesses === 12) {
                    losses++;
                    instructionsText.textContent = "";
                    gameOutcomeText.textContent = "You lose! The answer was " + wordChoice + ".";
                    resetGame();
                }

                displayStats();
            }
        }
    }
}