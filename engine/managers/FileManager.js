(function(){
  var startedLoadingMaps = false;
  var startedLoadingSprites = false;
  var filesToLoad = 0;

  class FileManager {
    static loadGameSettings() {
      var path = './game.json';

      TCHE.Ajax.loadFileAsync('game', path);
    }

    static loadAllMaps() {
      if (!TCHE.data.game) return;

      startedLoadingMaps = true;
      var maps = TCHE.data.game.maps;

      for (var mapName in maps) {
        this.loadMapData(mapName, maps[mapName]);
      }
    }

    static loadAllSprites() {
      if (!TCHE.data.game) return;

      startedLoadingSprites = true;
      var sprites = TCHE.data.game.sprites;

      for (var spriteName in sprites) {
        this.loadSpriteTexture(sprites[spriteName].image);
      }
    }

    static loadSpriteTexture(imageName) {
      var texture = PIXI.Texture.fromImage(imageName);
      if (texture.baseTexture.isLoading) {
        filesToLoad++;
        texture.baseTexture.addListener('loaded', function(){
          filesToLoad--;
        });
      }
    }

    static loadMapData(mapName, mapType) {
      var path = './maps/' + mapName;
      filesToLoad++;

      TCHE.maps[mapName] = null;
      TCHE.Ajax.loadFileAsync(mapName, path, function(xhr, filePath, name){
        if (xhr.status < 400) {
          TCHE.maps[name] = JSON.parse(xhr.responseText);
          TCHE.maps[name].mapType = mapType;
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
        this.loadAllMaps();
      }

      if (!startedLoadingSprites) {
        this.loadAllSprites();
      }
    }

    static loadTiledMapFiles(mapData) {
      mapData.tilesets.forEach(function(tileset){
        var texture = PIXI.Texture.fromImage('./maps/' + tileset.image);
        if (texture.baseTexture.isLoading) {
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

      TCHE.MapManager.loadMapFiles(mapData);
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