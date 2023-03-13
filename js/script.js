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
let word = "magnolia";
  // Letters guessed
const guessedLetters = [];
  // number of guesses
let remainingGuesses = 8;

// Get words from text api.
const getWord = async function () {
  const request = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const data = await request.text();
  console.log(data);

  const wordArray = data.split("\n"); // Convert the list of words into a list without returns in it.
  console.log(wordArray);

  selectRandomWord(wordArray); // Random choice from list.

  currentWord(word);  // "currentWord" = solutions 'placeholder' 
};

// Select random word from word api.
const selectRandomWord = function (wordArray) {
  const randomIndex = Math.floor(Math.floor(Math.random() * wordArray.length));  // Calculate the number of words in the array and randomly select a number from the quantity.
  console.log(`Database is- ${wordArray.length} long.`);
  console.log(`Random index chosen is- ${randomIndex}`);
  console.log[wordArray];

  const randomWordChoice = wordArray[randomIndex]; // Select the word randomly from the index list.
  word = (randomWordChoice.trim()); // set the randomly chosen word to the word variable.
  
  console.log(`${word} - is the word chosen.`); 
  currentWord(word);
}

getWord ();



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

};

const makeGuess = function(letterChosen) {
  letterChosen = letterChosen.toUpperCase();
  if(guessedLetters.includes(letterChosen)) {
    message.innerText = "You Guessed this letter already Silly! :P  Try again."
  } else {
    guessedLetters.push(letterChosen);
    console.log(guessedLetters);
    guessesRemaining(letterChosen);
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
    message.innerHTML = `Pick another letter.<span class="highlight"> "${letterChosen}"</span> is not in the word.`;
    remainingGuesses -= 1;
  } else {
    message.innerHTML = `Nice Guess!  The letter<span class="highlight"> "${letterChosen}"</span> is in the word.`;
  }

  if (remainingGuesses === 0 ){
    message.innerHTML = `No more guesses! The word was <span class="highlight">${word}</span>.`;
    remainingSpan.innerText = `${remainingGuesses} guesses.`
  } else  if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses.`;
  }  
  console.log(remainingGuesses);
};
  

const checkIfWin = function (){
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the Word!!  Nice Job!</p>`;
  }
};
