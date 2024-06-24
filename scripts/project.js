const words = [
    { word: "javascript", hint: "Programming Language" },
    { word: "hangman", hint: "Popular word guessing game" },
    { word: "react", hint: "front end framerwork" },
    { word: "html", hint: "Markup language" },
    { word: "browser", hint: "Used to surf the web" },
];

let selectedWord, hint, correctGuesses, incorrectGuesses = 6;
const maxErrors = 6; 

const hintElement = document.getElementById("hint");
const wordElement = document.getElementById("word");
const hangmanImage = document.getElementById("hangman-image");
const ResulthangmanImage = document.getElementById("result-hangman-image");
const resultElement = document.getElementById("result");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const playAgainButton = document.getElementById("play-again-button");
const resultContainer = document.getElementById("result-container");
const errorsElement = document.getElementById("errors");

function initGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    hint = words[randomIndex].hint;
    correctGuesses = new Set();
    incorrectGuesses = 0;

    hintElement.textContent = hint;
    wordElement.textContent = "_ ".repeat(selectedWord.length);
    hangmanImage.src = `images/hangman0.png`;
    resultElement.textContent = "";
    resultContainer.style.display = "none";
    letterInput.value = "";
    letterInput.disabled = false;
    guessButton.disabled = false;
    errorsElement.textContent = `0/${maxErrors}`;
}

function updateWordDisplay() {
    let displayWord = "";
    for (let letter of selectedWord) {
        displayWord += correctGuesses.has(letter) ? `${letter} ` : "_ ";
    }
    wordElement.textContent = displayWord.trim();
}

function checkGuess(letter) {
    if (selectedWord.includes(letter)) {
        correctGuesses.add(letter);
    } else {
        incorrectGuesses++;
        hangmanImage.src = `images/hangman${incorrectGuesses}.png`;
        errorsElement.textContent = `${incorrectGuesses}/${maxErrors}`;
    }
    updateWordDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (incorrectGuesses >= maxErrors) {
        resultContainer.style.display = "flex";
        ResulthangmanImage.src = `images/hangman6.png`
        ResulthangmanImage.style.width = "60%";
        resultElement.textContent = `You lost! The word was: ${selectedWord}`;
        endGame();
    } else if (selectedWord.split("").every(letter => correctGuesses.has(letter))) {
        resultContainer.style.display = "flex";
        ResulthangmanImage.src = `images/hangman7.png`
        ResulthangmanImage.style.width = "92%";
        resultElement.textContent = "You won!";
        endGame();
    }
}

function endGame() {
    letterInput.disabled = true;
    guessButton.disabled = true;
}

guessButton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    if (letter && /^[a-z]$/.test(letter)) {
        checkGuess(letter);
        letterInput.value = "";
    }
});

playAgainButton.addEventListener("click", initGame);

initGame();
