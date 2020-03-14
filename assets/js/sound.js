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

const musicButton = document.getElementById("music-toggle");
const soundEffectsButton = document.getElementById("sound-toggle");
const voiceButton = document.getElementById("voice-toggle");

const musicArray = [music];

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
  "ag-voice",
  "assegai-voice",
  "goteki-voice",
  "auricom-voice",
  "icaras-voice",
  "piranha-voice",
  "harimau-voice",
  "qirex-voice",
  "triakis-voice",
  "easy-voice",
  "medium-voice",
  "hard-voice",
  "survival-voice",
  "time-attack-voice",
  "sol-2-voice",
  "moa-therma-voice",
  "vineta-k-voice",
  "tech-de-ra-voice",
  "metropia-voice",
  "anulpha-pass-voice",
];

const toggleMusic = (function () {
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

const toggleSoundEffects = (function () {
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

const toggleVoice = (function () {
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

musicButton.addEventListener('click', toggleMusic);
soundEffectsButton.addEventListener('click', toggleSoundEffects);
voiceButton.addEventListener('click', toggleVoice);
Array.prototype.forEach.call(document.getElementsByClassName('clickable'), elem => elem.addEventListener('mouseover', () => hoverSound.play()));

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
