let firstGame = false; // Turned music auto-start for now
let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;
let shuffleArray = [];
let timeLeft = 10;
let timer;
let difficulty;


// Currently unused functionality for switching background after each game ends

// let backgroundIndex = 1;
// const backgrounds = ["url('./assets/images/DNA.gif')", "url('./assets/images/Singleton.gif')", "url('./assets/images/Goo.gif')"];

const gameCards = document.getElementById("game-cards");
const welcome = document.getElementById("welcome");
const startButton = document.getElementById("start");
const end = document.getElementById("end");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");

gameCards.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cheatButton.addEventListener('click', cheatCodes);

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
];
var hoverableList = document.getElementsByClassName("card-back");

// Closure for the toggleMusic functionality attached to the musicButton/gamesPlayedDisplay
let toggleMusic = (function() {
  let toggle = false;
  return function() {
    if (toggle) {
      onSound.play();
      music.play();
      toggle = false;
    } else {
      offSound.play();
      music.pause();
      toggle = true;
    }
  }
})();

// Making another reference to the variable gamesPlayedDisplay to explicitly show its music button functionality
const musicButton = gamesPlayedDisplay;
musicButton.addEventListener('click', toggleMusic);

// Closure for the toggleSoundEffects functionality attached to the soundEffectsButton/attemptsDisplay
let toggleSoundEffects = (function() {
  let toggle = false;
  return function() {
    if (toggle) {
      onSound.play();
      toggle = false;
    } else {
      offSound.play();
      toggle = true;
    }
    for (let m = 0; m < soundEffectsArray.length; m++) {
      soundEffectsArray[m].muted = toggle;
    }
  }
})();

// Making another reference to the variable attemptsDisplay to explicitly show its sound effects button functionality
const soundEffectsButton = attemptsDisplay;
soundEffectsButton.addEventListener('click', toggleSoundEffects);

// Closure for the toggleVoice functionality attached to the voiceButton/matchesDisplay
let toggleVoice = (function() {
  let toggle = false;
  return function () {
    if (toggle) {
      onSound.play();
      toggle = false;
    } else {
      offSound.play();
      toggle = true;
    }
    for (let p = 0; p < voiceArray.length; p++) {
      document.getElementById(`${voiceArray[p]}`).muted = toggle;
    }
  }
})();

// Making another reference to the variable matchesDisplay to explicitly show its voice button functionality
const voiceButton = matchesDisplay;
voiceButton.addEventListener('click', toggleVoice);

// Adding hover effects to cards and other desired elements
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
    hoverSound.play();
  })
}
// Does not work
for (let y = 0; y < hoverableList.length; y++) {
  hoverableList[y].addEventListener('mouseover', function () {
    console.log("mouseenter clickable");
    hoverSound.play();
  })
}


document.getElementsByClassName("nine-s")[0].addEventListener('mouseover', function() {
  console.log('mouseover 9S');
  document.getElementById("welcome-message2").textContent = "YoRHa No. 9 Type S";
  document.getElementById("welcome-message").textContent = "E A S Y";
  hoverSound.play();
});

document.getElementsByClassName("nine-s")[0].addEventListener('mouseleave', function () {
  console.log('mouseexit 9S');
  document.getElementById("welcome-message2").textContent = "//";
  document.getElementById("welcome-message").textContent = "m e m o r y . e x e";
});

document.getElementsByClassName("nine-s")[0].addEventListener('click', function () {
  console.log('click 9S');

  hoverSound.play();
});

document.getElementsByClassName("a-two")[0].addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("welcome-message2").textContent = "YoRHa No. 2 Type A";
  document.getElementById("welcome-message").textContent = "M E D I U M";
  hoverSound.play();
});

document.getElementsByClassName("a-two")[0].addEventListener('mouseleave', function () {
  console.log('mouseleave a2');
  document.getElementById("welcome-message2").textContent = "//";
  document.getElementById("welcome-message").textContent = "m e m o r y . e x e";
});

document.getElementsByClassName("two-b")[0].addEventListener('mouseover', function () {
  console.log('mouseover 9S');
  document.getElementById("welcome-message2").textContent = "YoRHa No. 2 Type B";
  document.getElementById("welcome-message").textContent = "H A R D";
  hoverSound.play();
});

document.getElementsByClassName("two-b")[0].addEventListener('mouseleave', function () {
  console.log('mouseleave 2b');
  document.getElementById("welcome-message2").textContent = "//";
  document.getElementById("welcome-message").textContent = "m e m o r y . e x e";
});


// General events

function startGame() {
  if (firstGame) {
    music.play();
    firstGame = false;
  }
  startSound.play();
  welcome.classList.add("hidden");
  shuffleCards();
}

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    flipSound.play();
    firstCardClicked = event.target;
    firstCardClicked.className += " hidden";
    firstCardClicked.previousElementSibling.classList.add("current");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    console.log("firstCardClasses", firstCardClasses);
  } else {
    flipSound.play();
    secondCardClicked = event.target;
    secondCardClicked.className += " hidden";
    secondCardClicked.previousElementSibling.classList.add("current");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses == secondCardClasses) {
      correctSound.play();
      // Gets the logo name of card class and plays audio element with associated id
      // let endIndex = secondCardClasses.indexOf("-");
      let logoName = secondCardClasses.slice(11, secondCardClasses.indexOf("-logo"));
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
      }, 100); //previous: 750
      if (matches === maxMatches) {
        endSound.play();
        document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
        end.classList.remove("hidden");
        welcome.classList.remove("hidden");
      }
    } else {
      incorrectSound.play();
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("incorrect");
      setTimeout(function() {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.classList.remove("incorrect");
        gameCards.addEventListener('click', handleClick);
      }, 100); //previous 1250
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
  resetSound.play();
  matches = 0;
  attempts = 0;
  accuracy = 0;
  matchesDisplay.textContent = matches;
  attemptsDisplay.textContent = attempts;
  accuracyDisplay.textContent = accuracy;
  gamesPlayedDisplay.textContent = ++gamesPlayed;
  shuffleCards();
  end.classList.add("hidden");
}

function countdown() {
  if (timeLeft <= 0) {
    document.getElementById("end-message").textContent = "Defeat! ごめんなさい!";
    end.classList.remove("hidden");
    welcome.classList.remove("hidden");
  }
  timeLeft -= 0.1;
}

function cheatCodes() {
  cheatSound.play();
  matches = 0;
  attempts = 0;
  accuracy = 0;
  gamesPlayed = -1;
  matchesDisplay.textContent = matches;
  attemptsDisplay.textContent = attempts;
  gamesPlayedDisplay.textContent = gamesPlayed;
  accuracyDisplay.textContent = accuracy;
  document.getElementById("final-accuracy").textContent = "Hax, bruh";
  end.classList.remove("hidden");
  welcome.classList.remove("hidden");
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
