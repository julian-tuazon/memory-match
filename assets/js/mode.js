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
  "locationList": [
    "sol-2",
    "moa-therma",
    "vineta-k",
    "tech-de-ra",
    "metropia",
    "anulpha-pass",
  ],
  "sol-2": {
    "locationMessage": "Sol 2",
    "sound": document.getElementById("sol-2"),
  },
  "moa-therma": {
    "locationMessage": "Moa Therma",
    "sound": document.getElementById("moa-therma"),
  },
  "vineta-k": {
    "locationMessage": "Vineta K",
    "sound": document.getElementById("vineta-k"),
  },
  "tech-de-ra": {
    "locationMessage": "Tech De Ra",
    "sound": document.getElementById("tech-de-ra"),
  },
  "metropia": {
    "locationMessage": "Metropia",
    "sound": document.getElementById("metropia"),
  },
  "anulpha-pass": {
    "locationMessage": "Anulpha Pass",
    "sound": document.getElementById("anulpha-pass"),
  },
};

function addEventListeners() {
  for (let i = 0; i < locations.locationList.length; i++) {
    let currentElement = document.querySelector(`.flex > .${locations.locationList[i]}`);
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
  document.getElementById("location-message").textContent = locations[event.target.classList[0]].locationMessage;
}

function handleMouseLeave() {
  console.log(event.target.classList[0]);
  document.getElementById("location-message").textContent = locations.currentMessage;
}

function handleClickLocation(event) {
  console.log("we made it");
  // let currentElement = document.querySelector(`.flex > .${event.target.classList[0]}`);
  if (locations.current !== event.target.classList[0]) {
    event.target.classList.add("selected", "selected-animation");
    event.target.classList.remove("clickable");
    if (locations.current !== "null") {
      document.body.classList.remove(locations.current);
      document.querySelector(`.flex > .${locations.current}`).classList.add("clickable");
      document.querySelector(`.flex > .${locations.current}`).classList.remove("selected");
    }
    locations.current = event.target.classList[0];
    document.body.classList.add(locations.current);
    locations.currentMessage = locations[locations.current].locationMessage;
    setTimeout(function () {
      event.target.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(locations[locations.current].sound);
    locationButton.classList.remove("temp-hidden");
  }
}
