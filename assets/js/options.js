class Options {
  constructor() {
    this.mode = new Mode();
    this.difficulty = new Difficulty();
    this.location = new Location();
    this.optionList = [this.mode, this.difficulty, this.location];
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  initializeOptions() {
    this.optionList.forEach(option => this.addEventListeners(option));
  }

  resetOptions() {
    this.optionList.forEach(option => {
      document.getElementById(`${option.name}-title`).textContent = option.currentTitle = option.defaultTitle;
      document.getElementById(`${option.name}-message`).textContent = option.currentMessage = option.defaultMessage;
      document.getElementById(`${option.current}`).classList.add('clickable');
      document.getElementById(`${option.current}`).classList.remove('selected', 'selected-animation');
      option.current = null;
    });
  }

  addEventListeners(option) {
    for (let i = 0; i < option.itemList.length; i++) {
      const currentElement = document.getElementById(`${option.itemList[i]}`);
      currentElement.addEventListener('mouseover', event => this.handleMouseOver(event, option));
      currentElement.addEventListener('mouseleave', () => this.handleMouseLeave(option));
      currentElement.addEventListener('click', event => this.handleClick(event, option));
    }
  }

  handleMouseOver(event, option) {
    document.getElementById(`${option.name}-title`).textContent = option[event.target.id].title;
    document.getElementById(`${option.name}-message`).textContent = option[event.target.id].message;
  }

  handleMouseLeave(option) {
    document.getElementById(`${option.name}-title`).textContent = option.currentTitle;
    document.getElementById(`${option.name}-message`).textContent = option.currentMessage;
  }

  handleClick(event, option) {
    if (option.current !== event.target.id) {
      event.target.classList.add('selected', 'selected-animation');
      event.target.classList.remove('clickable');
      setTimeout(() => event.target.classList.remove('selected-animation'), 700);
      if (option.current) {
        document.getElementById(`${option.current}`).classList.add('clickable');
        document.getElementById(`${option.current}`).classList.remove('selected');
      }
      option.current = event.target.id;
      option.currentTitle = option[option.current].title;
      option.currentMessage = option[option.current].message;
      sound.playSound(sound.selectSound, option[option.current].sound);
      option.button.classList.remove('invisible');
    }
  }
}
