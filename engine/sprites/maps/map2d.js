(function($){
  "use strict";

  var parent = TCHE.MapSprite.prototype;

  $.initialize = function(map) {
    parent.initialize.call(this, map);

    this._backgroundGraphic = new PIXI.Graphics();
    this._backgroundGraphic.beginFill(map._mapData["background-color"]);
    this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
    this._backgroundGraphic.endFill();

    this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
    this._backgroundTexture.render(this._backgroundGraphic);

    this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

    this.addChild(this._backgroundSprite);

    this._playerSprite = new TCHE.CharacterSprite(TCHE.globals.player);
    this.addChild(this._playerSprite);
  };

  $.update = function() {
    parent.update.call(this);

    this._playerSprite.update();
  };
})(TCHE.declareClass('Map2d', TCHE.MapSprite));