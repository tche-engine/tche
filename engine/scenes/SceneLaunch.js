(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("ready");
        TCHE.SceneManager.changeScene(TCHE.SceneMap);
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();