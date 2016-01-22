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
          layer.objects.forEach(function(object) {
            object.layerName = layer.name;
          });

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
        x : Math.round(obj.x),
        y : Math.round(obj.y),
        width : Math.round(obj.width),
        height : Math.round(obj.height),
        sprite : obj.properties.sprite || '',
        class : obj.properties.class || undefined,
        objectType : obj.properties.objectType || '',
        offsetX : Number(obj.properties.offsetX) || 0,
        offsetY : Number(obj.properties.offsetY) || 0,
        ghost : !!obj.properties.ghost && obj.properties.ghost != "false" && obj.properties.ghost !== "0",
        layerName : obj.layerName
      };
    }
  }

  TCHE.mapTypes.tiled = TiledMapType;

})();