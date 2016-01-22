(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      super.update();
      
      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("ready");

        if (TCHE.Params.param('debug')) {
          TCHE.Validation.checkBasicFiles();
        }

        var initialScene = TCHE.data.game.initialScene;
        if (!TCHE[initialScene]) {
          initialScene = TCHE.SceneTitle;
        } else {
          initialScene = TCHE[initialScene];
        }

        var params = {};

        if (initialScene == TCHE.SceneMap || initialScene.prototype instanceof TCHE.SceneMap) {
          params.mapName = TCHE.data.game.initialMap;
        }

        TCHE.SceneManager.changeScene(initialScene, params);
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();