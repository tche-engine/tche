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

  TCHE.reader($, 'objects', function(){
    if (!!this._mapData) {
      return this._mapData.objects || [];
    }

    return [];
  });

})(TCHE.declareClass('Map'));