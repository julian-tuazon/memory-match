let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;
let attempts = 0;
let gamesPlayed = 0;
let shuffleArray = [];

// Functionality for switching background after each game ends

// let backgroundIndex = 1;
// const backgrounds = ["url('./assets/images/DNA.gif')", "url('./assets/images/Singleton.gif')", "url('./assets/images/Goo.gif')"];

const gameCards = document.getElementById("game-cards");
const welcome = document.getElementById("welcome");
const startButton = document.getElementById("start");
const end = document.getElementById("end");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");
const gamesPlayedDisplay = document.getElementById("games-played");
const attemptsDisplay = document.getElementById("attempts");
const matchesDisplay = document.getElementById("matches");
const accuracyDisplay = document.getElementById("accuracy");

gameCards.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cheatButton.addEventListener('click', cheatCodes);

function startGame() {
  welcome.classList.add("hidden");
  shuffleCards();
  console.log("done shuffling");
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
      gameCards.classList.add("correct");
      setTimeout(function() {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.classList.remove("correct");
        gameCards.addEventListener('click', handleClick);
      }, 500);
      if (matches === maxMatches) {
        document.getElementById("final-accuracy").textContent = "Accuracy: " + accuracyDisplay.textContent;
        end.classList.remove("hidden");
      }
    } else {
      attemptsDisplay.textContent = ++attempts;
      accuracyDisplay.textContent = `${(matches / attempts * 100).toFixed(1)}%`;
      gameCards.classList.add("incorrect");
      setTimeout(function() {
        firstCardClicked.previousElementSibling.classList.remove("current");
        secondCardClicked.previousElementSibling.classList.remove("current");
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

function shuffleCards() {
  // can use appendChild to sort on the DOM?
  while (gameCards.firstElementChild) {
    shuffleArray.push(gameCards.firstElementChild.firstElementChild.classList[1]);
    console.log("the cardChild:", gameCards.firstElementChild);
    console.log("the frontChild:", gameCards.firstElementChild.firstElementChild);
    console.log("the frontChild picture class:", gameCards.firstElementChild.firstElementChild.classList[1]);
    gameCards.removeChild(gameCards.firstElementChild);
  }
  let counter = shuffleArray.length;
  console.log("shuffleArray:", shuffleArray);
  console.log("shuffleArray length / counter:", counter);
  for (let k = 0; k < counter; k++) {
    console.log("k index:", k);
    let randomIndex = Math.floor(Math.random() * shuffleArray.length);
    console.log("randomIndex:", randomIndex);
    let cardChild = document.createElement("div");
    let frontChild = document.createElement("div");
    let backChild = document.createElement("div");
    cardChild.classList.add("col-2", "card");
    frontChild.classList.add("card-front", `${shuffleArray[randomIndex]}`);
    console.log("className value:", shuffleArray[randomIndex]);
    console.log("frontChild classList:", frontChild.classList);
    backChild.classList.add("card-back");
    shuffleArray.splice(randomIndex, 1); //removes element from shuffleArray - no extra randomization
    cardChild.appendChild(frontChild);
    cardChild.appendChild(backChild);
    gameCards.appendChild(cardChild);
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
  shuffleCards();
  end.classList.add("hidden");
}

function cheatCodes() {
  end.classList.remove("hidden");
  welcome.classList.remove("hidden");
}
  //Old functionality for flipping flipped cards back after the win

  // let cardBacks = document.getElementsByClassName("card-back");
  // for (let i = 0; i < cardBacks.length; i++) {
  //   cardBacks[i].classList.remove("hidden");
  // }



  //Functionality for changing background:

  // backgroundIndex++;
  // console.log("backgroundIndex:", backgroundIndex);
  // console.log("backgroundIndex % length:", backgroundIndex % backgrounds.length);
  // document.body.style.backgroundImage = backgrounds[backgroundIndex % backgrounds.length];
