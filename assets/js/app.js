class App {
  constructor(sound, options, game, end) {
    this.sound = sound;
    this.options = options;
    this.mode = this.options.mode;
    this.difficulty = this.options.difficulty;
    this.location = this.options.location;
    this.game = game;
    this.end = end;

    this.welcomeScreen = document.getElementById('welcome-screen');
    this.welcomeButton = document.getElementById('welcome-button');
    this.modeScreen = document.getElementById('mode-screen');
    this.modeButton = document.getElementById('mode-button');
    this.difficultyScreen = document.getElementById('difficulty-screen');
    this.difficultyButton = document.getElementById('difficulty-button');
    this.locationScreen = document.getElementById('location-screen');
    this.locationButton = document.getElementById('location-button');
    this.gameScreen = document.getElementById('game-screen');
    this.cheatButton = document.getElementById('cheat');
    this.endScreen = document.getElementById('end-screen');
    this.resetButton = document.getElementById('reset');

    this.welcomeView = {
      view: this.welcomeScreen,
      button: null,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.modeView = {
      view: this.modeScreen,
      button: this.modeButton,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.difficultyView = {
      view: this.difficultyScreen,
      button: this.difficultyButton,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.locationView = {
      view: this.locationScreen,
      button: this.locationButton,
      sound: () => sound.playSound(sound.flipSound, sound.startSound)
    };

    this.gameView = {
      view: this.gameScreen,
      button: null,
      sound: null
    };

    this.endView = {
      view: this.endScreen,
      button: null,
      sound: () => sound.playSound(sound.flipSound, sound.resetSound)
    };

    this.views = [this.welcomeView, this.modeView, this.difficultyView, this.locationView, this.gameView, this.endView];
    this.index = 0;

    this.setNextView = this.setNextView.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  initializeApp() {
    this.sound.addEventListeners();
    this.options.initializeOptions();
    this.addEventListeners();
  }

  addEventListeners() {
    this.welcomeButton.addEventListener('click', this.setNextView);
    this.modeButton.addEventListener('click', this.setNextView);
    this.difficultyButton.addEventListener('click', this.setNextView);
    this.locationButton.addEventListener('click', () => {
      this.setNextView();
      this.setGameSettings();
      this.game.startGame();
    });
    this.resetButton.addEventListener('click', () => {
      this.setNextView();
      this.resetApp();
    });
    this.cheatButton.addEventListener('click', this.game.handleCheat);
  }

  setNextView() {
    const current = this.views[this.index];
    this.index = ++this.index % this.views.length;
    const next = this.views[this.index];
    current.view.classList.add('hidden');
    if (current.button) current.button.classList.add('invisible');
    next.view.classList.remove('hidden');
    if (current.sound) current.sound();
  }

  setGameSettings() {
    document.body.classList.add(`${this.location.current}`);
    const gameSettings = {
      currentMode: this.mode.current,
      modeDisplay: this.mode[this.mode.current].display,
      difficultyDisplay: this.difficulty[this.difficulty.current].display,
      timeLeft: this.difficulty[this.difficulty.current].time,
      livesLeft: this.difficulty[this.difficulty.current].lives,
      endGame: this.endGame,
    };
    this.game.getGameSettings(gameSettings);
  }

  endGame(message, accuracy, timeLives) {
    this.setNextView();
    this.end.setDisplay(message, accuracy, timeLives);
  }

  resetApp() {
    document.body.classList.remove(`${this.location.current}`);
    this.game.resetGame();
    this.options.resetOptions();
  }
}
