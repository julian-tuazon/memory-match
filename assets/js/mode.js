const myMode = {
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
    "sound": document.getElementById("survival-voice"),
  },
  "time-attack": {
    "title": "T I M E - A T T A C K",
    "message": "Pod Y-153",
    "display": "Time-Attack",
    "sound": document.getElementById("time-attack-voice"),
  },
};
