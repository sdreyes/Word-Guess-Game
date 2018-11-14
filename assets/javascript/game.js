// Array of possibilities for the word the user has to guess
const wordChoices = ["pikachu", "charmander", "squirtle", "bulbasaur", "meowth", "jigglypuff", "chansey", "ghastly", "gengar", "mew", "jynx", "caterpie", "kangaskhan"];

// Holds the score
var wins = 0;
var losses = 0;
var guesses = 0;

// Variables that hold text to display
var wordText = document.getElementById("word-text");
var wrongGuessesText = document.getElementById("wrongguesses-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

var wordChoice = wordChoices[Math.floor(Math.random() * wordChoices.length)];

var wordLetters = [];
var wrongGuesses =[];

//creates an array of under scores to show how many letters are in the word the user needs to guess
for (var i = 0; i < wordChoice.length; i++) {
    wordLetters.push("_");
}

// When the user presses a key this function runs

document.onkeyup = function(event) {
    var letter = event.key;
    var userGuess = letter.toLowerCase();
    var userGuessKeyCode = event.keyCode;

    // If the user guesses a letter
    if (userGuessKeyCode > 64 && userGuessKeyCode < 91) {

        for (var j = 0; j < wordChoice.length; j++) {
            if (wordChoice[j] == userGuess) {
                wordLetters[j] = userGuess
            }
        }

        if (wordChoice.indexOf(userGuess) == -1) {

            if (wrongGuesses.indexOf(userGuess) > -1) {
                //if the letter has been guessed before, do nothing!

            }
            else {
                wrongGuesses.push(userGuess);
                guesses = guesses + 1;


                if (guesses === 12) {
                    losses = losses + 1;

                }
            }
        }
    }
    wordText.textContent = wordLetters.join(" ");
    wrongGuessesText.textContent = wrongGuesses.join(" ");
    guessesLeftText.textContent = 12 - guesses;
    winsText.textContent = wins;
    lossesText.textContent = losses;
    
}
