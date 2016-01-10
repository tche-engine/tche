(function(){
  class MapManager {
    static getMapData(mapName) {
      return TCHE.maps[mapName];
    }

    static getMapType(mapData) {
      return TCHE.mapTypes.tiled;
      
      // if (TCHE.spriteTypes[spriteData.type] !== undefined) {
      //   return TCHE.spriteTypes[spriteData.type];
      // } else {
      //   return TCHE.SpriteType;
      // }
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
  }
  
  TCHE.registerStaticClass('MapManager', MapManager);
})();