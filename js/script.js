// Global Variables:
  // Letters guessed element
const guessedLettersElement = document.querySelector(".guessed-letters");
  // Guess button
const guessLetterButton = document.querySelector(".guess");
  // Guessed letter current input
const currentGuess = document.querySelector(".letter");
  // Word in progress area
const wordInProgress = document.querySelector(".word-in-progress");
  // Remaining guesses paragraph
const remainingGuesses = document.querySelector(".remaining");
  // Remaining guesses count display
const remainingSpan = document.querySelector(".remaining span"); // **** look this up!!
  // Messages paragraph when letter guessed
const message = document.querySelector(".message");
  // Play again button
const playAgain = document.querySelector(".play-again");

  // Random word
const word = "magnolia";
  // Letters guessed
const guessedLetters = [];

// Step #1
  // Setup placeholders for each letter of word to guess as "●"
    // const currentWord will be the current word to guess
const currentWord = function (word) {
  const placeHolderLetters =[];
  for (const letter of word) {
    console.log(letter);
    placeHolderLetters.push("●")
  }
  wordInProgress.innerText = placeHolderLetters.join("");
};
currentWord(word);

  // Button Event listener for player guesses 
    // guessLetter will be the current guess input
guessLetterButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  const letterChosen = currentGuess.value;
  // send to check if it is a single letter
  const goodGuess = validateGuess(letterChosen);

  if (goodGuess) {
    makeGuess(letterChosen);
  }
  currentGuess.value = "";
});

// Step #2
  // function to accept value as parameter
const validateGuess = function (letterChosen) {
  const acceptedLetter = /[a-zA-Z]/;
  if (letterChosen.length === 0 ) {
    // to check if input was nothing
    message.innerText = "You need to input a letter.";
  } else if (letterChosen.length > 1) {
    message.innerText = "Oops you entered 2 letters.";
  } else if (!letterChosen.match(acceptedLetter)) {
    // When input is other than letter
    message.innerText = "Oh!  Something other than a letter was given. Try again!";
  } else {
    // single letter was input
    return letterChosen;
  }
};

const makeGuess = function(letterChosen) {
  letterChosen = letterChosen.toUpperCase();
  if(guessedLetters.includes(letterChosen)) {
    message.innerText = "You Guessed this letter already :P  Try again."
  } else {
    guessedLetters.push(letterChosen);
    console.log(guessedLetters);
  }
};



