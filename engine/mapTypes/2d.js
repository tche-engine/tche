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
        blockedBy : obj.blockedBy || ''
      };
    }    
  }

  TCHE.mapTypes["2d"] = Default2DMapType;
})();