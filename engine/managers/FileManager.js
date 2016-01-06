(function(){
  let _startedLoadingMaps = false;
  let _loading = 0;

  class FileManager {
    static _loadGameSettings() {
      var path = './game.json';

      TCHE.ajaxLoadFileAsync('game', path);
    }

    static _loadAllMaps() {
      if (!TCHE.data.game) return;

      var maps = TCHE.data.game.maps;

      maps.forEach(function(mapName){
        this._loadMapData(mapName);
      }.bind(this));
    }

    static _loadMapData(mapName) {
      var path = './maps/' + mapName + '.json';
      _loading++;

      TCHE.maps[mapName] = null;
      TCHE.ajaxLoadFileAsync(mapName, path, function(xhr, filePath, name){
        if (xhr.status < 400) {
          TCHE.maps[name] = JSON.parse(xhr.responseText);
          _loading--;
        } else {
          console.log(arguments);
          throw new Error("Failed to load map.");
        }
      }, function(){
        console.log(arguments);
        throw new Error("Failed to load map.");
      });      
    }

    static update() {
      if (!TCHE.data.game) {
        if (TCHE.data.game === undefined) {
          this._loadGameSettings();
        }

        return;
      }

      if (!_startedLoadingMaps) {
        _startedLoadingMaps = true;
        this._loadAllMaps();
      }
    }

    static isLoaded() {
      if (!TCHE.data.game) return false;
      if (!_startedLoadingMaps) return false;
      if (_loading > 0) return false;

      return true;      
    }
  }
  
  TCHE.FileManager = FileManager;
})();