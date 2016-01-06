(function($){
  "use strict";
  var parent = TCHE.Scene.prototype;

  $.initialize = function(){
    parent.initialize.call(this);

    TCHE.globals.player._x = TCHE.data.game.player.x;
    TCHE.globals.player._y = TCHE.data.game.player.y;
    TCHE.globals.player._image = TCHE.data.game.player.image;


    TCHE.globals.map.loadMap(TCHE.data.game.initialMap);

    this._mapSprite = new TCHE.Map2d(TCHE.globals.map);
    this.addChild(this._mapSprite);
  };

  $.update = function(){
    parent.update.call(this);

    this._mapSprite.update();

    // this._playerSprite.update();
  };

  $.terminate = function(){
    parent.terminate.call(this);
  };
})(TCHE.declareClass('SceneMap', TCHE.Scene));