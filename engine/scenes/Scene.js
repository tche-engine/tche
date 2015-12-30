(function($){
  "use strict";

  $.prototype.initialize = function(){
    PIXI.Container.call(this);

    //Interactive mode supposedly causes memory leaks, so let's leave it off for now
    this.interactive = false;
  };

  $.prototype.terminate = function(){

  };

  $.prototype.update = function(){


  };
})(TCHE.declareClass('Scene', PIXI.Container));