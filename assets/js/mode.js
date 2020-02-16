class Mode {
  constructor() {

  }
}

const mode = {
  "current": "null",
  "defaultHeader": "M O D E",
  "currentHeader": mode.defaultHeader,
  "defaultMessage": "Deploy Pod",
  "currentMessage": "Deploy Pod",
  "modeList": [
    "survival",
    "time-attack",
  ],
  "survival": {
    "modeHeader": "S U R V I V A L",
    "modeMessage": "Pod X-042",
    "sound": document.getElementById("pod-one"),
  },
  "timeAttack": {
    "modeHeader": "T I M E - A T T A C K",
    "modeMessage": "Pod Y-153",
    "sound": document.getElementById("pod-two"),
  },
};

function addEventListeners() {
  for (let i = 0; i < mode.modeList.length; i++) {
    let currentElement = document.querySelector(`.flex > .${mode.modeList[i]}`);
    currentElement.addEventListener('mouseover', handleMouseOver);
    currentElement.addEventListener('mouseleave', handleMouseLeave);
    currentElement.addEventListener('click', function (event) {
      console.log("clicked", event.target.classList[0]);
      handleClickLocation(event);
    });
  }
  console.log("Added mouseover, mouseleave, click");
}

function handleMouseOver(event) {
  console.log(event.target.classList[0]);
  document.getElementById("mode-message").textContent = mode[event.target.classList[0]].modeMessage;
}

function handleMouseLeave() {
  console.log(event.target.classList[0]);
  document.getElementById("mode-message").textContent = mode.currentMessage;
}

function handleClickLocation(event) {
  console.log("we made it");
  // let currentElement = document.querySelector(`.flex > .${event.target.classList[0]}`);
  if (mode.current !== event.target.classList[0]) {
    event.target.classList.add("selected", "selected-animation");
    event.target.classList.remove("clickable");
    if (mode.current !== "null") {
      document.body.classList.remove(mode.current);
      document.querySelector(`.flex > .${mode.current}`).classList.add("clickable");
      document.querySelector(`.flex > .${mode.current}`).classList.remove("selected");
    }
    mode.current = event.target.classList[0];
    document.body.classList.add(mode.current);
    mode.currentMessage = mode[mode.current].modeMessage;
    setTimeout(function () {
      event.target.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(mode[mode.current].sound);
    modeButton.classList.remove("temp-hidden");
  }
}
