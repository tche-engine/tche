(function(){
  class MapType {
    static getMapWidth(mapData) {
      return mapData.width;
    }

    static getMapHeight(mapData) {
      return mapData.height;
    }

    static getSpriteClass(mapData) {
      return TCHE.Map2d;
    }

    static getMapObjects(mapData) {
      return [];
    }

    static loadMapFiles(mapData) {
    }
  }

  TCHE.MapType = MapType;

})();