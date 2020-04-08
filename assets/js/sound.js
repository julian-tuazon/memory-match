class Sound {
  constructor() {
    this.soundScreen = document.getElementById('sound-screen');
    this.welcomeScreen = document.getElementById('welcome-screen');

    this.gameMusic = document.getElementById('bgm');
    this.startSound = document.getElementById('start-sound');
    this.endSound = document.getElementById('end-sound');
    this.flipSound = document.getElementById('flip-sound');
    this.correctSound = document.getElementById('correct-sound');
    this.incorrectSound = document.getElementById('incorrect-sound');
    this.onSound = document.getElementById('on-sound');
    this.offSound = document.getElementById('off-sound');
    this.resetSound = document.getElementById('reset-sound');
    this.cheatSound = document.getElementById('cheat-sound');
    this.hoverSound = document.getElementById('hover-sound');
    this.selectSound = document.getElementById('select-sound');

    this.musicButton = document.getElementById('music-toggle');
    this.soundEffectsButton = document.getElementById('sound-toggle');
    this.voiceButton = document.getElementById('voice-toggle');

    this.music = {
      name: 'Music',
      button: this.musicButton,
      toggle: null,
      itemList: [...document.getElementById('music').children],
    };

    this.soundEffects = {
      name: 'SFX',
      button: this.soundEffectsButton,
      toggle: null,
      itemList: [...document.getElementById('sound-effects').children],
    };

    this.voice = {
      name: 'Voice',
      button: this.voiceButton,
      toggle: null,
      itemList: [...document.getElementById('voice').children],
    };

    this.soundList = [this.music, this.soundEffects, this.voice];
  }

  addEventListeners() {
    this.soundList.forEach(sound => {
      sound.toggle = this.toggleSound(sound);
      sound.button.addEventListener('click', sound.toggle);
    });
    document.getElementById('sound-on-button').addEventListener('click', event => this.configureSound(event));
    document.getElementById('sound-off-button').addEventListener('click', event => this.configureSound(event));
    [...document.getElementsByClassName('clickable')].forEach(elem => elem.addEventListener('mouseover', () => this.hoverSound.play()));
  }

  configureSound(event) {
    if (event.target.id === 'sound-on-button') sound.soundList.forEach(sound => sound.toggle());
    this.soundScreen.classList.add('hidden');
    this.welcomeScreen.classList.remove('hidden');
  }

  toggleSound(sound) {
    let toggle = true;
    return () => {
      toggle ? this.playSound(this.onSound) : this.playSound(this.offSound);
      toggle ? sound.button.textContent = `${sound.name} | ON` : sound.button.textContent = `${sound.name} | OFF`;
      if (sound.name === 'Music') toggle ? this.gameMusic.play() : this.gameMusic.pause();
      toggle = !toggle;
      sound.itemList.forEach(sound => sound.muted = toggle);
    }
  }

  playSound(sounds) {
    const args = [...arguments];
    args.forEach(sound => {
      sound.currentTime = 0;
      sound.play();
    });
  }
}
