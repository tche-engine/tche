(function(){
  class Map2d extends TCHE.MapSprite {
    constructor(map) {
      super(map);

      this._objectSprites = [];

      this.createBackground();
      this.createObjects();

      this.createPlayer();      
    }

    createBackground() {
      this._backgroundGraphic = new PIXI.Graphics();
      this._backgroundGraphic.beginFill(this._map._mapData["background-color"]);
      this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
      this._backgroundGraphic.endFill();

      this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
      this._backgroundTexture.render(this._backgroundGraphic);

      this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

      this.addChild(this._backgroundSprite);
    }

    createPlayer() {
      this._playerSprite = new TCHE.CharacterSprite(TCHE.globals.player);
      this.addChild(this._playerSprite);
    }

    createObjects() {
      this._objectSprites = [];

      this._map._mapData.objects.forEach(function(obj){
        var objSprite = new TCHE.CharacterSprite(obj);
        this._objectSprites.push(objSprite);
        this.addChild(objSprite);
      }.bind(this));
    }

    updatePlayer(){
      this._playerSprite.update();
    }

    updateObjects(){
      this._objectSprites.forEach(function(objSprite) {
        objSprite.update();
      });
    }

    update() {
      super.update();

      this.updateObjects();
      this.updatePlayer();
    }
  }
  
  TCHE.registerClass('Map2d', Map2d);
})();