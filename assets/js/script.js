let firstGame = true;
let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;
let shuffleArray = [];
let timeLeft;
let livesLeft;
let timer;

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
const end = document.getElementById("end");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");
const timeDisplay = document.getElementById("time");
const difficultyModeDisplay = document.getElementById("difficulty-mode-display");

// Audio functionality

// Assigning variables to the audio HTML elements
const music = document.getElementById("bgm");
const startSound = document.getElementById("start-sound");
const endSound = document.getElementById("end-sound");
const flipSound = document.getElementById("flip-sound");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const onSound = document.getElementById("on-sound");
const offSound = document.getElementById("off-sound");
const resetSound = document.getElementById("reset-sound");
const cheatSound = document.getElementById("cheat-sound");
const hoverSound = document.getElementById("hover-sound");
const selectSound = document.getElementById("select-sound");
const soundEffectsArray = [
  startSound,
  endSound,
  flipSound,
  correctSound,
  incorrectSound,
  onSound,
  offSound,
  resetSound,
  cheatSound,
  hoverSound,
  selectSound,
];
const voiceArray = [
  "ag",
  "assegai",
  "goteki",
  "auricom",
  "icaras",
  "piranha",
  "harimau",
  "qirex",
  "triakis",
  "2b",
  "9s",
  "a2",
  "pod-one",
  "pod-two",
  "sol-2",
  "moa-therma",
  "vineta-k",
  "tech-de-ra",
  "metropia",
  "anulpha-pass",
];
// const modalObjects = [
//   podOne,
//   podTwo,
//   nine_s,
//   a_two,
//   two_b,
// ];
let hoverableList = document.getElementsByClassName("card-back");

// Closure for the toggleMusic functionality attached to the musicButton
let toggleMusic = (function() {
  let toggle = true;
  return function() {
    if (toggle) {
      playSound(onSound);
      music.volume = 0.1;
      music.muted = false;
      music.play();
      toggle = false;
      musicButton.textContent = "Music | ON";
    } else {
      playSound(offSound);
      music.muted = true;
      music.pause();
      toggle = true;
      musicButton.textContent = "Music | OFF";
    }
  }
})();

// Making music toggle button
const musicButton = document.getElementById("music-toggle");
musicButton.addEventListener('click', toggleMusic);

// Closure for the toggleSoundEffects functionality attached to the soundEffectsButton
let toggleSoundEffects = (function() {
  let toggle = true;
  return function() {
    if (toggle) {
      playSound(onSound);
      toggle = false;
      soundEffectsButton.textContent = "SFX | ON";
    } else {
      // Current bug - offSound will not play because sounds will be muted
      playSound(offSound);
      toggle = true;
      soundEffectsButton.textContent = "SFX | OFF";
    }
    for (let m = 0; m < soundEffectsArray.length; m++) {
      soundEffectsArray[m].muted = toggle;
    }
  }
})();

// Making sound effects button
const soundEffectsButton = document.getElementById("sound-toggle");
soundEffectsButton.addEventListener('click', toggleSoundEffects);

// Closure for the toggleVoice functionality attached to the voiceButton
let toggleVoice = (function() {
  let toggle = true;
  return function () {
    if (toggle) {
      playSound(onSound);
      toggle = false;
      voiceButton.textContent = "Voice | ON";
    } else {
      playSound(offSound);
      toggle = true;
      voiceButton.textContent = "Voice | OFF";
    }
    for (let p = 0; p < voiceArray.length; p++) {
      document.getElementById(`${voiceArray[p]}`).muted = toggle;
    }
  }
})();

// Making voice button
const voiceButton = document.getElementById("voice-toggle");
voiceButton.addEventListener('click', toggleVoice);

// Event listeners

var clickableList = document.getElementsByClassName("clickable");
for (let x = 0; x < clickableList.length; x++) {
  clickableList[x].addEventListener('mouseover', function() {
    hoverSound.play();
  })
}

function addHoverSounds() {
  for (let y = 0; y < hoverableList.length; y++) {
    hoverableList[y].addEventListener('mouseover', function () {
      hoverSound.play();
    })
  }
}

gameCards.addEventListener('click', handleClick);
welcomeButton.addEventListener('click', function () {
  welcomeModal.classList.add("hidden");
  modeModal.classList.remove("hidden");
  playSound(flipSound);
});

