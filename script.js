const guessEl = document.getElementById('guess');
const keyElements = document.querySelectorAll('.key');
const wordleWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];

const guessCount = 6;
const wordleLength = 5;

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
}

function keyPressed(e) {
  console.log(e.currentTarget.innerText.length);
}

keyElements.forEach((key) => key.addEventListener('click', keyPressed));

initializeGame();
