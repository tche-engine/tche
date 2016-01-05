(function($){
  "use strict";

  var parent = TCHE.SceneLoading.prototype;

  $.initialize = function() {
    parent.initialize.call(this);
  };

  $.update = function() {
    parent.update.call(this);

    if (TCHE.FileManager.isLoaded()) {
      TCHE.SceneManager.changeScene(TCHE.SceneMap);
    }
  };
})(TCHE.declareClass('SceneLaunch', TCHE.SceneLoading));