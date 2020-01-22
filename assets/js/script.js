let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;

// switches background after each game ends
// let backgroundIndex = 1;
// const backgrounds = ["url('./assets/images/DNA.gif')", "url('./assets/images/Singleton.gif')", "url('./assets/images/Goo.gif')"];

const gameCards = document.getElementById("game-cards");
const welcome = document.getElementById("welcome");
const startButton = document.getElementById("start");
const end = document.getElementById("end");
const resetButton = document.getElementById("reset");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");

gameCards.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
  welcome.classList.add("hidden");
}

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClicked.className += " hidden";
    firstCardClicked.previousElementSibling.classList.add("current");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClicked.className += " hidden";
    secondCardClicked.previousElementSibling.classList.add("current");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses === secondCardClasses) {
      matchesDisplay.textContent = ++matches;
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      firstCardClicked.previousElementSibling.classList.remove("current");
      secondCardClicked.previousElementSibling.classList.remove("current");
      gameCards.classList.add("correct");
      setTimeout(function() {
        gameCards.classList.remove("correct");
      }, 1000);
      if (matches === maxMatches) {
        document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
        end.classList.remove("hidden");
      }
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener('click', handleClick);
    } else {
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      firstCardClicked.previousElementSibling.classList.remove("current");
      secondCardClicked.previousElementSibling.classList.remove("current");
      gameCards.classList.add("incorrect");
      setTimeout(function() {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.classList.remove("incorrect");
        gameCards.addEventListener('click', handleClick);
      }, 1000);
    }
  }
}

function resetGame() {
  matches = 0;
  attempts = 0;
  accuracy = 0;
  matchesDisplay.textContent = matches;
  attemptsDisplay.textContent = attempts;
  accuracyDisplay.textContent = accuracy;
  gamesPlayedDisplay.textContent = ++gamesPlayed;
  let cardBacks = document.getElementsByClassName("card-back");
  for (let i = 0; i < cardBacks.length; i++) {
    cardBacks[i].classList.remove("hidden");
  }
  end.classList.add("hidden");
  // backgroundIndex++;
  // console.log("backgroundIndex:", backgroundIndex);
  // console.log("backgroundIndex % length:", backgroundIndex % backgrounds.length);
  // document.body.style.backgroundImage = backgrounds[backgroundIndex % backgrounds.length];
}
