let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
const maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;
const cardsArray = [
  'ag',
  'assegai',
  'goteki',
  'auricom',
  'icaras',
  'piranha',
  'harimau',
  'qirex',
  'triakis',
  'ag',
  'assegai',
  'goteki',
  'auricom',
  'icaras',
  'piranha',
  'harimau',
  'qirex',
  'triakis',
];
let timeLeft;
let livesLeft;
let timer;

// const gameCards = document.getElementById("game-cards");
// const difficultyModal = document.getElementById("difficulty-modal");
// const soundModal = document.getElementById("sound-modal");
// const welcomeModal = document.getElementById("welcome-modal");
// const welcomeButton = document.getElementById("welcome-button");
// const modeModal = document.getElementById("mode-modal");
// const modeButton = document.getElementById("mode-button");
// const difficultyButton = document.getElementById("difficulty-button");
// const locationModal = document.getElementById("location-modal");
// const locationButton = document.getElementById("location-button");
// const endModal = document.getElementById("end-modal");
// const resetButton = document.getElementById("reset");
// const cheatButton = document.getElementById("cheat");
// const gamesPlayedDisplay = document.getElementById("games-played");
// const attemptsDisplay = document.getElementById("attempts");
// const matchesDisplay = document.getElementById("matches");
// const accuracyDisplay = document.getElementById("accuracy");
// const timeDisplay = document.getElementById("time");
// const difficultyModeDisplay = document.getElementById("difficulty-mode-display");

document.getElementById("sound-on-button").addEventListener('click', function () {
  sound.soundList.forEach(sound => sound.toggle());

  // playSound(flipSound);
  soundModal.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
});

document.getElementById("sound-off-button").addEventListener('click', function () {
  soundModal.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
});

// welcomeButton.addEventListener('click', function () {
//   welcomeModal.classList.add("hidden");
//   modeModal.classList.remove("hidden");
//   sound.playSound(sound.flipSound, sound.cheatSound);
// });

// modeButton.addEventListener('click', function () {
//     modeModal.classList.add("hidden");
//     modeButton.classList.add("temp-hidden");
//     difficultyModal.classList.remove("hidden");
//     sound.playSound(sound.flipSound);
// });

// difficultyButton.addEventListener('click', function() {
//   difficultyModal.classList.add("hidden");
//   difficultyButton.classList.add("temp-hidden");
//   locationModal.classList.remove("hidden");
//   sound.playSound(sound.flipSound);
// });

// locationButton.addEventListener('click', startGame);
// resetButton.addEventListener('click', resetGame);
// cheatButton.addEventListener('click', cheatCodes);

gameCards.addEventListener('click', handleClick);

// modal
const modal = new Modal();
modal.initializeModals();

const mode = modal.mode;
const difficulty = modal.difficulty;
const locations = modal.location;

// sound
const sound = new Sound();
sound.addEventListeners();

// General events

function startGame() {
  document.body.classList.add(locations.current); // add body class manipulation to startGame
  livesLeft = difficulty[difficulty.current].lives;
  timeLeft = difficulty[difficulty.current].time;

  if (mode.current === "time-attack") timer = setInterval(countdown, 100);
  else if (mode.current === "survival") timeDisplay.textContent = `Lives | ${livesLeft}`;

  difficultyModeDisplay.textContent = `${difficulty[difficulty.current].display} | ${mode[mode.current].display}`;
  // sound.playSound(sound.startSound);
  // sound.playSound(sound.flipSound);
  // locationButton.classList.add("temp-hidden");
  // locationModal.classList.add("hidden");
  shuffleCards();
  Array.prototype.forEach.call(document.getElementsByClassName('card-back'), elem => elem.addEventListener('mouseover', () => sound.hoverSound.play()));
  // addHoverSounds(); // Adds hover sounds to newly created card-back elements
}

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) return;
  sound.playSound(sound.flipSound);
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClicked.classList.add("hidden");
    firstCardClicked.previousElementSibling.classList.add("current");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClicked.classList.add("hidden");
    secondCardClicked.previousElementSibling.classList.add("current");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses == secondCardClasses) {
      sound.playSound(sound.correctSound);
      sound.playSound(document.getElementById(`${event.target.previousElementSibling.classList[0]}-voice`));
      matchesDisplay.textContent = ++matches;
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("correct");
      setTimeout(() => {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked = secondCardClicked = null;
        gameCards.classList.remove("correct");
        gameCards.addEventListener('click', handleClick);
      }, 500); //previous: 750
      if (matches === maxMatches) {
        sound.playSound(sound.endSound);
        clearInterval(timer);
        if (mode.current === "time-attack") document.getElementById("end-time-lives").textContent = `Time Remaining: ${timeLeft.toFixed(1)}`;
        else if (mode.current === "survival") document.getElementById("end-time-lives").textContent = `Lives Remaining: ${livesLeft}`;
        document.getElementById("end-message").textContent = "V I C T O R Y";
        document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
        endModal.classList.remove("hidden");
      }
    } else {
      sound.playSound(sound.incorrectSound);
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("incorrect");
      if (mode.current === "survival") {
        timeDisplay.textContent = `Lives | ${--livesLeft}`
        if (livesLeft === 0) {
          sound.playSound(sound.endSound);
          document.getElementById("end-message").textContent = "D E F E A T";
          document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
          // document.getElementById("end-time-lives").textContent = "System.lives.nullError //";
          document.getElementById("end-time-lives").textContent = `Lives Remaining: ${livesLeft}`;
          endModal.classList.remove("hidden");
        }
      }
      setTimeout(() => {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = secondCardClicked = null;
        gameCards.classList.remove("incorrect");
        gameCards.addEventListener('click', handleClick);
      }, 1000); //previous 1250
    }
  }
}

