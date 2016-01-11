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
      var tileX = x * texture.frame.width;
      var tileY = y * texture.frame.height;

      var sprite = new PIXI.Sprite(texture);
      sprite.x = tileX;
      sprite.y = tileY;
      sprite.tileId = tileId;

      var container = new PIXI.Container();
      container.addChild(sprite);

      this._texture.render(container);
    }

    onLoadTexture() {
      var {x, y, texture, layerSprite, tileId} = this;
      layerSprite.addSprite(texture, x, y, tileId);
    }

    createPixiSprite() {
      var layerData = this._layerData;
      var mapName = TCHE.globals.map.mapName;

      this._texture = TCHE.TileManager.getLayerTextureFromCache(mapName, layerData.name);
      if (!this._texture) {
        var layerSprite = this;
        var mapData = TCHE.MapManager.getMapData(mapName);

        var width = mapData.width * mapData.tilewidth;
        var height = mapData.height * mapData.tileheight;

        this._texture = new PIXI.RenderTexture(TCHE.renderer, width, height);

        var index = -1;
        for (var y = 0; y < layerData.height; y++) {
          for (var x = 0; x < layerData.width; x++) {
            index++;
            var tileId = layerData.data[index];
            if (tileId === 0) continue;

            var texture = TCHE.TileManager.loadTileTexture(mapName, tileId);

            texture.baseTexture._futureX = x;
            texture.baseTexture._futureY = y;
            texture.baseTexture._futureTileId = tileId;
            texture.baseTexture._futureLayer = layerSprite;
            texture.baseTexture._futureTexture = texture;

            if (texture.baseTexture.isLoading) {
              texture.baseTexture.addListener('loaded', layerSprite.onLoadTexture.bind({
                x : x,
                y : y,
                tileId : tileId,
                texture : texture,
                layerSprite : layerSprite
              }));
            } else {
              layerSprite.addSprite(texture, x, y, tileId);
            }
          }
        }

        TCHE.TileManager.saveLayerTextureCache(mapName, layerData.name, this._texture);
      }
      
      this._sprite = new PIXI.Sprite(this._texture);
      this.addChild(this._sprite);
    }

    update() {
    }
  }
  
  TCHE.registerClass('TiledLayerSprite', TiledLayerSprite);
})();