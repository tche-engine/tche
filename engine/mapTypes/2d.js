(function(){
  class Default2DMapType extends TCHE.MapType {
    static getMapObjects(mapData) {
      return mapData.objects;
    }    

    static getImportantObjectData(mapData, obj) {
      return {
        x : obj.x,
        y : obj.y,
        width : obj.width,
        height : obj.height,
        sprite : obj.sprite || '',
        objectType : obj.objectType || '',
        ghost : !!obj.ghost && obj.ghost !== "false" && obj.ghost !== "0"
      };
    }    
  }

  TCHE.mapTypes["2d"] = Default2DMapType;
})();