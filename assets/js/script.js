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
let difficulty; //Is this necessary?

// Choosing NieR character / difficulty

let easy = false;
let medium = false;
let hard = false;

// Currently unused functionality for switching background after each game ends

// let backgroundIndex = 1;
// const backgrounds = ["url('./assets/images/DNA.gif')", "url('./assets/images/Singleton.gif')", "url('./assets/images/Goo.gif')"];

const gameCards = document.getElementById("game-cards");
const welcome = document.getElementById("welcome");
const begin = document.getElementById("begin"); // Opening modal
const beginButton = document.getElementById("begin-button"); // Opening modal button to transition to mode select modal
const mode = document.getElementById("mode"); // Mode select modal
const modeButton = document.getElementById("mode-button"); // Mode select modal button that transitions to difficulty select modal
const startButton = document.getElementById("start");
const end = document.getElementById("end");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");
const timeDisplay = document.getElementById("time");

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
      onSound.currentTime = 0;
      onSound.play();
      music.play();
      toggle = false;
      musicButton.textContent = "Music | ON";
    } else {
      offSound.currentTime = 0;
      offSound.play();
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
      onSound.currentTime = 0;
      onSound.play();
      toggle = false;
      soundEffectsButton.textContent = "SFX | ON";
    } else {
      // Current bug - offSound will not play because sounds will be muted
      offSound.currentTime = 0;
      offSound.play();
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
      onSound.currentTime = 0;
      onSound.play();
      toggle = false;
      voiceButton.textContent = "Voice | ON";
    } else {
      offSound.currentTime = 0;
      offSound.play();
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

// Adding hover effects to cards and other desired elements
// WORK IN PROGRESS - clean code and render functional hover sounds for cards


// let toggleHover = (function() {
//   let toggle = false;
//   for (let i = 0; i < hoverableList.length; i++) {
//     hoverableList[i].addEventListener('mouseenter', function(){
//       hoverSound.play();
//     });
//   }
//   return function () {
//     if (toggle) {
//       onSound.play();
//       toggle = false;
//     } else {
//       offSound.play();
//       toggle = true;
//     }
//     hoverSound.muted = toggle;
//   }
// })();

// for (let i = 0; i < hoverableList.length; i++) {
//   hoverableList[i].addEventListener('mouseenter', function () {
//     hoverSound.play();
//   })
// }

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

// Event listeners

gameCards.addEventListener('click', handleClick);
beginButton.addEventListener('click', function () {
  begin.classList.add("hidden");
  mode.classList.remove("hidden");
  flipSound.currentTime = 0;
  flipSound.play();
});
modeButton.addEventListener('click', function () {
  if (timeAttack || survival) {
    mode.classList.add("hidden");
    currentTop = "m e m o r y . e x e";
    currentBottom = "Select Difficulty";
    podOne.classList.remove("selected", "selected-animation");
    podOne.classList.add("clickable");
    podTwo.classList.remove("selected", "selected-animation");
    podTwo.classList.add("clickable");
    modeButton.classList.add("temp-hidden");
    welcome.classList.remove("hidden");
    flipSound.currentTime = 0;
    flipSound.play();
  }
});
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cheatButton.addEventListener('click', cheatCodes);



// Mode modal object variables
let podOne = document.getElementsByClassName("pod-one")[0].parentElement;
let podTwo = document.getElementsByClassName("pod-two")[0].parentElement;
let survival = false;
let timeAttack = false;
let currentTop = "m e m o r y . e x e";
let currentBottom = "Select Mode";

// Mode modal sound effects / text changes / mode selector
podOne.addEventListener('mouseover', function () {
  document.getElementById("mode-message").textContent = "S U R V I V A L";
  document.getElementById("mode-message-two").textContent = "Pod X-042";
  // hoverSound.currentTime = 0;
  // hoverSound.play();
});

podOne.addEventListener('mouseleave', function () {
  document.getElementById("mode-message").textContent = `${currentTop}`;
  document.getElementById("mode-message-two").textContent = `${currentBottom}`;
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
    selectSound.currentTime = 0;
    selectSound.play();
    document.getElementById("pod-one").currentTime = 0;
    document.getElementById("pod-one").play();
    modeButton.classList.remove("temp-hidden");
  }
});

podTwo.addEventListener('mouseover', function () {
  document.getElementById("mode-message").textContent = "T I M E - A T T A C K";
  document.getElementById("mode-message-two").textContent = "Pod Y-153 ";
});

podTwo.addEventListener('mouseleave', function () {
  document.getElementById("mode-message").textContent = `${currentTop}`;
  document.getElementById("mode-message-two").textContent = `${currentBottom}`;
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
    selectSound.currentTime = 0;
    selectSound.play();
    document.getElementById("pod-two").currentTime = 0;
    document.getElementById("pod-two").play();
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
  document.getElementById("welcome-message2").textContent = "YoRHa No. 9 Type S";
  document.getElementById("welcome-message").textContent = "E A S Y";
});

