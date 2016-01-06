(function(){
  class SceneMap extends TCHE.Scene {
    constructor() {
      super();

      TCHE.globals.player.x = TCHE.data.game.player.x;
      TCHE.globals.player.y = TCHE.data.game.player.y;
      TCHE.globals.player.width = TCHE.data.game.player.width;
      TCHE.globals.player.height = TCHE.data.game.player.height;
      TCHE.globals.player.image = TCHE.data.game.player.image;

      TCHE.globals.map.loadMap(TCHE.data.game.initialMap);

      this._mapSprite = new TCHE.Map2d(TCHE.globals.map);
      this.addChild(this._mapSprite);
    }

    update() {
      super.update();
      this._mapSprite.update();
    }    
  }
  
  TCHE.SceneMap = SceneMap;
})();