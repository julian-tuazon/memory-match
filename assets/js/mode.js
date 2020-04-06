class Mode {
  constructor() {
    this.name = "mode";
    this.button = document.getElementById('mode-button');
    this.current = null;
    this.defaultTitle = "M O D E";
    this.currentTitle = "M O D E";
    this.defaultMessage = "Deploy Pod";
    this.currentMessage = "Deploy Pod";
    this.itemList = [
      "survival",
      "timeattack",
    ];
    this.survival = {
        title: "S U R V I V A L",
        message: "Pod X-042",
        display: "Survival",
        sound: document.getElementById("survival-voice"),
    };
    this.timeattack = {
        "title": "T I M E - A T T A C K",
        "message": "Pod Y-153",
        "display": "Time-Attack",
        "sound": document.getElementById("time-attack-voice"),
    };
  }
}
