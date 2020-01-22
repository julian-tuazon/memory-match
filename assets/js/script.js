let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;

const gameCards = document.getElementById("game-cards");
const modal = document.getElementById("modal");
const resetButton = document.getElementById("reset");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");

gameCards.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    event.target.className += " hidden";
    firstCardClasses = event.target.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    event.target.className += " hidden";
    secondCardClasses = event.target.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses === secondCardClasses) {
      matchesDisplay.textContent = ++matches;
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      if (matches === maxMatches) {
        document.getElementById("modal").classList.remove("hidden");
      }
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener('click', handleClick);
    } else {
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener('click', handleClick);
      }, 1500);
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
  modal.classList.add("hidden");
}