nine_s.addEventListener('mouseleave', function () {
  console.log('mouseexit 9S');
  document.getElementById("welcome-message2").textContent = `${currentBottom}`;
  document.getElementById("welcome-message").textContent = `${currentTop}`;
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
    selectSound.currentTime = 0;
    selectSound.play();
    document.getElementById("9s").currentTime = 0;
    document.getElementById("9s").play();
    startButton.classList.remove("temp-hidden");
  }
});

a_two.addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("welcome-message2").textContent = "YoRHa Type A No. 2";
  document.getElementById("welcome-message").textContent = "M E D I U M";
});

a_two.addEventListener('mouseleave', function () {
  console.log('mouseleave a2');
  document.getElementById("welcome-message2").textContent = `${currentBottom}`;
  document.getElementById("welcome-message").textContent = `${currentTop}`;
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
    selectSound.currentTime = 0;
    selectSound.play();
    document.getElementById("a2").currentTime = 0;
    document.getElementById("a2").play();
    startButton.classList.remove("temp-hidden");
  }
});

two_b.addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("welcome-message2").textContent = "YoRHa No. 2 Type B";
  document.getElementById("welcome-message").textContent = "H A R D";
});

two_b.addEventListener('mouseleave', function () {
  console.log('mouseleave 2b');
  document.getElementById("welcome-message2").textContent = `${currentBottom}`;
  document.getElementById("welcome-message").textContent = `${currentTop}`;
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
    selectSound.currentTime = 0;
    selectSound.play();
    document.getElementById("2b").currentTime = 0;
    document.getElementById("2b").play();
    startButton.classList.remove("temp-hidden");
  }
});

// General events

function startGame() {
  // Game can only start when difficulty is selected
  if (easy || medium || hard) {
    if (firstGame) {
      music.play();
      firstGame = false;
    }
    if (easy) {
      livesLeft = 60;
      timeValue = 1000;
    } else if (medium) {
      livesLeft = 40;
      timeValue = 60;
    } else if (hard) {
      livesLeft = 2;
      timeValue = 10;
    }

    // Resetting classes for difficulty selector modal
    nine_s.classList.add("clickable");
    nine_s.classList.remove("selected");

    a_two.classList.add("clickable");
    a_two.classList.remove("selected");

    two_b.classList.add("clickable");
    two_b.classList.remove("selected");

    // Set initial bgm volume, start timer
    music.volume = 0.15;
    timeLeft = timeValue;
    if (timeAttack) {
      timer = setInterval(countdown, 100);
    } else if (survival) {
      timeDisplay.textContent = `Lives | ${livesLeft}`;
    }
    startSound.currentTime = 0;
    startSound.play();
    flipSound.currentTime = 0;
    flipSound.play();
    startButton.classList.add("temp-hidden");
    welcome.classList.add("hidden");
    shuffleCards();
    addHoverSounds();
  }
}

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    flipSound.currentTime = 0;
    flipSound.play();
    firstCardClicked = event.target;
    firstCardClicked.className += " hidden";
    firstCardClicked.previousElementSibling.classList.add("current");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    console.log("firstCardClasses", firstCardClasses);
  } else {
    flipSound.currentTime = 0;
    flipSound.play();
    secondCardClicked = event.target;
    secondCardClicked.className += " hidden";
    secondCardClicked.previousElementSibling.classList.add("current");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses == secondCardClasses) {
      correctSound.currentTime = 0;
      correctSound.play();
      // Gets the logo name of card class and plays audio element with associated id
      // let endIndex = secondCardClasses.indexOf("-");
      let logoName = secondCardClasses.slice(11, secondCardClasses.indexOf("-logo"));
      document.getElementById(`${logoName}`).currentTime = 0;
      document.getElementById(`${logoName}`).play();
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
        endSound.currentTime = 0;
        endSound.play();
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
      incorrectSound.currentTime = 0;
      incorrectSound.play();
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("incorrect");
      if (survival) {
        livesLeft--;
        timeDisplay.textContent = `Lives | ${livesLeft}`
        if (livesLeft === 0) {
          endSound.currentTime = 0;
          endSound.play();
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
  resetSound.currentTime = 0;
  resetSound.play();
  flipSound.currentTime = 0;
  flipSound.play();
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
  currentTop = "m e m o r y . e x e";
  currentBottom = "Select Mode";
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
  begin.classList.remove("hidden");
}

function countdown() {
  if (timeLeft <= 0) {
    console.log("out of time, now in ending phase", timeLeft);
    endSound.play();
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
  flipSound.play();
  cheatSound.play();
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
