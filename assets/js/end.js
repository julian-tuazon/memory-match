class End {
  constructor() {}

  setDisplay(message, accuracy, timeLives) {
    document.getElementById("end-message").textContent = message;
    document.getElementById("end-accuracy").textContent = accuracy;
    document.getElementById("end-time-lives").textContent = timeLives;
  }
}
