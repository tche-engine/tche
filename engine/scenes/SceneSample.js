(function($){
  "use strict";
  var parent = TCHE.Scene.prototype;

  $.prototype.initialize = function(){
    parent.initialize.call(this);

    this._texture = PIXI.Texture.fromImage('assets/bunny.png');
    this.createBunny();
  };

  $.prototype.update = function(){
    parent.update.call(this);

    this._bunny.managerMove();
  
  };


  $.prototype.terminate = function(){
    parent.terminate.call(this);
  };

  $.prototype.createBunny = function(pos, left) {
    // create a new Sprite using the texture
    this._bunny = new PIXI.Sprite(this._texture);

    // center the sprite's anchor point
    this._bunny.anchor.x = 0.5;
    this._bunny.anchor.y = 0.5;

    // move the sprite to the center of the screen
    this._bunny.position.x = 150;
    this._bunny.position.y = 200;

    this._bunny.managerMove = function(){
        var input = TCHE.InputManager.getDirection();
        if(input == 'left'){
          this.position.x -= 3;
        }else if(input == 'right'){
          this.position.x += 3;
        }else if(input == 'up'){
          this.position.y -=3;
        }else if(input == 'down'){
          this.position.y += 3;
        }
    };

    this.addChild(this._bunny);

  }; 
})(TCHE.declareClass('SceneSample', TCHE.Scene));