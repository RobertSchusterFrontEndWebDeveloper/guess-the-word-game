// Letters guessed
const guessedLetters = document.querySelector(".guessed-letters");

// Guess button
const guessButton = document.querySelector(".guess");

// Text input block
const letterChosen = document.querySelector(".letter");

// Word in progress area
const wordInProgress = document.querySelector(".word-in-progress");

// Remaining guesses count
const remainingGuesses = document.querySelector(".remaining");

// Remaining guesses count display
const remainingSpan = document.querySelector(".remaining span"); // **** look this up!!

// Messages paragraph
const message = document.querySelector(".message");

// Play again button
const playAgain = document.querySelector(".play-again");

// Random word
const word = "magnolia";

// Setup placeholders for each letter 
const letterHolder = function (word) {
  const placeHolderLetters =[];
  for (const letter of word) {
    console.log(letter);
    placeHolderLetters.push("●")
  }
  wordInProgress.innerText = placeHolderLetters.join("");
};

letterHolder(word);

  // wordInProgress.innerText="●";




