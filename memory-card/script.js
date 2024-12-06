const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById("restart-button");

const symbols = ['😀','😅','🤣','🤣','🤣','😀','😅','🤣','🤣'];

let shuffledSymbols = symbols.sort(() => Math.random() - 0.5);

let firstcard = null;
let secondcard = null;
let lockboard = false;
let matchedpair = 0;

// Generate cards
shuffledSymbols.forEach((symbol) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${symbol}</div>
        </div>
    `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
});

function flipCard() {
    if (lockboard || this === firstcard) return;

    this.classList.add('flip');

    if (!firstcard) {
        firstcard = this;
    } else {
        secondcard = this;
        lockboard = true;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstcard.querySelector('.card-back').textContent ===
                    secondcard.querySelector('.card-back').textContent;

    if (isMatch) {
        disableCards();
        matchedpair++;
        if (matchedpair === symbols.length / 2) {
            statusText.textContent = "You win!";
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstcard.removeEventListener("click", flipCard);
    secondcard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstcard, secondcard, lockboard] = [null, null, false];
}

// Restart button functionality
restartButton.addEventListener("click", () => {
    board.innerHTML = '';
    statusText.textContent = '';
    matchedpair = 0;
    shuffledSymbols = symbols.sort(() => Math.random() - 0.5);
    shuffledSymbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
});
