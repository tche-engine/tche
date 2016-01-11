(function(){
  class TiledLayerSprite extends TCHE.Sprite {
    constructor(layerData) {
      super();
      this._layerData = layerData;
      this._texture = null;
      this._sprite = null;
      this.createPixiSprite();
    }

    get layerData() { return this._layerData; } 
    set layerData(value) { this._layerData = value; }

    addSprite(texture, x, y, tileId) {
      let tileX = x * texture.frame.width;
      let tileY = y * texture.frame.height;

      let sprite = new PIXI.Sprite(texture);
      sprite.x = tileX;
      sprite.y = tileY;
      sprite.tileId = tileId;

      let container = new PIXI.Container();
      container.addChild(sprite);

      this._texture.render(container);
    }

    createPixiSprite() {
      this._sprite = null;
      let layerSprite = this;
      let mapName = TCHE.globals.map.mapName;
      let layerData = this._layerData;
      let mapData = TCHE.MapManager.getMapData(mapName);

      let width = mapData.width * mapData.tilewidth;
      let height = mapData.height * mapData.tileheight;

      this._texture = new PIXI.RenderTexture(TCHE.renderer, width, height);

      let index = -1;
      for (let y = 0; y < layerData.height; y++) {
        for (let x = 0; x < layerData.width; x++) {
          index++;
          let tileId = layerData.data[index];
          if (tileId === 0) continue;

          let texture = TCHE.TileManager.loadTileTexture(mapName, tileId);

          if (texture.baseTexture.isLoading) {
            texture.baseTexture.addListener('loaded', function(){
              layerSprite.addSprite(texture, x, y, tileId);
            });
          } else {
            layerSprite.addSprite(texture, x, y, tileId);
          }
        }
      }

      this._sprite = new PIXI.Sprite(this._texture);
      this.addChild(this._sprite);
    }

    update() {
    }
  }
  
  TCHE.registerClass('TiledLayerSprite', TiledLayerSprite);
})();