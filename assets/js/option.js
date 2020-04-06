export default class Option {
  constructor(modal) {
    this.modal = modal;
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  initializeModal() {
    this.addEventListeners();
  }

  resetModal() {
      document.getElementById(`${this.modal.name}-title`).textContent = this.modal.currentTitle = this.modal.defaultTitle;
      document.getElementById(`${this.modal.name}-message`).textContent = this.modal.currentMessage = this.modal.defaultMessage;
      document.getElementById(`${this.modal.current}`).classList.add("clickable");
      document.getElementById(`${this.modal.current}`).classList.remove("selected", "selected-animation");
      this.modal.current = "null";
  }

  addEventListeners() {
    for (let i = 0; i < this.modal.itemList.length; i++) {
      let currentElement = document.getElementById(`${this.modal.itemList[i]}`);
      currentElement.addEventListener('mouseover', event => this.handleMouseOver(event));
      currentElement.addEventListener('mouseleave', this.handleMouseLeave);
      currentElement.addEventListener('click', event => this.handleClick(event));
    }
  }

  handleMouseOver(event) {
    document.getElementById(`${this.modal.name}-title`).textContent = this.modal[event.target.id].title;
    document.getElementById(`${this.modal.name}-message`).textContent = this.modal[event.target.id].message;
  }

  handleMouseLeave() {
    document.getElementById(`${this.modal.name}-title`).textContent = this.modal.currentTitle;
    document.getElementById(`${this.modal.name}-message`).textContent = this.modal.currentMessage;
  }

  handleClick(event) {
    if (this.modal.current !== event.target.id) {
      event.target.classList.add("selected", "selected-animation");
      event.target.classList.remove("clickable");
      setTimeout(() => event.target.classList.remove("selected-animation"), 700);
      if (this.modal.current !== "null") {
        document.getElementById(`${this.modal.current}`).classList.add("clickable");
        document.getElementById(`${this.modal.current}`).classList.remove("selected");
      }
      this.modal.current = event.target.id;
      this.modal.currentTitle = this.modal[this.modal.current].title;
      this.modal.currentMessage = this.modal[this.modal.current].message;
      sound.playSound(sound.selectSound, this.modal[this.modal.current].sound);
      this.modal.button.classList.remove("temp-hidden");
    }
  }
}

 // this.mode = {
    //   "name": "mode",
    //   "button": document.getElementById('mode-button'),
    //   "current": "null",
    //   "defaultTitle": "M O D E",
    //   "currentTitle": "M O D E",
    //   "defaultMessage": "Deploy Pod",
    //   "currentMessage": "Deploy Pod",
    //   "itemList": [
    //     "survival",
    //     "time-attack",
    //   ],
    //   "survival": {
    //     "title": "S U R V I V A L",
    //     "message": "Pod X-042",
    //     "display": "Survival",
    //     "sound": document.getElementById("survival-voice"),
    //   },
    //   "time-attack": {
    //     "title": "T I M E - A T T A C K",
    //     "message": "Pod Y-153",
    //     "display": "Time-Attack",
    //     "sound": document.getElementById("time-attack-voice"),
    //   },
    // };

    // this.difficulty = {
    //   "name": "difficulty",
    //   "button": document.getElementById('difficulty-button'),
    //   "current": "null",
    //   "defaultTitle": "D I F F I C U L T Y",
    //   "currentTitle": "D I F F I C U L T Y",
    //   "defaultMessage": "Deploy YoRHa Unit",
    //   "currentMessage": "Deploy YoRHa Unit",
    //   "itemList": [
    //     "easy",
    //     "medium",
    //     "hard",
    //   ],
    //   "easy": {
    //     "title": "E A S Y",
    //     "message": "YoRHa No. 9 Type S",
    //     "time": 99,
    //     "lives": 50,
    //     "display": "Easy",
    //     "sound": document.getElementById("easy-voice"),
    //   },
    //   "medium": {
    //     "title": "M E D I U M",
    //     "message": "YoRHa Type A No. 2",
    //     "time": 60,
    //     "lives": 35,
    //     "display": "Medium",
    //     "sound": document.getElementById("medium-voice"),
    //   },
    //   "hard": {
    //     "title": "H A R D",
    //     "message": "YoRHa No. 2 Type B",
    //     "time": 3,
    //     "lives": 2,
    //     "display": "Hard",
    //     "sound": document.getElementById("hard-voice"),
    //   },
    // };

    // this.location = {
    //   "name": "location",
    //   "button": document.getElementById('location-button'),
    //   "current": "null",
    //   "defaultTitle": "L O C A T I O N",
    //   "currentTitle": "L O C A T I O N",
    //   "defaultMessage": "Select Location",
    //   "currentMessage": "Select Location",
    //   "itemList": [
    //     "sol-2",
    //     "moa-therma",
    //     "vineta-k",
    //     "tech-de-ra",
    //     "metropia",
    //     "anulpha-pass",
    //   ],
    //   "sol-2": {
    //     "title": "L O C A T I O N",
    //     "message": "Sol 2",
    //     "sound": document.getElementById("sol-2-voice"),
    //   },
    //   "moa-therma": {
    //     "title": "L O C A T I O N",
    //     "message": "Moa Therma",
    //     "sound": document.getElementById("moa-therma-voice"),
    //   },
    //   "vineta-k": {
    //     "title": "L O C A T I O N",
    //     "message": "Vineta K",
    //     "sound": document.getElementById("vineta-k-voice"),
    //   },
    //   "tech-de-ra": {
    //     "title": "L O C A T I O N",
    //     "message": "Tech De Ra",
    //     "sound": document.getElementById("tech-de-ra-voice"),
    //   },
    //   "metropia": {
    //     "title": "L O C A T I O N",
    //     "message": "Metropia",
    //     "sound": document.getElementById("metropia-voice"),
    //   },
    //   "anulpha-pass": {
    //     "title": "L O C A T I O N",
    //     "message": "Anulpha Pass",
    //     "sound": document.getElementById("anulpha-pass-voice"),
    //   },
    // };
