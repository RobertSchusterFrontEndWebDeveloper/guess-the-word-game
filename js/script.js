// Global Variables:
  // Letters guessed element
const guessedLettersElement = document.querySelector(".guessed-letters");
  // Guess button
const guessLetterButton = document.querySelector(".guess");
  // Guessed letter current input (letterInput in solution)
const currentGuess = document.querySelector(".letter");
  // Word in progress area
const wordInProgress = document.querySelector(".word-in-progress");
  // Remaining guesses paragraph (remainingGuessesElement in solution)
const remainingGuessesElement = document.querySelector(".remaining");
  // Remaining guesses count display (remainingGuessesSpan in solution)
const remainingSpan = document.querySelector(".remaining span"); // **** look this up!!
  // Messages paragraph when letter guessed
const message = document.querySelector(".message");
  // Play again button
const playAgain = document.querySelector(".play-again");

  // Random word
const word = "magnolia";
  // Letters guessed
const guessedLetters = [];
  // number of guesses
const remainingGuesses = 8;

// Step #1
  // Setup placeholders for each letter of word to guess as "●"
    // const currentWord will be the current word to guess- "placeholder" in solution
const currentWord = function (word) {
  const placeHolderLetters =[];
  for (const letter of word) {
    console.log(letter);
    placeHolderLetters.push("●")
  }
  wordInProgress.innerText = placeHolderLetters.join("");
};
currentWord(word);  // "currentWord" = solutions 'placeholder' 

  // Button Event listener for player guesses 
    // guessLetter will be the current guess input
guessLetterButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  const letterChosen = currentGuess.value;
  // letterChosen is "guess" in solution; currentGuess is "letterInput" in solution
  // send to check if it is a single letter
  const goodGuess = validateGuess(letterChosen);

  if (goodGuess) {
    makeGuess(letterChosen);
  }
  currentGuess.value = "";
});

// Step #2
  // function to accept value as parameter
  // validateGuess is letterInput in solution
const validateGuess = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0 ) {
    // to check if input was nothing
    message.innerText = "You need to input a letter.";
  } else if (input.length > 1) {
    message.innerText = "Oops you entered 2 letters.";
  } else if (!input.match(acceptedLetter)) {
    // When input is other than letter
    message.innerText = "Oh!  Something other than a letter was given. Try again!";
  } else {
    // single letter was input
    return input;
  }

  return guessesRemaining;
};

const makeGuess = function(letterChosen) {
  letterChosen = letterChosen.toUpperCase();
  if(guessedLetters.includes(letterChosen)) {
    message.innerText = "You Guessed this letter already :P  Try again."
  } else {
    guessedLetters.push(letterChosen);
    console.log(guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
    // return playerGuess;
  }
};

// Step #3 Function to display Letters chosen and word to guess
const showGuessedLetters = function () {
  // clear the list of letters
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)){
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

  // Count and monitor the number of guesses
const guessesRemaining = function (letterChosen) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(letterChosen)) {
    remainingGuessesElement.innerText = `Pick another letter. ${remainingGuesses} guesses.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Nice Guess!  The letter ${letterChosen} is in the word.`;
  }

  if (remainingGuesses === 0 ){
    message.innerText = `No more guesses`;
  } else  if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses.`;
  }
  };
    
  console.log(remainingGuesses);

const checkIfWin = function (){
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the Word!!  Nice Job!</p>`;
  }
};
