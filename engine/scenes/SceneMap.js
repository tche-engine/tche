(function($){
  "use strict";
  var parent = TCHE.Scene.prototype;

  $.initialize = function(){
    parent.initialize.call(this);

    
  };

  $.update = function(){
    parent.update.call(this);


  };

  $.terminate = function(){
    parent.terminate.call(this);
  };
})(TCHE.declareClass('SceneMap', TCHE.Scene));