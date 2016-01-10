(function(){
  class TiledMapType extends TCHE.MapType {
    static getMapWidth(mapData) {
      return mapData.width * mapData.tilewidth;
    }

    static getMapHeight(mapData) {
      return mapData.height * mapData.tileheight;
    }

    static getSpriteClass(mapData) {
      return TCHE.TiledMap;
    }

    static getMapObjects(mapData) {
      var objects = [];

      mapData.layers.forEach(function(layer){
        if (layer.type == "objectgroup") {
          objects = objects.concat(layer.objects);
        }
      });

      return objects;
    }    

    static loadMapFiles(mapData) {
      TCHE.FileManager.loadTiledMapFiles(mapData);
    }

    static getImportantObjectData(mapData, obj) {
      return {
        x : obj.x,
        y : obj.y,
        width : obj.width,
        height : obj.height,
        sprite : obj.properties.sprite || '',
        blockedBy : obj.properties.blockedBy || ''
      };
    }    
  }

  TCHE.mapTypes.tiled = TiledMapType;

})();