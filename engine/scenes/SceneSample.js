(function($){
  "use strict";
  var parent = TCHE.Scene.prototype;

  $.prototype.initialize = function(){
    parent.initialize.call(this);

    //TODO :: como colocar isso no local certo sem criar sempre o path absoluto??
    this._texture = PIXI.Texture.fromImage('http://localhost/tche-maker/sample-game/assets/bunny.png');
    this._bunnies = [];

    for (var j = 10 - 1; j >= 0; j--) {
      for (var i = 10 - 1; i >= 0; i--) {
        this.createBunny({
          x: 100 * j,
          y: 75 * i
        },
        j % 2 === 0);
      }
    }
  };

  $.prototype.update = function(){
    parent.update.call(this);

    for (var i = 0; i < this._bunnies.length; i++) {
      var bunny = this._bunnies[i].bunny;
      var left = this._bunnies[i].left;

      // just for fun, let's rotate mr rabbit a little
      if (left){
        bunny.rotation += 0.1;
      }else{
        bunny.rotation -= 0.1;
      }
    }
  };

  $.prototype.terminate = function(){
    parent.terminate.call(this);
  };

  $.prototype.createBunny = function(pos, left) {
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(this._texture);

    // center the sprite's anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite to the center of the screen
    bunny.position.x = pos.x;
    bunny.position.y = pos.y;

    this.addChild(bunny);
    this._bunnies.push({
      bunny : bunny,
      left : left
    });
  }; 
})(TCHE.declareClass('SceneSample', TCHE.Scene));