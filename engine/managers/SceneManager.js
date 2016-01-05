(function($){
  "use strict";

  $._scene = null;

  $.requestAnimationFrame = function(){
    window.requestAnimationFrame($.update.bind($));
  };

  $._doSceneChange = function() {
    if ($._newScene !== undefined) {
      if (!!$._scene) {
        $._scene.terminate();
        $._scene = undefined;
      }

      if (!!$._newScene) {
        $._scene = new ($._newScene)();
      }
    }

    $._newScene = undefined;
  };

  $.update = function(){
    TCHE.startFrame();

    $._doSceneChange();

    TCHE.FileManager.update();
    TCHE.InputManager.update();

    TCHE.globals.map.update();
    TCHE.globals.player.update();

    if (!!$._scene) {
      $._scene.update();

      TCHE.renderer.render($._scene);
    }

    TCHE.endFrame();

    //If there's no active scene, then end the game
    if (!!$._scene) {
      $.requestAnimationFrame();
    }
  };

  $.changeScene = function(newScene){
    $._newScene = newScene;
  };

  $.start = function(initialScene) {
    $.changeScene(initialScene);
    $.requestAnimationFrame();
  };

  $.end = function() {
    $.changeScene(null);
  };

})(TCHE.declareStaticClass('SceneManager'));