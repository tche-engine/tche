(function($){
  "use strict";
  var parent = TCHE.Scene.prototype;

  $.prototype.initialize = function(){
    parent.initialize.call(this);

    
  };

  $.prototype.update = function(){
    parent.update.call(this);


  };

  $.prototype.terminate = function(){
    parent.terminate.call(this);
  };
})(TCHE.declareClass('SceneMap', TCHE.Scene));