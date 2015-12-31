(function($){
  "use strict";

  var parent = PIXI.Container;

  //The sprite property of the Sprite class is a PIXI sprite.
  TCHE.accessor($, 'sprite');

  $.initialize = function(){
    this._sprite = null;
  };

})(TCHE.declareClass('Sprite', PIXI.Container));