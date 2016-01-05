(function($){
  "use strict";

  $._startedLoadingMaps = false;
  $._loading = 0;

  $._loadGameSettings = function() {
    var path = './game.json';

    TCHE.ajaxLoadFileAsync('game', path);
  };

  $._loadAllMaps = function() {
    if (!TCHE.data.game) return;

    var maps = TCHE.data.game.maps;

    maps.forEach(function(mapName){
      $._loadMapData(mapName);
    });
  };

  $._loadMapData = function(mapName) {
    var path = './maps/' + mapName + '.json';
    $._loading++;

    TCHE.maps[mapName] = null;
    TCHE.ajaxLoadFileAsync(mapName, path, function(xhr, filePath, name){
      if (xhr.status < 400) {
        TCHE.maps[name] = JSON.parse(xhr.responseText);
        $._loading--;
      } else {
        console.log(arguments);
        throw new Error("Failed to load map.");
      }
    }, function(){
      console.log(arguments);
      throw new Error("Failed to load map.");
    });
  };

  $.update = function(){
    if (!TCHE.data.game) {
      if (TCHE.data.game === undefined) {
        $._loadGameSettings();
      }

      return;
    }

    if (!$._startedLoadingMaps) {
      $._startedLoadingMaps = true;
      $._loadAllMaps();
    }
  };

  $.isLoaded = function(){
    if (!TCHE.data.game) return false;
    if (!$._startedLoadingMaps) return false;
    if ($._loading > 0) return false;

    return true;
  };
})(TCHE.declareStaticClass('FileManager'));