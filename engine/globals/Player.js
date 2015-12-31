(function($){
  "use strict";

  var parent = TCHE.Character.prototype;

  $.initialize = function(){
    parent.initialize.call(this);
    
    this._x = TCHE.settings.playerX;
    this._y = TCHE.settings.playerY;
    this._image = TCHE.settings.playerImage;
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