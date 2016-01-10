(function(){
  class SceneMap extends TCHE.Scene {
    constructor(params) {
      super();

      TCHE.globals.player.x = TCHE.data.game.player.x;
      TCHE.globals.player.y = TCHE.data.game.player.y;
      TCHE.globals.player.width = TCHE.data.game.player.width;
      TCHE.globals.player.height = TCHE.data.game.player.height;
      TCHE.globals.player.offsetX = TCHE.data.game.player.offsetX;
      TCHE.globals.player.offsetY = TCHE.data.game.player.offsetY;
      TCHE.globals.player.sprite = TCHE.data.game.player.sprite;

      TCHE.globals.map.loadMap(params.mapName);

      var mapData = TCHE.globals.map.mapData;
      var spriteClass = TCHE.MapManager.getSpriteClass(mapData);

      this._mapSprite = new (spriteClass)(TCHE.globals.map);
      this.addChild(this._mapSprite);
    }

    update() {
      super.update();

      TCHE.globals.map.update();
      TCHE.globals.player.update();

      this._mapSprite.update();
    }    

    processClick(pos) {
      TCHE.globals.player.setDest(pos.x - TCHE.globals.map.offsetX, pos.y - TCHE.globals.map.offsetY);
    }
  }
  
  TCHE.registerClass('SceneMap', SceneMap);
})();