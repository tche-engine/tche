(function($){
  "use strict";

  TCHE.accessor($, 'x');
  TCHE.accessor($, 'y');
  TCHE.accessor($, 'direction');
  TCHE.accessor($, 'image');
  
  $.initialize = function(){
  };

  $.update = function(){

  };

  $.move = function(direction) {
    if (direction.indexOf('left') >= 0) {
      this._x -= 3;
    } else if (direction.indexOf('right') >= 0) {
      this._x += 3;
    }

    if (direction.indexOf('up') >= 0) {
      this._y -=3;
    } else if (direction.indexOf('down') >= 0) {
      this._y += 3;
    }
  };

})(TCHE.declareClass('Character'));