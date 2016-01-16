(function(){
  class TiledMap extends TCHE.MapSprite {
    constructor(map) {
      super(map);

      this._layers = [];

      this.createLayers();
    }

    createTileLayer(layer) {
      var layerSprite = new TCHE.TiledLayerSprite(layer);
      this._layers.push(layerSprite);
      this.addChild(layerSprite);
    }

    createLayers() {
      var mapSprite = this;

      this._map.mapData.layers.forEach(function(layer){
        switch(layer.type) {
          case 'tilelayer' :
            mapSprite.createTileLayer(layer);
            break;
          case 'objectgroup' :
            mapSprite.creatObjectLayer(layer);
            break;
        }
      });
    }

    creatObjectLayer(layer) {
      var layerSprite = new TCHE.TiledObjectLayerSprite(layer);
      this._layers.push(layerSprite);
      this.addChild(layerSprite);

      this._map.objects.forEach(function(obj){
        if (obj.layerName == layer.name) {
          layerSprite.createObjectSprite(obj);
        }
      }.bind(this));

      if (layer.properties !== undefined && layer.properties.playerLayer !== undefined) {
        layerSprite.createObjectSprite(TCHE.globals.player);
      }

      layerSprite.update();
    }

    updateLayers(){
      this._layers.forEach(function(layer){
        layer.update();
      });
    }

    update() {
      super.update();

      this.updateLayers();
      
      this.x = TCHE.globals.map.offsetX;
      this.y = TCHE.globals.map.offsetY;
    }
  }
  
  TCHE.registerClass('TiledMap', TiledMap);
})();