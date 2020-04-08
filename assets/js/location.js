class Location {
  constructor() {
    this.name = 'location';
    this.button = document.getElementById('location-button');
    this.current = null;
    this.defaultTitle = 'L O C A T I O N';
    this.currentTitle = 'L O C A T I O N';
    this.defaultMessage = 'Select Location';
    this.currentMessage = 'Select Location';
    this.itemList = [
      'sol',
      'moa',
      'vineta',
      'tech',
      'metropia',
      'anulpha',
    ];
    this.sol = {
      title: 'L O C A T I O N',
      message: 'Sol 2',
      sound: document.getElementById('sol-2-voice'),
    };
    this.moa = {
      title: 'L O C A T I O N',
      message: 'Moa Therma',
      sound: document.getElementById('moa-therma-voice'),
    };
    this.vineta = {
      title: 'L O C A T I O N',
      message: 'Vineta K',
      sound: document.getElementById('vineta-k-voice'),
    };
    this.tech = {
      title: 'L O C A T I O N',
      message: 'Tech De Ra',
      sound: document.getElementById('tech-de-ra-voice'),
    };
    this.metropia = {
      title: 'L O C A T I O N',
      message: 'Metropia',
      sound: document.getElementById('metropia-voice'),
    };
    this.anulpha = {
      title: 'L O C A T I O N',
      message: 'Anulpha Pass',
      sound: document.getElementById('anulpha-pass-voice'),
    };
  }
}
