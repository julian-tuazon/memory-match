class Sound {
  constructor() {
    this.gameMusic = document.getElementById("bgm");
    this.startSound = document.getElementById("start-sound");
    this.endSound = document.getElementById("end-sound");
    this.flipSound = document.getElementById("flip-sound");
    this.correctSound = document.getElementById("correct-sound");
    this.incorrectSound = document.getElementById("incorrect-sound");
    this.onSound = document.getElementById("on-sound");
    this.offSound = document.getElementById("off-sound");
    this.resetSound = document.getElementById("reset-sound");
    this.cheatSound = document.getElementById("cheat-sound");
    this.hoverSound = document.getElementById("hover-sound");
    this.selectSound = document.getElementById("select-sound");

    this.musicButton = document.getElementById("music-toggle");
    this.soundEffectsButton = document.getElementById("sound-toggle");
    this.voiceButton = document.getElementById("voice-toggle");

    this.music = {
      name: 'Music',
      button: this.musicButton,
      itemList: [...document.getElementById('music').children],
    };

    this.soundEffects = {
      name: 'SFX',
      button: this.soundEffectsButton,
      itemList: [...document.getElementById('sound-effects').children],
    };

    this.voice = {
      name: 'Voice',
      button: this.voiceButton,
      itemList: [...document.getElementById('voice').children],
    };

    this.soundList = [this.music, this.soundEffects, this.voice];
  }

  addEventListeners() {
    this.soundList.forEach(sound => {
      sound.toggle = this.toggleSound(sound);
      sound.button.addEventListener('click', sound.toggle);
    });
    [...document.getElementsByClassName('clickable')].forEach(elem => elem.addEventListener('mouseover', () => hoverSound.play()));
  }

  toggleSound(sound) {
    let toggle = true;
    return function () {
      toggle ? this.playSound(onSound) : this.playSound(offSound);
      toggle ? sound.button.textContent = `${sound.name} | ON` : sound.button.textContent = `${sound.name} | OFF`;
      if (sound.name === 'Music') toggle ? this.gameMusic.play() : this.gameMusic.pause();
      toggle = !toggle;
      sound.itemList.forEach(sound => sound.muted = toggle);
    }
  }

  playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
  // Array.prototype.forEach.call(document.getElementsByClassName('clickable'), elem => elem.addEventListener('mouseover', () => hoverSound.play()));

// this.toggle = {
//   music: toggleSound(music),
//   soundEffects: toggleSound(soundEffects),
//   voice: toggleSound(voice),
// };

// this.toggleMusic = toggleSound(music);
// this.toggleSoundEffects = toggleSound(soundEffects);
// this.toggleVoice = toggleSound(voice);


// this.voiceArray = [
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

// this.toggleMusic = (function () {
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
// this.toggleSoundEffects = (function () {
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

// this.toggleVoice = (function () {
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



// this.togMusic = toggleSound('music');
// this.togSoundEffects = toggleSound('sfx');
// this.togVoice = toggleSound('voice')



// musicButton.addEventListener('click', toggleMusic);
// soundEffectsButton.addEventListener('click', toggleSoundEffects);
// voiceButton.addEventListener('click', toggleVoice);


// this.musicArray = [gameMusic];

// this.soundEffectsArray = [
//   startSound,
//   endSound,
//   flipSound,
//   correctSound,
//   incorrectSound,
//   onSound,
//   offSound,
//   resetSound,
//   cheatSound,
//   hoverSound,
//   selectSound,
// ];

// this.voiceArray = [
//   document.getElementById("ag-voice"),
//   document.getElementById("assegai-voice"),
//   document.getElementById("goteki-voice"),
//   document.getElementById("auricom-voice"),
//   document.getElementById("icaras-voice"),
//   document.getElementById("piranha-voice"),
//   document.getElementById("harimau-voice"),
//   document.getElementById("qirex-voice"),
//   document.getElementById("triakis-voice"),
//   document.getElementById("easy-voice"),
//   document.getElementById("medium-voice"),
//   document.getElementById("hard-voice"),
//   document.getElementById("survival-voice"),
//   document.getElementById("time-attack-voice"),
//   document.getElementById("sol-2-voice"),
//   document.getElementById("moa-therma-voice"),
//   document.getElementById("vineta-k-voice"),
//   document.getElementById("tech-de-ra-voice"),
//   document.getElementById("metropia-voice"),
//   document.getElementById("anulpha-pass-voice"),
// ];
