(function(){
  let _startedLoadingMaps = false;
  let _loading = 0;

  class FileManager {
    static loadGameSettings() {
      var path = './game.json';

      TCHE.ajaxLoadFileAsync('game', path);
    }

    static loadAllMaps() {
      if (!TCHE.data.game) return;

      var maps = TCHE.data.game.maps;

      maps.forEach(function(mapName){
        this.loadMapData(mapName);
      }.bind(this));
    }

    static loadMapData(mapName) {
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
          this.loadGameSettings();
        }

        return;
      }

      if (!_startedLoadingMaps) {
        _startedLoadingMaps = true;
        this.loadAllMaps();
      }
    }

    //Sound files are loaded by the sound lib
    static loadSoundFile(name, path) {
      createjs.Sound.registerSound({src : path, id : name});
    }

    static loadSoundList(list, path = "./assets/") {
      createjs.Sound.createjs.Sound.registerSounds(list, path);
    }

    static isLoaded() {
      if (!TCHE.data.game) return false;
      if (!_startedLoadingMaps) return false;
      if (_loading > 0) return false;

      return true;
    }
  }
  
  TCHE.registerStaticClass('FileManager', FileManager);
})();