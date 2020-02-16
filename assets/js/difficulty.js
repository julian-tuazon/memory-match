class Difficulty {
  constructor() {

  }
}

const difficulty = {
  "current": "null",
  "defaultTitle": "D I F F I C U L T Y",
  "currentTitle": "D I F F I C U L T Y",
  "defaultMessage": "Deploy YoRHa Unit",
  "currentMessage": "Deploy YoRHa Unit",
  "difficultyList": [
    "easy",
    "medium",
    "hard",
  ],
  "easy": {
    "difficultyTitle": "E A S Y",
    "difficultyMessage": "YoRHa No. 9 Type S",
    "time": 99,
    "lives": 50,
    "display": "Easy",
    "sound": document.getElementById("9s"),
  },
  "medium": {
    "difficultyTitle": "M E D I U M",
    "difficultyMessage": "YoRHa Type A No. 2",
    "time": 60,
    "lives": 35,
    "display": "Medium",
    "sound": document.getElementById("a2"),
  },
  "hard": {
    "difficultyTitle": "H A R D",
    "difficultyMessage": "YoRHa No. 2 Type B",
    "time": 30,
    "lives": 20,
    "display": "Hard",
    "sound": document.getElementById("2b"),
  },
};

function addEventListenersDifficulty() {
  for (let i = 0; i < difficulty.difficultyList.length; i++) {
    let currentElement = document.getElementById(`${difficulty.difficultyList[i]}`);
    currentElement.addEventListener('mouseover', handleMouseOverDifficulty);
    currentElement.addEventListener('mouseleave', handleMouseLeaveDifficulty);
    currentElement.addEventListener('click', function (event) {
      handleClickDifficulty(event);
    });
  }
}

function handleMouseOverDifficulty(event) {
  document.getElementById("difficulty-title").textContent = difficulty[event.target.id].difficultyTitle;
  document.getElementById("difficulty-message").textContent = difficulty[event.target.id].difficultyMessage;
}

function handleMouseLeaveDifficulty() {
  document.getElementById("difficulty-title").textContent = difficulty.currentTitle;
  document.getElementById("difficulty-message").textContent = difficulty.currentMessage;
}

function handleClickDifficulty(event) {
  if (difficulty.current !== event.target.id) {
    event.target.classList.add("selected", "selected-animation");
    event.target.classList.remove("clickable");
    setTimeout(function () {
      event.target.classList.remove("selected-animation");
    }, 700);
    if (difficulty.current !== "null") {
      document.getElementById(`${difficulty.current}`).classList.add("clickable");
      document.getElementById(`${difficulty.current}`).classList.remove("selected");
    }
    difficulty.current = event.target.id;
    difficulty.currentTitle = difficulty[difficulty.current].difficultyTitle;
    difficulty.currentMessage = difficulty[difficulty.current].difficultyMessage;
    playSound(selectSound);
    playSound(difficulty[difficulty.current].sound);
    difficultyButton.classList.remove("temp-hidden");
  }
}

addEventListenersDifficulty();
