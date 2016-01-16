(function(){
  class TiledObjectLayerSprite extends TCHE.Sprite {
    constructor(layerData) {
      super();
      this._layerData = layerData;
      this._objectSprites = [];
      this._countdown = 0;
    }

    get layerData() { return this._layerData; } 
    set layerData(value) { this._layerData = value; }

    updateSprites() {
      this._objectSprites.forEach(function(sprite){
        sprite.update();
      });
    }

    update() {
      this.updateSprites();

      if (!!this._countdown && this._countdown > 0) {
        this._countdown--;

        return;
      }

      this._countdown = 10;
      this.refreshSprites();
    }

    refreshSprites() {
      this.removeChildren();

      this._objectSprites.sort(function(obj1, obj2){
        var diffY = obj1.y - obj2.y;

        if (diffY !== 0) {
          return diffY;
        }

        return obj1.x - obj2.x;
      });

      this._objectSprites.forEach(function(obj) {
        this.addChild(obj);
      }.bind(this));
    }

    createObjectSprite(obj) {
      var objSprite = new TCHE.CharacterSprite(obj);
      this._objectSprites.push(objSprite);
    }
  }
  
  TCHE.registerClass('TiledObjectLayerSprite', TiledObjectLayerSprite);
})();