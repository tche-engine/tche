(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("ready");
        console.log(TCHE.settings.initialMap);
        TCHE.SceneManager.changeScene(TCHE.SceneMap, {mapName : TCHE.data.game.initialMap});
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();