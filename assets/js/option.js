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
