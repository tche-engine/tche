(function($){
  "use strict";

  var parent = TCHE.Character.prototype;

  $.initialize = function(){
    parent.initialize.call(this);
  };

  $.update = function(){
    parent.update.call(this);

    this.processInput();
  };

  $.processInput = function(){
    var direction = TCHE.InputManager.getDirection();

    if (!!direction) {
      this.move(direction);
    }
  };
})(TCHE.declareClass('Player', TCHE.Character));
