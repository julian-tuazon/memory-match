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
let toggleMusic = (function () {
  let toggle = true;
  return function () {
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
let toggleSoundEffects = (function () {
  let toggle = true;
  return function () {
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
let toggleVoice = (function () {
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
  clickableList[x].addEventListener('mouseover', function () {
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

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
