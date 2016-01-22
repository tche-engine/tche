(function(){
  class TileManager {
    static getTileTextureFromCache(mapName, tileId) {
      if (this._tileCache === undefined) {
        return undefined;
      }

      return this._tileCache[mapName + tileId];
    }

    static saveTileTextureCache(mapName, tileId, texture) {
      if (this._tileCache === undefined) {
        this._tileCache = {};
      }

      this._tileCache[mapName + tileId] = texture;
    }

    static loadTileTexture(mapName, tileId) {
      var texture = this.getTileTextureFromCache(mapName, tileId);
      if (!!texture) {
        return texture;
      }

      var mapData = TCHE.maps[mapName];
      var tilesets = mapData.tilesets;
      var theTileset;

      tilesets.forEach(function(tileset){
        if (tileId < tileset.firstgid) return;
        if (tileId > tileset.firstgid + tileset.tilecount) return;
        theTileset = tileset;

        return false;
      });

      var columns = theTileset.imagewidth / theTileset.tilewidth;

      var subTileId = tileId - theTileset.firstgid;
      var column = subTileId % columns;
      var line = Math.floor(subTileId / columns);

      var frame = {
        width : theTileset.tilewidth,
        height : theTileset.tileheight,
        x : column * theTileset.tilewidth,
        y : line * theTileset.tileheight
      };

      var baseTexture = PIXI.Texture.fromImage('./map/' + theTileset.image);      
      texture = new PIXI.Texture(baseTexture);
      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          texture.frame = frame;
        });
      } else {
        texture.frame = frame;
      }

      this.saveTileTextureCache(mapName, tileId, texture);

      return texture;
    }

    static getLayerTextureFromCache(mapName, layerName) {
      if (this._layerCache === undefined) {
        return undefined;
      }

      return this._layerCache[mapName + '/' + layerName];
    }

    static saveLayerTextureCache(mapName, layerName, texture) {
      if (this._layerCache === undefined) {
        this._layerCache = {};
      }

      this._layerCache[mapName + '/' + layerName] = texture;
    }
  }
  
  TCHE.registerStaticClass('TileManager', TileManager);
})();