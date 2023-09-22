'use strict';
const diceEl = document.querySelector('img');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let Playing = true;

let SwitchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (Playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      SwitchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (Playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      Playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      document.querySelector(`.player--${activePlayer}`);
      document.classList.remove('player--active');
    } else {
      SwitchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  diceEl.classList.add('hidden');

  for (let i = 0; 2 > i; i++) {
    score[i] = 0;
    document.querySelector(`#score--${i}`).textContent = 0;

    currentScore = 0;
    document.querySelector(`#current--${i}`).textContent = 0;
    Playing = true;
  }
});
