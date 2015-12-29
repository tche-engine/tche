(function($){
  "use strict";

  $._scene = null;

  $.requestAnimationFrame = function(){
    window.requestAnimationFrame(this.update.bind(this));
  };

  $.update = function(){
    try {

      if (!!this._scene) {
        this._scene.update();

        TCHE.renderer.render(this._scene);
      }

      this.requestAnimationFrame();
    } catch (e) {
      //#ToDo: Create a method to catch exceptions
      BAH.log(e);
    }  
  };

  $.changeScene = function(newScene){
    //#ToDo: Make it properly change from one scene to next
    
    // if (!!this._scene) {
    //   this._scene.terminate();
    // };

    // if (!!newScene) {
    //   this._newScene = newScene;
    // }
    this._scene = newScene;
  };
})(TCHE.declareClass('SceneManager'));