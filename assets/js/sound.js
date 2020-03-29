const gameMusic = document.getElementById("bgm");
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

const musicArray = [gameMusic];

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
  document.getElementById("ag-voice"),
  document.getElementById("assegai-voice"),
  document.getElementById("goteki-voice"),
  document.getElementById("auricom-voice"),
  document.getElementById("icaras-voice"),
  document.getElementById("piranha-voice"),
  document.getElementById("harimau-voice"),
  document.getElementById("qirex-voice"),
  document.getElementById("triakis-voice"),
  document.getElementById("easy-voice"),
  document.getElementById("medium-voice"),
  document.getElementById("hard-voice"),
  document.getElementById("survival-voice"),
  document.getElementById("time-attack-voice"),
  document.getElementById("sol-2-voice"),
  document.getElementById("moa-therma-voice"),
  document.getElementById("vineta-k-voice"),
  document.getElementById("tech-de-ra-voice"),
  document.getElementById("metropia-voice"),
  document.getElementById("anulpha-pass-voice"),
];

const music = {
  name: 'Music',
  button: musicButton,
  itemList: musicArray,
};

const soundEffects = {
  name: 'SFX',
  button: soundEffectsButton,
  itemList: soundEffectsArray,
};

const voice = {
  name: 'Voice',
  button: voiceButton,
  itemList: voiceArray,
};

const soundList = [music, soundEffects, voice];
soundList.forEach(sound => {
  sound.toggle = toggleSound(sound);
  sound.button.addEventListener('click', sound.toggle);
});
Array.prototype.forEach.call(document.getElementsByClassName('clickable'), elem => elem.addEventListener('mouseover', () => hoverSound.play()));

function toggleSound(sound) {
  console.log('tog sound', sound);
  let toggle = true;
  return function () {
    toggle ? playSound(onSound) : playSound(offSound);
    toggle ? sound.button.textContent = `${sound.name} | ON` : sound.button.textContent = `${sound.name} | OFF`;
    if (sound.name === 'Music') toggle ? gameMusic.play() : gameMusic.pause();
    toggle = !toggle;
    sound.itemList.forEach(sound => sound.muted = toggle);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

// const toggle = {
//   music: toggleSound(music),
//   soundEffects: toggleSound(soundEffects),
//   voice: toggleSound(voice),
// };

// const toggleMusic = toggleSound(music);
// const toggleSoundEffects = toggleSound(soundEffects);
// const toggleVoice = toggleSound(voice);


// const voiceArray = [
//   "ag-voice",
//   "assegai-voice",
//   "goteki-voice",
//   "auricom-voice",
//   "icaras-voice",
//   "piranha-voice",
//   "harimau-voice",
//   "qirex-voice",
//   "triakis-voice",
//   "easy-voice",
//   "medium-voice",
//   "hard-voice",
//   "survival-voice",
//   "time-attack-voice",
//   "sol-2-voice",
//   "moa-therma-voice",
//   "vineta-k-voice",
//   "tech-de-ra-voice",
//   "metropia-voice",
//   "anulpha-pass-voice",
// ];

// const toggleMusic = (function () {
//   let toggle = true;
//   return function () {
//     if (toggle) {
//       playSound(onSound);
//       music.volume = 0.1;
//       music.muted = false;
//       music.play();
//       toggle = false;
//       musicButton.textContent = "Music | ON";
//     } else {
//       playSound(offSound);
//       music.muted = true;
//       music.pause();
//       toggle = true;
//       musicButton.textContent = "Music | OFF";
//     }
//   }
// })();

// Current bug - offSound will not play because sounds will be muted
// const toggleSoundEffects = (function () {
//   let toggle = true;
//   return function () {
//     if (toggle) {
//       playSound(onSound);
//       toggle = false;
//       soundEffectsButton.textContent = "SFX | ON";
//     } else {

//       playSound(offSound);
//       toggle = true;
//       soundEffectsButton.textContent = "SFX | OFF";
//     }
//     for (let m = 0; m < soundEffectsArray.length; m++) {
//       soundEffectsArray[m].muted = toggle;
//     }
//   }
// })();

// const toggleVoice = (function () {
//   let toggle = true;
//   return function () {
//     if (toggle) {
//       playSound(onSound);
//       toggle = false;
//       voiceButton.textContent = "Voice | ON";
//     } else {
//       playSound(offSound);
//       toggle = true;
//       voiceButton.textContent = "Voice | OFF";
//     }
//     for (let p = 0; p < voiceArray.length; p++) {
//       document.getElementById(`${voiceArray[p]}`).muted = toggle;
//     }
//   }
// })();



// const togMusic = toggleSound('music');
// const togSoundEffects = toggleSound('sfx');
// const togVoice = toggleSound('voice')



// musicButton.addEventListener('click', toggleMusic);
// soundEffectsButton.addEventListener('click', toggleSoundEffects);
// voiceButton.addEventListener('click', toggleVoice);
