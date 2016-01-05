(function($){
  "use strict";

  var parent = TCHE.Sprite.prototype;

  TCHE.accessor($, 'map');

  $.initialize = function(map) {
    parent.initialize.call(this);
    this._map = map;
  };

  $.update = function() {
  };
})(TCHE.declareClass('MapSprite', TCHE.Sprite));