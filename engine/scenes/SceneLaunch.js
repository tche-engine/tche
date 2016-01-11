(function(){
  class SceneLaunch extends TCHE.SceneLoading {
    constructor() {
      super();
    }

    update() {
      super.update();
      
      if (TCHE.FileManager.isLoaded()) {
        TCHE.fire("ready");

        TCHE.SceneManager.changeScene(TCHE.SceneTitle);
      }
    }    
  }
  
  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();