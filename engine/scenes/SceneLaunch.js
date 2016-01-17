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

        TCHE.SceneManager.changeScene(TCHE.SceneTitle);
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();