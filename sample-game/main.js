TCHE.init({
  initialScene : TCHE.SceneSample,
  playerX : 100,
  playerY : 150,
  playerImage : 'assets/bunny.png'
});

TCHE.InputManager.addKeyCode(113, "FPS");

TCHE.InputManager.addKeyCode(71, "G");

TCHE.InputManager.on("G", function (argument) {
  console.log("teste");
});

TCHE.InputManager.on("up", function (argument) {
  console.log("subiu");
});
