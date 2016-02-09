(function(){
  class TcheMapType extends TCHE.MapType {
    static getMapWidth(mapData) {
      return mapData.width * mapData.tilewidth;
    }

    static getMapHeight(mapData) {
      return mapData.height * mapData.tileheight;
    }

    static getSpriteClass(mapData) {
      return TCHE.TcheMap;
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

    static getTileFrame(mapData, tileset, tileId) {
      var columns = (tileset.imagewidth + tileset.spacing) / (tileset.tilewidth + tileset.spacing / 2);

      var subTileId = tileId - tileset.firstgid;
      var column = subTileId % columns;
      var line = Math.floor(subTileId / columns);

      var frame = {
        width : tileset.tilewidth,
        height : tileset.tileheight,
        x : 0,
        y : 0
      };

      var xSpacing = Math.floor(column / 2) * tileset.spacing;
      var ySpacing = Math.floor(line / 2) * tileset.spacing;

      frame.x = (column * tileset.tilewidth) + xSpacing;
      frame.y = (line * tileset.tileheight) + ySpacing;

      return frame;
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

  TCHE.mapTypes.tche = TcheMapType;
})();