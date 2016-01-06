(function(){
  class Player extends TCHE.Character {
    constructor() {
      super();
    }

    update() {
      super.update();
      this.processInput();
    }

    processInput() {
      var direction = TCHE.InputManager.getDirection();
      if (!!direction) {
        this.move(direction);
      }
    }
  }
  
  TCHE.Player = Player;
})();