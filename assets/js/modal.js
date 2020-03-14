class Modal {

  constructor() {
    this.mode = {
      "name": "mode",
      "button": document.getElementById('mode-button'),
      "current": "null",
      "defaultTitle": "M O D E",
      "currentTitle": "M O D E",
      "defaultMessage": "Deploy Pod",
      "currentMessage": "Deploy Pod",
      "itemList": [
        "survival",
        "time-attack",
      ],
      "survival": {
        "title": "S U R V I V A L",
        "message": "Pod X-042",
        "display": "Survival",
        "sound": document.getElementById("pod-one"),
      },
      "time-attack": {
        "title": "T I M E - A T T A C K",
        "message": "Pod Y-153",
        "display": "Time-Attack",
        "sound": document.getElementById("pod-two"),
      },
    };

    this.difficulty = {
      "name": "difficulty",
      "button": document.getElementById('difficulty-button'),
      "current": "null",
      "defaultTitle": "D I F F I C U L T Y",
      "currentTitle": "D I F F I C U L T Y",
      "defaultMessage": "Deploy YoRHa Unit",
      "currentMessage": "Deploy YoRHa Unit",
      "itemList": [
        "easy",
        "medium",
        "hard",
      ],
      "easy": {
        "title": "E A S Y",
        "message": "YoRHa No. 9 Type S",
        "time": 99,
        "lives": 50,
        "display": "Easy",
        "sound": document.getElementById("9s"),
      },
      "medium": {
        "title": "M E D I U M",
        "message": "YoRHa Type A No. 2",
        "time": 60,
        "lives": 35,
        "display": "Medium",
        "sound": document.getElementById("a2"),
      },
      "hard": {
        "title": "H A R D",
        "message": "YoRHa No. 2 Type B",
        "time": 30,
        "lives": 20,
        "display": "Hard",
        "sound": document.getElementById("2b"),
      },
    };

    this.location = {
      "name": "location",
      "button": document.getElementById('location-button'),
      "current": "null",
      "defaultTitle": "L O C A T I O N",
      "currentTitle": "L O C A T I O N",
      "defaultMessage": "Select Location",
      "currentMessage": "Select Location",
      "itemList": [
        "sol-2",
        "moa-therma",
        "vineta-k",
        "tech-de-ra",
        "metropia",
        "anulpha-pass",
      ],
      "sol-2": {
        "title": "L O C A T I O N",
        "message": "Sol 2",
        "sound": document.getElementById("sol-2-voice"),
      },
      "moa-therma": {
        "title": "L O C A T I O N",
        "message": "Moa Therma",
        "sound": document.getElementById("moa-therma-voice"),
      },
      "vineta-k": {
        "title": "L O C A T I O N",
        "message": "Vineta K",
        "sound": document.getElementById("vineta-k-voice"),
      },
      "tech-de-ra": {
        "title": "L O C A T I O N",
        "message": "Tech De Ra",
        "sound": document.getElementById("tech-de-ra-voice"),
      },
      "metropia": {
        "title": "L O C A T I O N",
        "message": "Metropia",
        "sound": document.getElementById("metropia-voice"),
      },
      "anulpha-pass": {
        "title": "L O C A T I O N",
        "message": "Anulpha Pass",
        "sound": document.getElementById("anulpha-pass-voice"),
      },
    };

    this.modalList = [this.mode, this.difficulty, this.location];
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  initializeModal() {
    this.modalList.forEach(modal => this.addEventListeners(modal));
  }

  addEventListeners(modal) {
    for (let i = 0; i < modal.itemList.length; i++) {
      let currentElement = document.getElementById(`${modal.itemList[i]}`);
      currentElement.addEventListener('mouseover', (event) => this.handleMouseOver(event, modal));
      currentElement.addEventListener('mouseleave', () => this.handleMouseLeave(modal));
      currentElement.addEventListener('click', (event) => this.handleClick(event, modal));
    }
  }

  handleMouseOver(event, modal) {
    document.getElementById(`${modal.name}-title`).textContent = modal[event.target.id].title;
    document.getElementById(`${modal.name}-message`).textContent = modal[event.target.id].message;
  }

  handleMouseLeave(modal) {
    document.getElementById(`${modal.name}-title`).textContent = modal.currentTitle;
    document.getElementById(`${modal.name}-message`).textContent = modal.currentMessage;
  }

  handleClick(event, modal) {
    if (modal.current !== event.target.id) {
      event.target.classList.add("selected", "selected-animation");
      event.target.classList.remove("clickable");
      setTimeout(function () {
        event.target.classList.remove("selected-animation");
      }, 700);
      if (modal.current !== "null") {
        document.getElementById(`${modal.current}`).classList.add("clickable");
        document.getElementById(`${modal.current}`).classList.remove("selected");
      }
      modal.current = event.target.id;
      modal.currentTitle = modal[modal.current].title;
      modal.currentMessage = modal[modal.current].message;
      playSound(selectSound);
      playSound(modal[modal.current].sound);
      modal.button.classList.remove("temp-hidden");
    }
  }
}