modeButton.addEventListener('click', function () {
    modeModal.classList.add("hidden");
    modeButton.classList.add("temp-hidden");
    difficultyModal.classList.remove("hidden");
    playSound(flipSound);
});

difficultyButton.addEventListener('click', function() {
  difficultyModal.classList.add("hidden");
  difficultyButton.classList.add("temp-hidden");
  locationModal.classList.remove("hidden");
  playSound(flipSound);
});

locationButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cheatButton.addEventListener('click', cheatCodes);

const modal = new Modal();
modal.initializeModal();


let mode = modal.mode;
let difficulty = modal.difficulty;
let locations = modal.location;

// General events

document.getElementById("sound-on-button").addEventListener('click', function () {
  toggleMusic();
  toggleVoice();
  toggleSoundEffects();
  // playSound(flipSound);
  soundModal.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
});

document.getElementById("sound-off-button").addEventListener('click', function () {
  soundModal.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
});

function startGame() {
  document.body.classList.add(locations.current); // add body class manipulation to startGame
  livesLeft = difficulty[difficulty.current].lives;
  timeLeft = difficulty[difficulty.current].time;

  if (mode.current === "time-attack") {
    timer = setInterval(countdown, 100);
  } else if (mode.current === "survival") {
    timeDisplay.textContent = `Lives | ${livesLeft}`;
  }
  difficultyModeDisplay.textContent = `${difficulty[difficulty.current].display} | ${mode[mode.current].display}`;
  playSound(startSound);
  playSound(flipSound);
  locationButton.classList.add("temp-hidden");
  locationModal.classList.add("hidden");
  shuffleCards();
  addHoverSounds(); // Adds hover sounds to newly created card-back elements
}

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    playSound(flipSound);
    firstCardClicked = event.target;
    firstCardClicked.className += " hidden";
    firstCardClicked.previousElementSibling.classList.add("current");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    console.log("firstCardClasses", firstCardClasses);
  } else {
    playSound(flipSound);
    secondCardClicked = event.target;
    secondCardClicked.className += " hidden";
    secondCardClicked.previousElementSibling.classList.add("current");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses == secondCardClasses) {
      playSound(correctSound);
      // Gets the logo name of card class and plays audio element with associated id
      // let endIndex = secondCardClasses.indexOf("-");
      let logoName = secondCardClasses.slice(11, secondCardClasses.indexOf("-logo"));
      playSound(document.getElementById(`${logoName}`));
      //
      matchesDisplay.textContent = ++matches;
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("correct");
      setTimeout(function() {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.classList.remove("correct");
        gameCards.addEventListener('click', handleClick);
      }, 500); //previous: 750
      if (matches === maxMatches) {
        playSound(endSound);
        clearInterval(timer);
        if (mode.current === "time-attack") {
          document.getElementById("final-time").textContent = `Time Remaining: ${timeLeft.toFixed(1)}`;
        } else if (mode.current === "survival") {
          document.getElementById("final-time").textContent = `Lives Remaining: ${livesLeft}`;
        }
        document.getElementById("end-message").textContent = "V I C T O R Y";
        document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
        end.classList.remove("hidden");
      }
    } else {
      playSound(incorrectSound);
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("incorrect");
      if (mode.current === "survival") {
        livesLeft--;
        timeDisplay.textContent = `Lives | ${livesLeft}`
        if (livesLeft === 0) {
          playSound(endSound);
          document.getElementById("end-message").textContent = "D E F E A T";
          document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
          document.getElementById("final-time").textContent = "System.lives.nullError //";
          end.classList.remove("hidden");
        }
      }
      setTimeout(function() {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.classList.remove("incorrect");
        gameCards.addEventListener('click', handleClick);
      }, 1000); //previous 1250
    }
  }
}

