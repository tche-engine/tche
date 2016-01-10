(function(){
  class TiledMapType extends TCHE.MapType {
    static getMapWidth(mapData) {
      return mapData.width * mapData.tileWidth;
    }

    static getMapHeight(mapData) {
      return mapData.height * mapData.tileHeight;
    }

    static getSpriteClass(mapData) {
      return TCHE.TiledMap;
    }
  }

  TCHE.mapTypes.tiled = TiledMapType;

})();