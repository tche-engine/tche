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
      



      // mapData.tilesets.forEach(function(tileset){
      //   let fileName = './map/' + tileset.image;
      //   let fileWidth = layerSprite._layerData.width * mapData.tileWidth;
      //   let fileHeight = layerSprite._layerData.height * mapData.tileHeight;

      //   console.log(fileWidth, fileHeight);

      //   let sprite = PIXI.extras.TilingSprite.fromImage(fileName, fileWidth, fileHeight);
      //   sprite.position.x = layerSprite._layerData.x;
      //   sprite.position.y = layerSprite._layerData.y;
      //   layerSprite._sprites.push(sprite);

      //   layerSprite.addChild(sprite);
      // });


    }

    update() {
    }
  }
  
  TCHE.registerClass('TiledLayerSprite', TiledLayerSprite);
})();