(function(){
  class TileManager {
    static getTileTextureFromCache(mapName, tileId) {
      if (this._textureCache === undefined) {
        return undefined;
      }

      return this._textureCache[mapName + tileId];
    }

    static saveTileTextureCache(mapName, tileId, texture) {
      if (this._textureCache === undefined) {
        this._textureCache = {};
      }

      this._textureCache[mapName + tileId] = texture;
    }

    static loadTileTexture(mapName, tileId) {
      let texture = this.getTileTextureFromCache(mapName, tileId);
      if (!!texture) {
        return texture;
      }

      let mapData = TCHE.maps[mapName];
      let tilesets = mapData.tilesets;
      let theTileset;

      tilesets.forEach(function(tileset){
        if (tileId < tileset.firstgid) return;
        if (tileId > tileset.firstgid + tileset.tilecount) return;
        theTileset = tileset;

        return false;
      });

      let subTileId = tileId - theTileset.firstgid;
      let column = subTileId % theTileset.columns;
      let line = Math.floor(subTileId / theTileset.columns);

      let frame = {
        width : theTileset.tilewidth,
        height : theTileset.tileheight,
        x : column * theTileset.tilewidth,
        y : line * theTileset.tileheight
      };

      let baseTexture = PIXI.Texture.fromImage('./map/' + theTileset.image);      
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
  }
  
  TCHE.registerStaticClass('TileManager', TileManager);
})();