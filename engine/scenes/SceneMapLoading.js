(function(){
  class SceneMapLoading extends TCHE.SceneLoading {
    constructor(params) {
      super();
      this._mapName = params.mapName;

      TCHE.FileManager.loadMapFiles(params.mapName);
    }

    update() {
      super.update();

      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("mapLoaded");
        TCHE.SceneManager.changeScene(TCHE.SceneMap, {mapName : this._mapName});
      }
    }    
  }
  
  TCHE.registerClass('SceneMapLoading', SceneMapLoading);
})();