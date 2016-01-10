(function(){
  let startedLoadingMaps = false;
  let filesToLoad = 0;

  class FileManager {
    static loadGameSettings() {
      var path = './game.json';

      TCHE.Ajax.loadFileAsync('game', path);
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
      filesToLoad++;

      TCHE.maps[mapName] = null;
      TCHE.Ajax.loadFileAsync(mapName, path, function(xhr, filePath, name){
        if (xhr.status < 400) {
          TCHE.maps[name] = JSON.parse(xhr.responseText);
          filesToLoad--;
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

      if (!startedLoadingMaps) {
        startedLoadingMaps = true;
        this.loadAllMaps();
      }
    }

    static loadTiledMapFiles(mapData) {
      mapData.tilesets.forEach(function(tileset){
        let texture = PIXI.Texture.fromImage('./maps/' + tileset.image);
        if (texture.isLoading) {
          filesToLoad++;
          texture.baseTexture.addListener('loaded', function(){
            filesToLoad--;
          });
        }
      });
    }

    static loadMapFiles(mapName) {
      var mapData = TCHE.maps[mapName];

      if (!mapData) {
        throw new Error("Invalid map name: " + mapName);
      }

      this.loadTiledMapFiles(mapData);
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
      if (!startedLoadingMaps) return false;
      if (filesToLoad > 0) return false;

      return true;
    }
  }
  
  TCHE.registerStaticClass('FileManager', FileManager);
})();