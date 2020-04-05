class Location {
  constructor() {
    this.name = "location";
    this.button = document.getElementById('location-button');
    this.current = 'null';
    this.defaultTitle = "L O C A T I O N";
    this.currentTitle = "L O C A T I O N";
    this.defaultMessage = "Select Location";
    this.currentMessage = "Select Location";
    this.itemList = [
      "sol",
      "moaTherma",
      "vinetaK",
      "techDeRa",
      "metropia",
      "anulphaPass",
    ];
    this.sol = {
      "title": "L O C A T I O N",
      "message": "Sol 2",
      "sound": document.getElementById("sol-2-voice"),
    };
    this.moaTherma = {
      "title": "L O C A T I O N",
      "message": "Moa Therma",
      "sound": document.getElementById("moa-therma-voice"),
    };
    this.vinetaK = {
      "title": "L O C A T I O N",
      "message": "Vineta K",
      "sound": document.getElementById("vineta-k-voice"),
    };
    this.techDeRa = {
      "title": "L O C A T I O N",
      "message": "Tech De Ra",
      "sound": document.getElementById("tech-de-ra-voice"),
    };
    this.metropia = {
      "title": "L O C A T I O N",
      "message": "Metropia",
      "sound": document.getElementById("metropia-voice"),
    };
    this.anulphaPass = {
      "title": "L O C A T I O N",
      "message": "Anulpha Pass",
      "sound": document.getElementById("anulpha-pass-voice"),
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
  }
};
