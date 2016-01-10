(function(){
  class Player extends TCHE.Character {
    constructor() {
      super();
    }

    update() {
      this.processInput();
      super.update();
    }

    processInput() {
      var direction = TCHE.InputManager.getDirection();
      if (!!direction) {
        this.clearDestination();
        
        if (!this.move(direction)) {
          this.updateDirection(direction.split('-'));
        }
      }
    }

    teleport(mapName, x, y) {
      TCHE.data.game.player.x = x;
      TCHE.data.game.player.y = y;

      this.clearDestination();
      TCHE.globals.map.changeMap(mapName);
    }

    requestCollisionMapRefresh() {
      //Don't refresh the collision map for movements of the player.

      
    }
  }
  
  TCHE.registerClass('Player', Player);
})();