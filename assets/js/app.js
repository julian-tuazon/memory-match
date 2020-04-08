class App {
  constructor(sound, modal, game, end) {
    this.sound = sound;
    this.modal = modal;
    this.mode = this.modal.mode;
    this.difficulty = this.modal.difficulty;
    this.location = this.modal.location;
    this.game = game;
    this.end = end;

    this.welcomeModal = document.getElementById("welcome-modal");
    this.welcomeButton = document.getElementById("welcome-button");
    this.modeModal = document.getElementById("mode-modal");
    this.modeButton = document.getElementById("mode-button");
    this.difficultyModal = document.getElementById("difficulty-modal");
    this.difficultyButton = document.getElementById("difficulty-button");
    this.locationModal = document.getElementById("location-modal");
    this.locationButton = document.getElementById("location-button");
    this.gameModal = document.getElementById('game-modal');
    this.cheatButton = document.getElementById("cheat");
    this.endModal = document.getElementById("end-modal");
    this.resetButton = document.getElementById("reset");

    this.welcomeView = {
      view: this.welcomeModal,
      button: null,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.modeView = {
      view: this.modeModal,
      button: this.modeButton,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.difficultyView = {
      view: this.difficultyModal,
      button: this.difficultyButton,
      sound: () => sound.playSound(sound.flipSound)
    };

    this.locationView = {
      view: this.locationModal,
      button: this.locationButton,
      sound: () => sound.playSound(sound.flipSound, sound.startSound)
    };

    this.gameView = {
      view: this.gameModal,
      button: null,
      sound: null
    };

    this.endView = {
      view: this.endModal,
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
    this.modal.initializeModals();
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
    this.modal.resetModals();
  }
}
