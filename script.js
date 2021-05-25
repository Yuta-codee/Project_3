'use strict';

// element player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
// element button
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// element player score
const currentScoreP0 = document.querySelector('#current--0');
const currentScoreP1 = document.querySelector('#current--1');

// class (turn, score, add, remove, giliran)
let score = [0, 0];
let turn = 0;
let roll = 0;
const activePlayer0 = () => {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
const activePlayer1 = () => {
  player1.classList.add('player--active');
  player0.classList.remove('player--active');
};
const giliran = () => {
  turn == 0 ? (turn = 1) : (turn = 0);
  turn == 0 ? activePlayer0() : activePlayer1();
};

// function reset
const reset = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
};

// function winner
const winner = turn => {
  if (score[turn] >= 100) {
    alert(`PLAYER ${turn + 1} MENANG`);
    reset();
    roll = 0;
    score = [0, 0];
  }
};

// btn new game
btnNew.addEventListener('click', function () {
  reset();
  diceEl.classList.add('hidden');
  let firstTurn = Math.floor(Math.random() * 2) + 1;
  if (firstTurn === 1) {
    turn = 0;
    activePlayer0();
  } else {
    turn = 1;
    activePlayer1();
  }
  alert(`PLAYER ${firstTurn} JALAN PERTAMA`);
});

// btn roll
btnRoll.addEventListener('click', function () {
  diceEl.classList.remove('hidden');
  let dice = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    roll += dice;
    document.querySelector(`#score--${turn}`).textContent = roll;
  } else {
    document.querySelector(`#score--${turn}`).textContent = 0;
    roll = 0;
    giliran();
    diceEl.classList.add('hidden');
  }
});

// btn hold
btnHold.addEventListener('click', function () {
  score[turn] += roll;
  document.querySelector(`#current--${turn}`).textContent = score[turn];
  document.querySelector(`#score--${turn}`).textContent = 0;
  roll = 0;
  winner(turn);
  diceEl.classList.add('hidden');
  giliran();
});
