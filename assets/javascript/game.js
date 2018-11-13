// Array of possibilities for the word the user has to guess
const wordChoices = ["pikachu", "charmander", "squirtle", "bulbasaur", "meowth", "jigglypuff", "chansey", "ghastly", "gengar", "mew"];

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

console.log(wordChoice);

var wordLetters = [];
var wrongGuesses =[];

//creates an array of under scores to show how many letters are in the word the user needs to guess
for (var i=0; i < wordChoice.length; i++) {
    wordLetters.push("_");
}
console.log(wordLetters);
wordText.textContent = wordLetters.join(" ");


// When the user presses a key this function runs
document.onkeyup = function(event) {
    var letter = event.key;
    var userGuess = letter.toLowerCase();

    if(wordChoice.indexOf(userGuess) > -1) {
        wordLetters[wordChoice.indexOf(userGuess)] = userGuess;
        console.log(wordLetters);
        wordText.textContent = wordLetters.join(" ");
    } else {

        if(wrongGuesses.indexOf(userGuess) > -1) {
            //if the letter was already guessed before, do nothing
        }
        else {
        wrongGuesses.push(userGuess);
        guesses = guesses + 1;
        console.log(wrongGuesses);
        guessesLeftText.textContent = 12 - guesses;
        }
    }
}