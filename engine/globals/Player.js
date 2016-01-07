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

    teleport(mapName, x, y) {
      TCHE.data.game.player.x = x;
      TCHE.data.game.player.y = y;
      
      TCHE.globals.map.changeMap(mapName);
    }
  }
  
  TCHE.registerClass('Player', Player);
})();