(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      if (TCHE.FileManager.isLoaded()) {
        TCHE.SceneManager.changeScene(TCHE.SceneMap);
      }      
    }    
  }
  
  TCHE.SceneLaunch = SceneLaunch;
})();