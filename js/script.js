// Global Variables:
  // Letters guessed
const guessedLetters = document.querySelector(".guessed-letters");
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
  const letterChosen = currentGuess.value;
  console.log(`${letterChosen} was just chose.`);
     // clear the value for next guess input
  currentGuess.value = "";
});





