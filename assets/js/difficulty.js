class Difficulty {
  constructor() {
    this.name = 'difficulty';
    this.button = document.getElementById('difficulty-button');
    this.current = null;
    this.defaultTitle = 'D I F F I C U L T Y';
    this.currentTitle = 'D I F F I C U L T Y';
    this.defaultMessage = 'Deploy YoRHa Unit';
    this.currentMessage = 'Deploy YoRHa Unit';
    this.itemList = [
      'easy',
      'medium',
      'hard',
    ];
    this.easy = {
      'title': 'E A S Y',
      'message': 'YoRHa No. 9 Type S',
      'time': 99,
      'lives': 50,
      'display': 'Easy',
      'sound': document.getElementById('easy-voice'),
    };
    this.medium = {
      'title': 'M E D I U M',
      'message': 'YoRHa Type A No. 2',
      'time': 60,
      'lives': 35,
      'display': 'Medium',
      'sound': document.getElementById('medium-voice'),
    };
    this.hard = {
      'title': 'H A R D',
      'message': 'YoRHa No. 2 Type B',
      'time': 30,
      'lives': 20,
      'display': 'Hard',
      'sound': document.getElementById('hard-voice'),
    };
  }
}
