(function(){
  class SceneMap extends TCHE.Scene {
    constructor(params) {
      super();

      TCHE.globals.player.x = Number(TCHE.data.game.player.x || 0);
      TCHE.globals.player.y = Number(TCHE.data.game.player.y || 0);
      TCHE.globals.player.width = Number(TCHE.data.game.player.width || 0);
      TCHE.globals.player.height = Number(TCHE.data.game.player.height || 0);
      TCHE.globals.player.offsetX = Number(TCHE.data.game.player.offsetX || 0);
      TCHE.globals.player.offsetY = Number(TCHE.data.game.player.offsetY || 0);
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