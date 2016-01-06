(function($){
  "use strict";

  var parent = TCHE.MapSprite.prototype;



  $.createBackground = function() {
    this._backgroundGraphic = new PIXI.Graphics();
    this._backgroundGraphic.beginFill(this._map._mapData["background-color"]);
    this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
    this._backgroundGraphic.endFill();

    this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
    this._backgroundTexture.render(this._backgroundGraphic);

    this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

    this.addChild(this._backgroundSprite);
  };

  $.createPlayer = function() {
    this._playerSprite = new TCHE.CharacterSprite(TCHE.globals.player);
    this.addChild(this._playerSprite);
  };

  $.createObjects = function() {
    this._objects = [];
    this._objectSprites = [];

    this._map.objects.forEach(function(obj){
      var objCharacter = new TCHE.Character();
      objCharacter.x = obj.x;
      objCharacter.y = obj.y;
      objCharacter.image = obj.image;

      this._objects.push(objCharacter);

      var objSprite = new TCHE.CharacterSprite(objCharacter);
      this._objectSprites.push(objSprite);
      this.addChild(objSprite);
    }.bind(this));
  };

  $.updatePlayer = function(){
    this._playerSprite.update();
  };

  $.updateObjects = function(){
    this._objectSprites.forEach(function(objSprite) {
      objSprite.update();
    });
  };

  $.initialize = function(map) {
    parent.initialize.call(this, map);

    this.createBackground();
    this.createObjects();

    this.createPlayer();
  };

  $.update = function() {
    parent.update.call(this);

    this.updateObjects();
    this.updatePlayer();
  };
})(TCHE.declareClass('Map2d', TCHE.MapSprite));