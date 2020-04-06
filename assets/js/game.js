class Game {
  constructor() {
    this.gameCards = document.getElementById("game-cards");
    this.cardsArray = [
      'ag',
      'assegai',
      'goteki',
      'auricom',
      'icaras',
      'piranha',
      'harimau',
      'qirex',
      'triakis',
      'ag',
      'assegai',
      'goteki',
      'auricom',
      'icaras',
      'piranha',
      'harimau',
      'qirex',
      'triakis',
    ];
    this.firstCardClicked;
    this.secondCardClicked;
    this.firstCardClasses;
    this.secondCardClasses;
    this.maxMatches = 9;
    this.matches = 0;
    this.attempts = 0;
    this.gamesPlayed = 0;
    this.timer = null;
    this.timeLeft = null;
    this.livesLeft = null;
    this.gamesPlayedDisplay = document.getElementById("games-played");
    this.attemptsDisplay = document.getElementById("attempts");
    this.matchesDisplay = document.getElementById("matches");
    this.accuracyDisplay = document.getElementById("accuracy");
    this.timeDisplay = document.getElementById("time");
    this.difficultyModeDisplay = document.getElementById("difficulty-mode-display");
    this.difficultyDisplay = null;
    this.modeDisplay = null;
    this.currentMode = null;
    this.endGame = null;

    this.handleClick = this.handleClick.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.handleIncorrect = this.handleIncorrect.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCheat = this.handleCheat.bind(this);
    this.countdown = this.countdown.bind(this);
    // this.needs = [locations.current, mode display, difficulty display, mode current, time, lives, sounds, ];
  }

  startGame() {
    this.shuffleCards();
    this.addEventListeners();
    this.difficultyModeDisplay.textContent = `${this.difficultyDisplay} | ${this.modeDisplay}`;
    if (this.currentMode === "time-attack") this.timer = setInterval(this.countdown, 100);
    else this.timeDisplay.textContent = `Lives | ${this.livesLeft}`;
  }

  getGameSettings(gameSettings) {
    this.currentMode = gameSettings.currentMode;
    this.modeDisplay  = gameSettings.modeDisplay;
    this.difficultyDisplay = gameSettings.difficultyDisplay;
    this.timeLeft = gameSettings.timeLeft;
    this.livesLeft = gameSettings.livesLeft;
    this.endGame = gameSettings.endGame;
  }

  shuffleCards() {
    while (this.gameCards.firstElementChild) this.gameCards.removeChild(this.gameCards.firstElementChild);
    const shuffleArray = [...this.cardsArray];
    for (let i = 0; i < this.cardsArray.length; i++) {
      const randomIndex = Math.floor(Math.random() * shuffleArray.length);
      const cardContainer = document.createElement("div");
      const cardFront = document.createElement("div");
      const cardBack = document.createElement("div");
      cardContainer.classList.add("col-2", "card");
      cardFront.classList.add(`${shuffleArray[randomIndex]}`, "card-front");
      cardBack.classList.add("card-back");
      shuffleArray.splice(randomIndex, 1);
      cardContainer.appendChild(cardFront);
      cardContainer.appendChild(cardBack);
      this.gameCards.appendChild(cardContainer);
    }
  }

  addEventListeners() {
    this.gameCards.addEventListener('click', this.handleClick);
    [...document.getElementsByClassName('card-back')].forEach(card => card.addEventListener('mouseover', () => sound.hoverSound.play()));
  }

  handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) return;
    sound.playSound(sound.flipSound);
    if (!this.firstCardClicked) {
      this.firstCardClicked = event.target;
      this.firstCardClicked.classList.add("hidden");
      this.firstCardClicked.previousElementSibling.classList.add("current");
      this.firstCardClasses = this.firstCardClicked.previousElementSibling.className;
    } else {
      this.secondCardClicked = event.target;
      this.secondCardClicked.classList.add("hidden");
      this.secondCardClicked.previousElementSibling.classList.add("current");
      this.secondCardClasses = this.secondCardClicked.previousElementSibling.className;
      this.gameCards.removeEventListener('click', this.handleClick);
      if (this.firstCardClasses === this.secondCardClasses) {
        this.handleCorrect();
        if (this.matches === this.maxMatches) this.handleEnd('win', this.currentMode);
      } else this.handleIncorrect();
    }
  }

  handleCorrect() {
    sound.playSound(sound.correctSound, document.getElementById(`${this.firstCardClasses.split(' ')[0]}-voice`));
    this.gameCards.classList.add("correct");
    this.updateStats(true);
    this.setDelay(true, 500);
  }

  handleIncorrect() {
    sound.playSound(sound.incorrectSound);
    this.gameCards.classList.add("incorrect");
    this.updateStats(false);
    if (this.currentMode === "survival") {
      this.timeDisplay.textContent = `Lives | ${--this.livesLeft}`
      if (!this.livesLeft) this.handleEnd('lose', this.currentMode);
    }
    this.setDelay(false, 1000);
  }

  updateStats(isMatch) {
    if (isMatch) this.matchesDisplay.textContent = ++this.matches;
    this.attemptsDisplay.textContent = ++this.attempts;
    this.accuracyDisplay.textContent = `${(this.matches / this.attempts * 100).toFixed(1)}%`;
  }

  setDelay(isMatch, time) {
    setTimeout(() => {
      if (!isMatch) {
        this.firstCardClicked.classList.remove("hidden");
        this.secondCardClicked.classList.remove("hidden");
      }
      this.firstCardClicked.previousElementSibling.classList.remove("current");
      this.secondCardClicked.previousElementSibling.classList.remove("current");
      this.firstCardClicked = this.secondCardClicked = null;
      this.gameCards.classList.remove('correct', 'incorrect');
      this.gameCards.addEventListener('click', this.handleClick);
    }, time);
  }

  countdown() {
    if (this.timeLeft <= 0) return this.handleEnd('loss', this.currentMode);
    this.timeDisplay.textContent = `Time | ${this.timeLeft.toFixed(1)}`;
    this.timeLeft -= 0.1;
  }

  handleEnd(outcome, mode) {
    clearInterval(this.timer);
    sound.playSound(sound.endSound);
    const accuracy = "Accuracy: " + this.accuracyDisplay.textContent;
    let message;
    outcome === 'win' ? message = "V I C T O R Y" : message = "D E F E A T";
    let timeLives;
    mode === 'time-attack' ? timeLives = `Time Remaining: ${Math.abs(this.timeLeft).toFixed(1)}` : timeLives = `Lives Remaining: ${this.livesLeft}`;
    this.endGame(message, accuracy, timeLives);
  }

  handleCheat() {
    clearInterval(this.timer);
    sound.playSound(sound.flipSound, sound.cheatSound);
    this.endGame("E X O D U S", "admin.System.bypass //", "System.resolve //");
  }

  resetGame() {
    this.matches = this.attempts = this.matchesDisplay.textContent = this.attemptsDisplay.textContent = 0;
    this.accuracyDisplay.textContent = "0.0%";
    this.gamesPlayedDisplay.textContent = ++this.gamesPlayed;
    this.firstCardClicked = this.secondCardClicked = null;
    this.gameCards.classList.remove('correct', 'incorrect');
    this.gameCards.addEventListener('click', this.handleClick);
  }
}