function countdown() {
  if (timeLeft <= 0) {
    // sound.playSound(sound.endSound);
    // clearInterval(timer);
    handleEnd('loss', mode.current);
    firstCardClicked = secondCardClicked = null;
    console.log('first', firstCardClicked, 'second', secondCardClicked);
    // secondCardClicked = null;
    // document.getElementById("end-message").textContent = "D E F E A T";
    // document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
    // document.getElementById("end-time-lives").textContent = "System.time.nullError //";
    // document.getElementById("end-time-lives").textContent = `Time Remaining: ${Math.abs(timeLeft).toFixed(1)}`;
    // endModal.classList.remove("hidden");
  }
  timeDisplay.textContent = `Time | ${timeLeft.toFixed(1)}`;
  timeLeft -= 0.1;
}

function shuffleCards() {
  while (gameCards.firstElementChild) gameCards.removeChild(gameCards.firstElementChild);
  const shuffleArray = [...cardsArray];
  for (let i = 0; i < cardsArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffleArray.length);
    const cardContainer = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    cardContainer.classList.add("col-2", "card");
    cardFront.classList.add(`${shuffleArray[randomIndex]}`, "card-front");
    cardBack.classList.add("card-back");
    shuffleArray.splice(randomIndex, 1); // Removes element from shuffleArray - no extra randomization
    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);
    gameCards.appendChild(cardContainer);
  }
}

function resetGame() {
  // sound.playSound(sound.resetSound, sound.flipSound);
  // sound.playSound(sound.flipSound);
  document.body.classList.remove(`${locations.current}`);
  matches = attempts = matchesDisplay.textContent = attemptsDisplay.textContent = 0;

  accuracyDisplay.textContent = "0.0%";
  // timeDisplay.textContent = "-";
  gamesPlayedDisplay.textContent = ++gamesPlayed;

  // Fixes bug in which a reset game still had red or green border glow and possibly could not click on cards
  gameCards.classList.remove('correct', 'incorrect');
  // gameCards.classList.remove("incorrect");
  gameCards.addEventListener('click', handleClick);
  //

  modal.resetModals();

  // endModal.classList.add("hidden");
  // welcomeModal.classList.remove("hidden");
}

// function cheatCodes() {
//   clearInterval(timer);
//   sound.playSound(sound.flipSound, sound.cheatSound);
  // sound.playSound(sound.cheatSound);
  // matches = attempts = matchesDisplay.textContent = attemptsDisplay.textContent = 0;
  // accuracy = accuracyDisplay.textContent = "0.0%";
  // gamesPlayedDisplay.textContent = gamesPlayed--;
//   document.getElementById("end-message").textContent = "E X O D U S";
//   document.getElementById("end-accuracy").textContent = "admin.System.bypass //";
//   document.getElementById("end-time-lives").textContent = "System.resolve //";


//   endModal.classList.remove("hidden");
// }

function handleEnd(outcome, mode) {
  clearInterval(timer);
  sound.playSound(sound.endSound);
  document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
  if (outcome === 'win') document.getElementById("end-message").textContent = "V I C T O R Y";
  if (outcome === 'loss') document.getElementById("end-message").textContent = "D E F E A T";
  if (mode === 'time-attack') document.getElementById("end-time-lives").textContent = `Time Remaining: ${Math.abs(timeLeft).toFixed(1)}`;
  if (mode === 'survival') document.getElementById("end-time-lives").textContent = `Lives Remaining: ${livesLeft}`;
  setNextView();
}

function handleCheat() {
  clearInterval(timer);
  sound.playSound(sound.flipSound, sound.cheatSound);
  document.getElementById("end-message").textContent = "E X O D U S";
  document.getElementById("end-accuracy").textContent = "admin.System.bypass //";
  document.getElementById("end-time-lives").textContent = "System.resolve //";
  setNextView();
}
// document.getElementById("end-time-lives").textContent = `Time Remaining: ${Math.abs(timeLeft).toFixed(1)}`;
// document.getElementById("end-time-lives").textContent = `Lives Remaining: ${livesLeft}`;

// function handleWin() {
//   document.getElementById("end-message").textContent = "V I C T O R Y";
//   document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
//   document.getElementById("end-time-lives").textContent = "System.lives.nullError //";
// }

// function handleLoss() {
//   document.getElementById("end-message").textContent = "D E F E A T";
//   document.getElementById("end-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;

//   document.getElementById("end-time-lives").textContent = "System.lives.nullError //";
// }
