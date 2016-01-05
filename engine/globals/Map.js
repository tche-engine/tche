(function($){
  "use strict";

  $.initialize = function(){
    this._mapData = {};
  };

  $.update = function(){
    
    
  };

  $.loadMap = function(mapName) {
    this._mapData = TCHE.maps[mapName];

  };

})(TCHE.declareClass('Map'));