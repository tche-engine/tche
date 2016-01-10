(function(){
  class TiledMap extends TCHE.MapSprite {
    constructor(map) {
      super(map);

      this._objectSprites = [];
      this._layers = [];

      this.createLayers();
      // this.createObjects();

      this.createPlayer();      
    }

    createTileLayer(layer) {
      var layerSprite = new TCHE.TiledLayerSprite(layer);
      this._layers.push(layerSprite);
      this.addChild(layerSprite);
    }

    createLayers() {
      var mapSprite = this;

      this._map.mapData.layers.forEach(function(layer){
        if (layer.type == "tilelayer") {
          mapSprite.createTileLayer(layer);
        }
      });
    }

    createPlayer() {
      this._playerSprite = new TCHE.CharacterSprite(TCHE.globals.player);
      this.addChild(this._playerSprite);
    }

    createObjects() {
      this._objectSprites = [];

      this._map.objects.forEach(function(obj){
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
  
  TCHE.registerClass('TiledMap', TiledMap);
})();