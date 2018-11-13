// Array of possibilities for the word the user has to guess
var wordChoices = ["pikachu", "charmander", "squirtle", "bulbasaur", "meowth", "jigglypuff", "chansey", "ghastly", "gengar", "mew"];

// Holds the score
var wins = 0;
var losses = 0;

// Variables that hold text to display
var wordText = document.getElementById("word-text");
var wrongGuessesText = document.getElementById("wrongguesses-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

// When the user presses a key this function runs
document.onkeyup = function(event) {
    var userGuess = event.key;

    console.log(userGuess);

}