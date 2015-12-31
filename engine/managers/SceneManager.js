(function($){
  "use strict";

  $._scene = null;

  $.requestAnimationFrame = function(){
    window.requestAnimationFrame($.update.bind($));
  };

  $.update = function(){
    // try {
      TCHE.startFrame();

      TCHE.globals.player.update();

      if (!!$._scene) {
        $._scene.update();

        TCHE.renderer.render($._scene);
      }

      TCHE.endFrame();
      $.requestAnimationFrame();
    // } catch (e) {
    //   //#ToDo: Create a method to catch exceptions
    //   BAH.log(e);
    // }  
  };

  $.changeScene = function(newScene){
    //#ToDo: Make it properly change from one scene to next
    
    // if (!!$._scene) {
    //   $._scene.terminate();
    // };

    // if (!!newScene) {
    //   $._newScene = newScene;
    // }
    $._scene = newScene;
  };
})(TCHE.declareStaticClass('SceneManager'));