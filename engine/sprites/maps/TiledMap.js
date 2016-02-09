(function(){
  class TiledMap extends TCHE.TcheMap {
    constructor(map) {
      super(map);
    }
  }
  
  TCHE.registerClass('TiledMap', TiledMap);
})();