TCHE.InputManager.addKeyAlias('F2', "FPS");

TCHE.on("ready", function(){ 
  TCHE.globals.player.on('blockedBy', function(){
    console.log('bloqueou', arguments);
  });
});
TCHE.on("started", function(){ console.log("started");});


TCHE.init({
});

