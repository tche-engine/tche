TCHE.InputManager.addKeyAlias('F2', "FPS");

TCHE.on("ready", function(){
  TCHE.globals.player.on('blockedBy', function(character){
    var mapName = TCHE.globals.map.mapName;

    if (mapName == "yellowMap") {
      mapName = "whiteMap";
    } else {
      mapName = "yellowMap";
    }

    TCHE.globals.player.teleport(mapName, character.x, character.y);
    TCHE.SoundManager.play("sound");
  });
});

TCHE.on("started", function(){
  TCHE.FileManager.loadSoundFile('sound', "assets/bookClose.ogg");
});


TCHE.init({
});

