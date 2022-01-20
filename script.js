const guessEl = document.getElementById('guess');
const keyElements = document.querySelectorAll('.key');
const errorEl = document.getElementById('error');

const guessCount = 6;
const wordleLength = 5;
const alphabetSet = new Set(alphabet);
const worldeSet = new Set(wordleWords);

let wordleWord;
let guess; // number of guesses so far
let wordIdx;
let squares;
let gameOver;

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
  //   wordleWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
  wordleWord = 'ROBOT';
  guess = 0;
  wordIdx = 0;
  squares = [];
  gameOver = false;

  guessEl
    .querySelectorAll('.row')
    .forEach((row) => squares.push(row.querySelectorAll('.square')));
}

function enterCharacter(char) {
  if (gameOver || wordIdx >= wordleLength || !isTurkishCharacter(char)) return;
  char = char.toUpperCase();

  const square = squares[guess][wordIdx++];
  square.innerText = char;
  square.classList.add('active');
}

function removeCharacter() {
  if (gameOver || wordIdx === 0) return;
  const square = squares[guess][--wordIdx];
  square.innerText = '';
  square.classList.remove('active');
}

function enterWord() {
  if (wordIdx < wordleLength) {
    showError('Not enough words!');
    return;
  }
  word = '';
  squares[guess].forEach((square) => (word += square.innerText));
  if (!worldeSet.has(word)) {
    showError(word + ' is not a word!');
  }

  checkWord(word);
  guess++;
  wordIdx = 0;
  if (word === wordleWord) {
    // correctly guessed
    showError('won!!!');
    gameOver = true;
  } else if (guess == guessCount) {
    // out of guesses, lost
    showError('lost!!!');
    gameOver = true;
  }
}

function checkWord(word) {
  const freqTable = {};
  const yellowSquares = [];
  for (let i = 0; i < wordleLength; i++) {
    const square = squares[guess][i];
    const char = word[i];
    const corr = wordleWord[i];

    freqTable[corr] = freqTable[corr] === undefined ? 1 : freqTable[corr] + 1;
    if (char === corr) {
      square.className = 'square green';
      freqTable[char] = freqTable[char] - 1;
    } else if (wordleWord.includes(char)) {
      yellowSquares.push(square); // potentially yellow or grey
    } else {
      square.className = 'square grey';
    }
  }
  yellowSquares.forEach((square) => {
    const char = square.innerText;
    if (freqTable[char] > 0) {
      freqTable[char] = freqTable[char] - 1;
      square.className = 'square yellow';
    } else {
      square.className = 'square grey';
    }
  });
}

function showError(text) {
  errorEl.innerText = text;
  errorEl.classList.remove('hidden');
  setTimeout(() => errorEl.classList.add('hidden'), 2000);
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

keyElements.forEach((key) => key.addEventListener('click', keyPressed));

function isTurkishCharacter(char) {
  return char.length === 1 && alphabetSet.has(char.toLowerCase());
}

initializeGame();
