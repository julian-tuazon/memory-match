class Modal {
  constructor() {
    this.mode = new Mode();
    this.difficulty = new Difficulty();
    this.location = new Location();
    this.modalList = [this.mode, this.difficulty, this.location];
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  initializeModals() {
    this.modalList.forEach(modal => this.addEventListeners(modal));
  }

  resetModals() {
    this.modalList.forEach(modal => {
      document.getElementById(`${modal.name}-title`).textContent = modal.currentTitle = modal.defaultTitle;
      document.getElementById(`${modal.name}-message`).textContent = modal.currentMessage = modal.defaultMessage;
      document.getElementById(`${modal.current}`).classList.add("clickable");
      document.getElementById(`${modal.current}`).classList.remove("selected", "selected-animation");
      modal.current = null;
    });
  }

  addEventListeners(modal) {
    for (let i = 0; i < modal.itemList.length; i++) {
      let currentElement = document.getElementById(`${modal.itemList[i]}`);
      currentElement.addEventListener('mouseover', event => this.handleMouseOver(event, modal));
      currentElement.addEventListener('mouseleave', () => this.handleMouseLeave(modal));
      currentElement.addEventListener('click', event => this.handleClick(event, modal));
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
      setTimeout(() => event.target.classList.remove("selected-animation"), 700);
      if (modal.current) {
        document.getElementById(`${modal.current}`).classList.add("clickable");
        document.getElementById(`${modal.current}`).classList.remove("selected");
      }
      modal.current = event.target.id;
      modal.currentTitle = modal[modal.current].title;
      modal.currentMessage = modal[modal.current].message;
      sound.playSound(sound.selectSound, modal[modal.current].sound);
      modal.button.classList.remove("temp-hidden");
    }
  }
}
