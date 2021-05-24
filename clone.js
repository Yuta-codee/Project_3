'use strict';

// elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
// element button
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// element player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// element player score
const currentScoreP0 = document.querySelector('#current--0');
const currentScoreP1 = document.querySelector('#current--1');

// any
diceEl.classList.add('hidden');
let flag = false;

// function reset
const reset = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
};

// rolling score
let p0, p1, scoreDice;
p0 = 0;
p1 = 0;
scoreDice = 0;

// condition
btnNew.addEventListener('click', function () {
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  let turn = Math.floor(Math.random() * 2) + 1;
  alert(`PLAYER ${turn} JALAN PERTAMA`);
  if (turn === 1) {
    player0.classList.add('player--active');
    flag = false;
  } else {
    player1.classList.add('player--active');
    flag = true;
  }
  reset();
  diceEl.classList.add('hidden');
  p0 = 0;
  p1 = 0;
  scoreDice = 0;
});

// function turn
const turn0 = () => {
  player0.classList.remove('player--active');
  player1.classList.add('player--active');
};

const turn1 = () => {
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};
//

// function add or remove hidden
const removeHidden = () => diceEl.classList.remove('hidden');
const addHidden = () => diceEl.classList.add('hidden');
//

//function winner
const winner = () => {
  if (p0 >= 100) {
    reset();
    alert('PLAYER 1 WIN');
    addHidden();
  } else if (p1 >= 100) {
    reset();
    alert('PLAYER 2 WIN');
    addHidden();
  }
};
btnRoll.addEventListener('click', function () {
  const dice = Math.floor(Math.random() * 6) + 1;
  removeHidden();
  diceEl.src = `dice-${dice}.png`;
  if (!flag) {
    1;
    if (dice == 1) {
      flag = true;
      scoreDice = 0;
      score0El.textContent = 0;
      turn0();
      addHidden();
    }
    scoreDice += dice;
    score0El.textContent = scoreDice;
  } else {
    if (dice == 1) {
      flag = false;
      scoreDice = 0;
      score1El.textContent = 0;
      turn1();
      addHidden();
    }
    scoreDice += dice;
    score1El.textContent = scoreDice;
  }
  winner();
});

btnHold.addEventListener('click', function () {
  if (!flag) {
    p0 += scoreDice;
    scoreDice = 0;
    currentScoreP0.textContent = p0;
    score0El.textContent = 0;
    flag = true;
    turn0();
    addHidden();
  } else {
    p1 += scoreDice;
    scoreDice = 0;
    currentScoreP1.textContent = p1;
    score1El.textContent = 0;
    flag = false;
    turn1();
    addHidden();
  }
  winner();
});
