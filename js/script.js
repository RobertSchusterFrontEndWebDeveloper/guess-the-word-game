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
const remainingSpan = document.querySelector(".remaining span"); 
  // Messages paragraph when letter guessed
const message = document.querySelector(".message");
  // Play again button
const playAgain = document.querySelector(".play-again");

  // Random word
let word = "magnolia";
  // Letters guessed
let guessedLetters = [];
  // number of guesses
let remainingGuesses = 8;

// Get words from text api.
const getWord = async function () {
  const request = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const data = await request.text();

  const wordArray = data.split("\n"); // Convert the list of words into a list without returns in it.

  selectRandomWord(wordArray); 

  currentWord(word);  
};

const selectRandomWord = function (wordArray) {
  const randomIndex = Math.floor(Math.floor(Math.random() * wordArray.length));  // Calculate the number of words in the array and randomly select a number from the quantity.

  const randomWordChoice = wordArray[randomIndex]; 
  word = (randomWordChoice.trim()); 
  
  currentWord(word);
}
// Start game
getWord ();

  // Setup placeholders for each letter of word to guess as "●"
const currentWord = function (word) {
  const placeHolderLetters =[];
  for (const letter of word) {
    placeHolderLetters.push("●")
  }
  wordInProgress.innerText = placeHolderLetters.join("");
};

guessLetterButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  const letterChosen = currentGuess.value;
  const goodGuess = validateGuess(letterChosen);

  if (goodGuess) {
    makeGuess(letterChosen);
  }
  currentGuess.value = "";
});

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
    return input;
  }

};

// process the guessed letter
const makeGuess = function(letterChosen) {
  letterChosen = letterChosen.toUpperCase();
  if(guessedLetters.includes(letterChosen)) {
    message.innerText = "You Guessed this letter already Silly! 😜  Try again."
  } else {
    guessedLetters.push(letterChosen);
    guessesRemaining(letterChosen);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// Function to display Letters chosen and word to guess
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
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

  // Count and monitor the number of guesses
const guessesRemaining = function (letterChosen) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(letterChosen)) {
    message.innerHTML = `Pick another letter.<span class="highlight"> "${letterChosen}"</span> is not in the word.`;
    remainingGuesses -= 1;
  } else {
    message.innerHTML = `Nice Guess!  The letter<span class="highlight"> "${letterChosen}"</span> is in the word.`;
  }

  if (remainingGuesses === 0 ){
    message.innerHTML = `No more Guesses. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else  if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses.`;
  }  
};
  
// Check to see if word has been guessed
const checkIfWin = function (){
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the Word!! 🥳  Nice Job!</p>`;
    startOver();
  }
};

const playAgainButton = document.querySelector(".play-again");

// Start over function
const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  remainingSpan.classList.add("hide");
  guessedLettersElement.classList.add("hide");

  playAgainButton.classList.remove("hide");
};

// Play again
playAgainButton.addEventListener("click", function() {
  
  message.classList.remove("win");
  guessedLetters = [];
  remainingSpan.classList.remove("hide");
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.classList.remove("hide");
  guessLetterButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  //word = "";

  getWord();
});