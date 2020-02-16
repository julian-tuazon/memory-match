class Modal {
  constructor() {

  }
}

const locations = {
  "current": "null",
  "defaultMessage": "Select Location",
  "currentMessage": "Select Location",
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
    "sound": document.getElementById("sol-2-voice"),
  },
  "moa-therma": {
    "locationMessage": "Moa Therma",
    "sound": document.getElementById("moa-therma-voice"),
  },
  "vineta-k": {
    "locationMessage": "Vineta K",
    "sound": document.getElementById("vineta-k-voice"),
  },
  "tech-de-ra": {
    "locationMessage": "Tech De Ra",
    "sound": document.getElementById("tech-de-ra-voice"),
  },
  "metropia": {
    "locationMessage": "Metropia",
    "sound": document.getElementById("metropia-voice"),
  },
  "anulpha-pass": {
    "locationMessage": "Anulpha Pass",
    "sound": document.getElementById("anulpha-pass-voice"),
  },
};

function addEventListeners() {
  for (let i = 0; i < locations.locationList.length; i++) {
    let currentElement = document.getElementById(`${locations.locationList[i]}`);
    currentElement.addEventListener('mouseover', handleMouseOver);
    currentElement.addEventListener('mouseleave', handleMouseLeave);
    currentElement.addEventListener('click', function (event) {
      console.log("clicked", event.target.id);
      handleClickLocation(event);
    });
  }
  console.log("Added mouseover, mouseleave, click");
}

function handleMouseOver(event) {
  console.log(event.target.id);
  document.getElementById("location-message").textContent = locations[event.target.id].locationMessage;
}

function handleMouseLeave() {
  console.log(event.target.classList[0]);
  document.getElementById("location-message").textContent = locations.currentMessage;
}

function handleClickLocation(event) {
  if (locations.current !== event.target.id) {
    event.target.classList.add("selected", "selected-animation");
    event.target.classList.remove("clickable");
    if (locations.current !== "null") {
      document.body.classList.remove(locations.current); // add body class manipulation to startGame
      document.getElementById(`${locations.current}`).classList.add("clickable");
      document.getElementById(`${locations.current}`).classList.remove("selected");
    }
    locations.current = event.target.id;
    document.body.classList.add(locations.current); // add body class manipulation to startGame
    locations.currentMessage = locations[locations.current].locationMessage;
    setTimeout(function () {
      event.target.classList.remove("selected-animation");
    }, 700);
    playSound(selectSound);
    playSound(locations[locations.current].sound);
    locationButton.classList.remove("temp-hidden");
  }
}

addEventListeners();
