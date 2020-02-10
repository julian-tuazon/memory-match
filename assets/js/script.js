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
let timeValue; // Is this necessary?
let timer;
let difficulty;
let gameMode;

// Code refactoring?

// let difficulty = {
//   "easy": { "time": 90, "lives": 50, "modalText": "E A S Y", "headerText": "Easy" },
//   "medium": { "time": 60, "lives": 35, "modalText": "M E D I U M", "headerText": "Medium" },
//   "hard": { "time": 30, "lives": 20, "modalText": "H A R D", "headerText": "Hard" },
// };
// let gameMode = {
//   "survival": { "modalText": "S U R V I V A L", "headerText": "Survival" },
//   "timeAttack": { "modalText": "T I M E - A T T A C K", "headerText": "Time-Attack" },
// };
// Current mode / difficulty has reference to the corresponding modal select object
// Makes that object have the selected / selected-animation classes and removes the clickable class
// Removes those classes and adds those classes to the other, non-selected modal select objects


// Choosing NieR character / difficulty

let easy = false;
let medium = false;
let hard = false;

// Currently unused functionality for switching background after each game ends

// let backgroundIndex = 1;
// const backgrounds = ["url('./assets/images/DNA.gif')", "url('./assets/images/Singleton.gif')", "url('./assets/images/Goo.gif')"];

const gameCards = document.getElementById("game-cards");
const difficultyModal = document.getElementById("difficulty-modal");
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
  let toggle = false;
  return function() {
    if (toggle) {
      playSound(onSound);
      music.play();
      toggle = false;
      musicButton.textContent = "Music | ON";
    } else {
      playSound(offSound);
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
  let toggle = false;
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
  let toggle = false;
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
    console.log("mouseenter clickable");
    // hoverSound.currentTime = 0;
    hoverSound.play();
  })
}

function addHoverSounds() {
  for (let y = 0; y < hoverableList.length; y++) {
    hoverableList[y].addEventListener('mouseover', function () {
      console.log("mouseenter clickable");
      // hoverSound.currentTime = 0;
      hoverSound.play();
    })
  }
}

gameCards.addEventListener('click', handleClick);
welcomeButton.addEventListener('click', function () {
  welcomeModal.classList.add("hidden");
  modeModal.classList.remove("hidden");
  playSound(flipSound);
  if (firstGame) {
    music.volume = 0.15;
    // music.play();
    firstGame = false;
  }
});

modeButton.addEventListener('click', function () {
  if (timeAttack || survival) {
    modeModal.classList.add("hidden");
    currentTop = "D I F F I C U L T Y";
    currentBottom = "Deploy YoRHa Unit";
    podOne.classList.remove("selected", "selected-animation");
    podOne.classList.add("clickable");
    podTwo.classList.remove("selected", "selected-animation");
    podTwo.classList.add("clickable");
    modeButton.classList.add("temp-hidden");
    difficultyModal.classList.remove("hidden");
    playSound(flipSound);
  }
});
difficultyButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cheatButton.addEventListener('click', cheatCodes);



// Mode modal object variables
let podOne = document.getElementsByClassName("pod-one")[0].parentElement;
let podTwo = document.getElementsByClassName("pod-two")[0].parentElement;
let survival = false;
let timeAttack = false;
let currentTop = "M O D E";
let currentBottom = "Deploy Pod";

// Mode modal sound effects / text changes / mode selector
podOne.addEventListener('mouseover', function () {
  document.getElementById("mode-title").textContent = "S U R V I V A L";
  document.getElementById("mode-message").textContent = "Pod X-042";
});

podOne.addEventListener('mouseleave', function () {
  document.getElementById("mode-title").textContent = `${currentTop}`;
  document.getElementById("mode-message").textContent = `${currentBottom}`;
});

