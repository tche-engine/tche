(function($){
  "use strict";
  var parent = TCHE.SceneMap.prototype;

  $.initialize = function(params){
    parent.initialize.call(this, params);
  };

  $.update = function(){
    parent.update.call(this);

  };


  $.terminate = function(){
    parent.terminate.call(this);
  };
})(TCHE.declareClass('SceneSample', TCHE.SceneMap));
