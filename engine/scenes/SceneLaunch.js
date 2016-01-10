(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      super.update();
      
      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("ready");

        TCHE.globals.map.changeMap(TCHE.data.game.initialMap);
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();