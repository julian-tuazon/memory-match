class Mode {
  constructor() {

  }
}

const mode = {
  "current": "null",
  "defaultTitle": "M O D E",
  "currentTitle": mode.defaultHeader,
  "defaultMessage": "Deploy Pod",
  "currentMessage": "Deploy Pod",
  "modeList": [
    "survival",
    "time-attack",
  ],
  "survival": {
    "modeTitle": "S U R V I V A L",
    "modeMessage": "Pod X-042",
    "sound": document.getElementById("pod-one"),
  },
  "time-attack": {
    "modeHeader": "T I M E - A T T A C K",
    "modeMessage": "Pod Y-153",
    "sound": document.getElementById("pod-two"),
  },
};

function addEventListenersMode() {
  for (let i = 0; i < mode.modeList.length; i++) {
    let currentElement = document.getElementById(`${mode.modeList[i]}`);
    currentElement.addEventListener('mouseover', handleMouseOverMode);
    currentElement.addEventListener('mouseleave', handleMouseLeaveMode);
    currentElement.addEventListener('click', function (event) {
      console.log("clicked", event.target.id]);
      handleClickLocation(event);
    });
  }
  console.log("Added mouseover, mouseleave, click");
}

function handleMouseOverMode(event) {
  console.log(event.target.id);
  document.getElementById("mode-title").textContent = mode[event.target.id]].modeTitle;
  document.getElementById("mode-message").textContent = mode[event.target.id]].modeMessage;
}

function handleMouseLeaveMode() {
  console.log(event.target.id);
  document.getElementById("mode-message").textContent = mode.currentMessage;
}

function handleClickMode(event) {
  console.log("we made it");
  if (mode.current !== event.target.id) {
    event.target.classList.add("selected", "selected-animation");
    event.target.classList.remove("clickable");
    if (mode.current !== "null") {
      document.getElementById(`${mode.current}`).classList.add("clickable");
      document.getElementById(`${mode.current}`).classList.remove("selected");
    }
    mode.current = event.target.id;
    mode.currentMessage = mode[mode.current].modeMessage;
    setTimeout(function () {
      event.target.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(mode[mode.current].sound);
    modeButton.classList.remove("temp-hidden");
  }
}

addEventListenersMode();