podOne.addEventListener('click', function () {
  if (!survival) {
    podOne.classList.add("selected");
    podOne.classList.add("selected-animation");
    podOne.classList.remove("clickable");
    if (timeAttack) {
      podTwo.classList.remove("selected");
      podTwo.classList.add("clickable");
      timeAttack = false;
    }
    survival = true;
    currentTop = "S U R V I V A L";
    currentBottom = "Pod X-042";
    setTimeout(function () {
      podOne.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(document.getElementById("pod-one"));
    modeButton.classList.remove("temp-hidden");
  }
});

podTwo.addEventListener('mouseover', function () {
  document.getElementById("mode-title").textContent = "T I M E - A T T A C K";
  document.getElementById("mode-message").textContent = "Pod Y-153 ";
});

podTwo.addEventListener('mouseleave', function () {
  document.getElementById("mode-title").textContent = `${currentTop}`;
  document.getElementById("mode-message").textContent = `${currentBottom}`;
});

podTwo.addEventListener('click', function () {
  if (!timeAttack) {
    podTwo.classList.add("selected");
    podTwo.classList.add("selected-animation");
    podTwo.classList.remove("clickable");
    if (survival) {
      podOne.classList.remove("selected");
      podOne.classList.add("clickable");
      survival = false;
    }
    timeAttack = true;
    currentTop = "T I M E - A T T A C K";
    currentBottom = "Pod Y-153";
    setTimeout(function () {
      podTwo.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(document.getElementById("pod-two"));
    modeButton.classList.remove("temp-hidden");
  }
});

// NieR object variables
let nine_s = document.getElementsByClassName("nine-s")[0].parentElement;
let a_two = document.getElementsByClassName("a-two")[0].parentElement;
let two_b = document.getElementsByClassName("two-b")[0].parentElement;

// NieR modal sound effects / text changes / difficulty selector
nine_s.addEventListener('mouseover', function() {
  console.log('mouseover 9S');
  document.getElementById("difficulty-title").textContent = "E A S Y";
  document.getElementById("difficulty-message").textContent = "YoRHa No. 9 Type S";
});

nine_s.addEventListener('mouseleave', function () {
  console.log('mouseexit 9S');
  document.getElementById("difficulty-title").textContent = `${currentTop}`;
  document.getElementById("difficulty-message").textContent = `${currentBottom}`;
});

nine_s.addEventListener('click', function () {
  console.log('click 9S');
  if (!easy) {
    nine_s.classList.add("selected");
    nine_s.classList.add("selected-animation");
    nine_s.classList.remove("clickable");
    if (hard) {
      two_b.classList.remove("selected");
      two_b.classList.add("clickable");
      hard = false;
    }
    if (medium) {
      a_two.classList.remove("selected");
      a_two.classList.add("clickable");
      medium = false;
    }
    easy = true;
    currentBottom = "YoRHa No. 9 Type S";
    currentTop = "E A S Y";
    setTimeout(function() {
      nine_s.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(document.getElementById("9s"));
    difficultyButton.classList.remove("temp-hidden");
  }
});

a_two.addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("difficulty-message").textContent = "YoRHa Type A No. 2";
  document.getElementById("difficulty-title").textContent = "M E D I U M";
});

a_two.addEventListener('mouseleave', function () {
  console.log('mouseleave a2');
  document.getElementById("difficulty-message").textContent = `${currentBottom}`;
  document.getElementById("difficulty-title").textContent = `${currentTop}`;
});

a_two.addEventListener('click', function () {
  console.log('click A2');
  if (!medium) {
    a_two.classList.add("selected");
    a_two.classList.add("selected-animation");
    a_two.classList.remove("clickable");
    if (easy) {
      nine_s.classList.remove("selected");
      nine_s.classList.add("clickable");
      easy = false;
    }
    if (hard) {
      two_b.classList.remove("selected");
      two_b.classList.add("clickable");
      hard = false;
    }
    medium = true;
    currentBottom = "YoRHa Type A No. 2";
    currentTop = "M E D I U M";
    setTimeout(function () {
      a_two.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(document.getElementById("a2"));
    difficultyButton.classList.remove("temp-hidden");
  }
});

two_b.addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("difficulty-title").textContent = "H A R D";
  document.getElementById("difficulty-message").textContent = "YoRHa No. 2 Type B";
});

two_b.addEventListener('mouseleave', function () {
  console.log('mouseleave 2b');
  document.getElementById("difficulty-title").textContent = `${currentTop}`;
  document.getElementById("difficulty-message").textContent = `${currentBottom}`;
});

two_b.addEventListener('click', function () {
  console.log('click 2B');
  if (!hard) {
    two_b.classList.add("selected");
    two_b.classList.add("selected-animation");
    two_b.classList.remove("clickable");
    if (easy) {
      nine_s.classList.remove("selected");
      nine_s.classList.add("clickable");
      easy = false;
    }
    if (medium) {
      a_two.classList.remove("selected");
      a_two.classList.add("clickable");
      medium = false;
    }
    hard = true;
    currentBottom = "YoRHa No. 2 Type B";
    currentTop = "H A R D";
    setTimeout(function () {
      two_b.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(document.getElementById("2b"));
    difficultyButton.classList.remove("temp-hidden");
  }
});

// Location select
const locations = {
  "current": "null",
  "defaultMessage": "Select Location",
  "currentMessage": "Select Location",
  "locationList": [
    "sol-2",
    "chenghou-project",
    "vineta-k",
    "tech-de-ra",
    "metropia",
    "anulpha-pass",
  ],
  "sol-2": {
    "locationMessage": "Sol 2",
    "sound": document.getElementById("sol-2"),
  },
  "chenghou-project": {
    "locationMessage": "Chenghou Project",
    "sound": document.getElementById("chenghou-project"),
  },
  "vineta-k": {
    "locationMessage": "Vineta K",
    "sound": document.getElementById("vineta-k"),
  },
  "tech-de-ra": {
    "locationMessage": "Tech De Ra",
    "sound": document.getElementById("tech-de-ra"),
  },
  "metropia": {
    "locationMessage": "Metropia",
    "sound": document.getElementById("metropia"),
  },
  "anulpha-pass": {
    "locationMessage": "Anulpha Pass",
    "sound": document.getElementById("anulpha-pass"),
  },
};

function addEventListeners() {
  for (let i = 0; i < locations.locationList.length; i++) {
    let currentElement = document.querySelector(`.flex > .${locations.locationList[i]}`);
    currentElement.addEventListener('mouseover', handleMouseOver);
    currentElement.addEventListener('mouseleave', handleMouseLeave);
    currentElement.addEventListener('click', handleClick);
  }
  console.log("Added mouseover, mouseleave, click");
}

function handleMouseOver(event) {
  console.log(event.target.classList[0]);
  document.getElementById("location-message").textContent = locations[event.target.classList[0]].locationMessage;
}

function handleMouseLeave() {
  console.log(event.target.classList[0]);
  document.getElementById("location-message").textContent = locations.currentMessage;
}

function handleClick() {
  console.log(event.target.classList[0]);
  // let currentElement = document.querySelector(`.flex > .${event.target.classList[0]}`);
  event.target.classList.add("selected", "selected-animation");
  event.target.classList.remove("clickable");
  if (locations.current !== "null") {
    document.querySelector(`.flex > .${locations.current}`).classList.add("clickable");
    document.querySelector(`.flex > .${locations.current}`).classList.remove("selected");
  }
  locations.current = event.target.classList[0];
  locations.currentMessage = locations[current].locationMessage;
  setTimeout(function () {
    event.target.classList.remove("selected-animation");
  }, 700);
  playSound(selectSound);
  playSound(locations[current].sound);
  locationButton.classList.remove("temp-hidden");
}


// General events

function startGame() {
  // Game can only start when difficulty is selected
  if (easy) {
    livesLeft = 60;
    timeValue = 1000;
    difficulty = "Easy";
  } else if (medium) {
    livesLeft = 40;
    timeValue = 60;
    difficulty = "Medium";
  } else if (hard) {
    livesLeft = 2;
    timeValue = 10;
    difficulty = "Hard";
  }

  // Resetting classes for difficulty selector modal
  nine_s.classList.add("clickable");
  nine_s.classList.remove("selected");

  a_two.classList.add("clickable");
  a_two.classList.remove("selected");

  two_b.classList.add("clickable");
  two_b.classList.remove("selected");

  // Set initial bgm volume, start timer
  timeLeft = timeValue;
  if (timeAttack) {
    timer = setInterval(countdown, 100);
    gameMode = "Time-Attack";
  } else if (survival) {
    timeDisplay.textContent = `Lives | ${livesLeft}`;
    gameMode = "Survival";
  }
  difficultyModeDisplay.textContent = `${difficulty} | ${gameMode}`;
  playSound(startSound);
  playSound(flipSound);
  difficultyButton.classList.add("temp-hidden");
  difficultyModal.classList.add("hidden");
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
        if (timeAttack) {
          document.getElementById("final-time").textContent = `Time Remaining: ${timeLeft.toFixed(1)}`;
        } else if (survival) {
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
      if (survival) {
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
  currentTop = "M O D E";
  currentBottom = "Deploy Pod";
  easy = false;
  medium = false;
  hard = false;
  survival = false;
  timeAttack = false;
  // for (let item of modalObjects) {
  //   item.classList.add("clickable");
  //   item.classList.remove("selected", "selected-animation");
  // }
  end.classList.add("hidden");
  welcomeModal.classList.remove("hidden");
}

function countdown() {
  if (timeLeft <= 0) {
    console.log("out of time, now in ending phase", timeLeft);
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
  console.log("interval timer at 100ms; timeLeft:", timeLeft);
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
  //Old functionality for flipping flipped cards back after the win

  // let cardBacks = document.getElementsByClassName("card-back");
  // for (let i = 0; i < cardBacks.length; i++) {
  //   cardBacks[i].classList.remove("hidden");
  // }



  //Functionality for changing background:

  // backgroundIndex++;
  // console.log("backgroundIndex:", backgroundIndex);
  // console.log("backgroundIndex % length:", backgroundIndex % backgrounds.length);
  // document.body.style.backgroundImage = backgrounds[backgroundIndex % backgrounds.length];
