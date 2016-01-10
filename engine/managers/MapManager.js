(function(){
  class MapManager {
    static getMapData(mapName) {
      return TCHE.maps[mapName];
    }

    static getMapType(mapData) {
      if (TCHE.mapTypes[mapData.mapType] !== undefined) {
        return TCHE.mapTypes[mapData.mapType];
      } else {
        return TCHE.SpriteType;
      }
    }

    static getMapWidth(mapData) {
      return this.getMapType(mapData).getMapWidth(mapData);
    }
    static getMapHeight(mapData) {
      return this.getMapType(mapData).getMapHeight(mapData);
    }

    static getSpriteClass(mapData) {
      return this.getMapType(mapData).getSpriteClass(mapData);
    }

    static getMapObjects(mapData) {
      return this.getMapType(mapData).getMapObjects(mapData);
    }

    static loadMapFiles(mapData) {
      this.getMapType(mapData).loadMapFiles(mapData);
    }

    static getImportantObjectData(mapData, obj) {
      return this.getMapType(mapData).getImportantObjectData(mapData, obj);
    }
  }
  
  TCHE.registerStaticClass('MapManager', MapManager);
})();