const guessEl = document.getElementById('guess');
const keyElements = document.querySelectorAll('.key');
const errorEl = document.getElementById('error');

const guessCount = 6;
const wordleLength = 5;

let wordleWord;
let guess; // number of guesses so far
let wordIdx;
let squares;

function initializeGame() {
  for (let i = 0; i < guessCount; i++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    for (let j = 0; j < wordleLength; j++) {
      const squareEl = document.createElement('div');
      squareEl.className = 'square';
      rowEl.appendChild(squareEl);
    }
    guessEl.appendChild(rowEl);
  }

  startGame();
}

function startGame() {
  wordleWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
  guess = 0;
  wordIdx = 0;
  squares = [];

  guessEl
    .querySelectorAll('.row')
    .forEach((row) => squares.push(row.querySelectorAll('.square')));
}

function enterCharacter(char) {
  if (!isTurkishCharacter(char) || wordIdx >= wordleLength) return;
  char = char.toUpperCase();

  const square = squares[guess][wordIdx++];
  square.innerText = char;
  square.classList.add('active');
}

function removeCharacter() {
  const square = squares[guess][--wordIdx];
  square.innerText = '';
  square.classList.remove('active');
}

function keyPressed(e) {
  let text = e.currentTarget.innerText;
  if (text.length === 5) {
    enterWord();
  } else if (text.length === 0) {
    removeCharacter();
  } else {
    enterCharacter(text);
  }
}

function enterWord() {
  if (wordIdx < wordleLength) {
    showError('Not enough words!');
    return;
  }
}

function showError(text) {
  errorEl.innerText = text;
  errorEl.classList.remove('hidden');
  setTimeout(() => errorEl.classList.add('hidden'), 2000);
}

keyElements.forEach((key) => key.addEventListener('click', keyPressed));

function isTurkishCharacter(char) {
  return char.length === 1 && alphabet.includes(char.toLowerCase());
}

initializeGame();
