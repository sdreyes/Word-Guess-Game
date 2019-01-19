

// Dictionary of Pokemon possibilities

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

// Score related variables
var wins = 0;
var losses = 0;
var guesses
const maxGuesses = 12;

// Variables that hold text to display
var wordText = document.getElementById("word-text");
var wrongGuessesText = document.getElementById("wrongguesses-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var instructionsText = document.getElementById("instructions-text");
var gameOutcomeText = document.getElementById("game-outcome-text");
var imageLocText = document.getElementById("image-loc");

// Key codes
const spaceBar = 32;
const a = 65;
const z = 90;

// Array for the letters that are correct
var wordLetters

// Array for letters that are incorrect
var wrongGuesses

// Variables that hold info pulled from the dictionary
var wordChoice
var wordChoiceImage

// Creates an image tag to later hold the Pokemon's picture
var image = document.createElement("img");

// Function that resets the random Pokemon, the guess counter, and the arrays that hold the letters the user has typed
var resetGame = function() {
    var random = Math.floor(Math.random() * Object.keys(wordChoices).length);
    wordChoice = Object.keys(wordChoices)[random];
    wordChoice = wordChoice.split('');
    console.log(wordChoice);
    wordChoiceImage = Object.values(wordChoices)[random];
    wordLetters = [];
    guesses = 0;
    wrongGuesses = [];

    // Creates an array of underscores to show how many letters are in the word
    for (var i = 0; i < wordChoice.length; i++) {
        wordLetters.push("_");
    }
}

// Function that displays updated game stats
var displayStats = function() {
    wordText.textContent = wordLetters.join(" ");
    wrongGuessesText.textContent = wrongGuesses.sort().join(" ");
    guessesLeftText.textContent = maxGuesses - guesses;
    winsText.textContent = wins;
    lossesText.textContent = losses;
}

document.onkeyup = function (event) {
    var startKeyCode = event.keyCode
    // Start the game if the user pressed the spacebar
    if (startKeyCode === spaceBar) {

        resetGame();
        displayStats();
        instructionsText.textContent = "";
        
        // Evaluate the keys the user types
        document.onkeyup = function (event) {
            var letter = event.key;
            var userGuess = letter.toLowerCase();
            var userGuessKeyCode = event.keyCode;

            // If the user guesses a letter
            if (userGuessKeyCode >= a && userGuessKeyCode <= z) {

                $.each(wordChoice, function(i, letter) {
                    //If the letter is not in the word yet, place it in and add to the guess count
                    if (letter === userGuess && wordLetters[i] === "_" && !wordLetters.includes(userGuess)) {
                        wordLetters[i] = userGuess;
                        guesses++;
                    }
                    // Does not add to the guess count if the letter was previously guessed
                    else if (letter === userGuess && wordLetters[i] === "_") {
                        wordLetters[i] = userGuess;
                    }
                })
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
                    $(image).attr("src", wordChoiceImage).addClass("text-center");
                    $("#image-loc").append(image);
                    $("#game-outcome-text").removeClass();
                    $("#game-outcome-text").addClass("text-success text-center");
                    $("#game-outcome-text").html("You win! The answer was " + wordChoice.join('') + "!");
                    resetGame();
                }

                //If the word still has blank spaces and the max guesses has been reached, you lose!
                else if (wordLetters.includes("_") && guesses === maxGuesses) {
                    losses++;
                    $(image).attr("src", "assets/images/sad.gif").addClass("text-center");
                    $("#image-loc").append(image);
                    $("#game-outcome-text").removeClass();
                    $("#game-outcome-text").addClass("text-danger text-center");
                    $("#game-outcome-text").html("You lose! The answer was " + wordChoice.join('') + ".");
                    resetGame();
                }

                displayStats();
            }
        }
    }
}