function shuffleCards() {
  // Can use appendChild to sort on the DOM?
  while (gameCards.firstElementChild) {
    shuffleArray.push(gameCards.firstElementChild.firstElementChild.classList[1]);
    gameCards.removeChild(gameCards.firstElementChild);
  }
  let counter = shuffleArray.length;
  for (let k = 0; k < counter; k++) {
    let randomIndex = Math.floor(Math.random() * shuffleArray.length);
    let cardChild = document.createElement("div");
    let frontChild = document.createElement("div");
    let backChild = document.createElement("div");
    cardChild.classList.add("col-2", "card");
    frontChild.classList.add("card-front", `${shuffleArray[randomIndex]}`);
    backChild.classList.add("card-back");
    shuffleArray.splice(randomIndex, 1); // Removes element from shuffleArray - no extra randomization
    cardChild.appendChild(frontChild);
    cardChild.appendChild(backChild);
    gameCards.appendChild(cardChild);
  }
}

function resetGame() {
  playSound(resetSound);
  playSound(flipSound);
  matches = 0;
  attempts = 0;
  timeLeft = 0;
  livesLeft = 0;
  matchesDisplay.textContent = matches;
  attemptsDisplay.textContent = attempts;
  accuracyDisplay.textContent = "0.0%";
  timeDisplay.textContent = "-";
  gamesPlayedDisplay.textContent = ++gamesPlayed;

  // Fixes bug in which a reset game still had red or green border glow and possibly could not click on cards
  gameCards.classList.remove("correct");
  gameCards.classList.remove("incorrect");
  gameCards.addEventListener('click', handleClick);
  //
  shuffleCards();
  // Resets our selected character/difficulty/modal text
  // document.getElementsByClassName("selected")[0].classList.remove("selected");
  // currentTop = "M O D E";
  // currentBottom = "Deploy Pod";
  // easy = false;
  // medium = false;
  // hard = false;
  // survival = false;
  // timeAttack = false;
  // for (let item of modalObjects) {
  //   item.classList.add("clickable");
  //   item.classList.remove("selected", "selected-animation");
  // }

  // Resets modal text:
  document.getElementById("mode-title").textContent = mode.defaultTitle;
  document.getElementById("mode-message").textContent = mode.defaultMessage;
  document.getElementById("difficulty-title").textContent = difficulty.defaultTitle;
  document.getElementById("difficulty-message").textContent = difficulty.defaultMessage;
  document.getElementById("location-message").textContent = locations.defaultMessage;

  // Resetting mode object
  mode.currentTitle = mode.defaultTitle;
  mode.currentMessage = mode.defaultMessage;
  document.getElementById(`${mode.current}`).classList.add("clickable");
  document.getElementById(`${mode.current}`).classList.remove("selected", "selected-animation");
  mode.current = "null";

  // Resetting difficulty object
  difficulty.currentTitle = difficulty.defaultTitle;
  difficulty.currentMessage = difficulty.defaultMessage;
  document.getElementById(`${difficulty.current}`).classList.add("clickable");
  document.getElementById(`${difficulty.current}`).classList.remove("selected", "selected-animation");
  difficulty.current = "null";


  // Resetting locations object
  locations.currentMessage = locations.defaultMessage;
  document.body.classList.remove(`${locations.current}`);
  document.querySelector(`.flex > .${locations.current}`).classList.add("clickable");
  document.querySelector(`.flex > .${locations.current}`).classList.remove("selected", "selected-animation");
  locations.current = "null";

  // Unhide welcome and hide end modals

  end.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
}

function countdown() {
  if (timeLeft <= 0) {
    playSound(endSound);
    clearInterval(timer);
    firstCardClicked = null;
    secondCardClicked = null;
    document.getElementById("end-message").textContent = "D E F E A T";
    document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
    document.getElementById("final-time").textContent = "System.time.nullError //";
    end.classList.remove("hidden");
  }
  timeDisplay.textContent = `Time | ${timeLeft.toFixed(1)}`;
  timeLeft -= 0.1;
}

function cheatCodes() {
  clearInterval(timer);
  playSound(flipSound);
  playSound(cheatSound);
  matches = 0;
  attempts = 0;
  accuracy = "0.0%";
  gamesPlayed = -1;
  matchesDisplay.textContent = matches;
  attemptsDisplay.textContent = attempts;
  gamesPlayedDisplay.textContent = gamesPlayed;
  accuracyDisplay.textContent = accuracy;
  document.getElementById("end-message").textContent = "E X O D U S";
  document.getElementById("final-accuracy").textContent = "admin.System.bypass //";
  document.getElementById("final-time").textContent = "System.resolve //";
  end.classList.remove("hidden");
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
