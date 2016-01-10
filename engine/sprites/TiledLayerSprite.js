(function(){
  class TiledLayerSprite extends TCHE.Sprite {
    constructor(layerData) {
      super();
      this._layerData = layerData;
      this._sprites = [];
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

      this._sprites.push(sprite);
      this.addChild(sprite);
    }

    createPixiSprite() {
      //Create one sprite for each tile of the layer
      this._sprites = [];

      let layerSprite = this;
      let mapName = TCHE.globals.map.mapName;
      let layerData = this._layerData;

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
    }

    update() {
    }
  }
  
  TCHE.registerClass('TiledLayerSprite', TiledLayerSprite);
})();