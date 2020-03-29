const gameCards = document.getElementById("game-cards");
const difficultyModal = document.getElementById("difficulty-modal");
const soundModal = document.getElementById("sound-modal");
const welcomeModal = document.getElementById("welcome-modal"); // Opening modal
const welcomeButton = document.getElementById("welcome-button"); // Opening modal button to transition to mode select modal
const modeModal = document.getElementById("mode-modal"); // Mode select modal
const modeButton = document.getElementById("mode-button"); // Mode select modal button that transitions to difficulty select modal
const difficultyButton = document.getElementById("difficulty-button");
const locationModal = document.getElementById("location-modal");
const locationButton = document.getElementById("location-button");
const endModal = document.getElementById("end-modal");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");
const timeDisplay = document.getElementById("time");
const difficultyModeDisplay = document.getElementById("difficulty-mode-display");


const welcomeView = {
  view: welcomeModal,
  button: null,
  sound: () => sound.playSound(sound.flipSound)
};

const modeView = {
  view: modeModal,
  button: modeButton,
  sound: () => sound.playSound(sound.flipSound)
};

const difficultyView = {
  view: difficultyModal,
  button: difficultyButton,
  sound: () => sound.playSound(sound.flipSound)
};

const locationView = {
  view: locationModal,
  button: locationButton,
  sound: () => sound.playSound(sound.flipSound, sound.startSound)
};

const gameView = {
  view: gameCards,
  button: null,
  sound: null
  // sound: () => sound.playSound(sound.endSound)
};

const endView = {
  view: endModal,
  button: null,
  sound: () => sound.playSound(sound.flipSound, sound.resetSound)
};

const views = [welcomeView, modeView, difficultyView, locationView, gameView, endView];
let index = 0;

welcomeButton.addEventListener('click', setNextView);

modeButton.addEventListener('click', setNextView);

difficultyButton.addEventListener('click', setNextView);

locationButton.addEventListener('click', () => {
  setNextView();
  startGame();
});

resetButton.addEventListener('click', () => {
  setNextView();
  resetGame();
});

cheatButton.addEventListener('click', handleCheat);

// gameCards.addEventListener('click', handleClick);

// welcomeButton.addEventListener('click', function () {
//   welcomeModal.classList.add("hidden");
//   modeModal.classList.remove("hidden");
//   sound.playSound(sound.flipSound);
// });

// modeButton.addEventListener('click', function () {
//   modeModal.classList.add("hidden");
//   modeButton.classList.add("temp-hidden");
//   difficultyModal.classList.remove("hidden");
//   sound.playSound(sound.flipSound);
// });

// difficultyButton.addEventListener('click', function () {
//   difficultyModal.classList.add("hidden");
//   difficultyButton.classList.add("temp-hidden");
//   locationModal.classList.remove("hidden");
//   sound.playSound(sound.flipSound);
// });

// locationButton.addEventListener('click', startGame);
// resetButton.addEventListener('click', resetGame);
// cheatButton.addEventListener('click', cheatCodes);

function setNextView() {
  const current = views[index];
  index = ++index % views.length;
  const next = views[index];
  current.view.classList.add('hidden');
  if (current.button) current.button.classList.add('temp-hidden');
  next.view.classList.remove('hidden');
  if (current.sound) current.sound();
}
