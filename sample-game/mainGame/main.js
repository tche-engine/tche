TCHE.InputManager.addKeyAlias('F2', "FPS");

TCHE.on("ready", function(){ 
  TCHE.globals.player.on('blockedBy', function(character){
    var oldImage = TCHE.globals.player.image;
    TCHE.globals.player.image = character.image;
    character.image = oldImage;
  });
});
TCHE.on("started", function(){ console.log("started");});


TCHE.init({
});

