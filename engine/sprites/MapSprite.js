(function(){
  class MapSprite extends TCHE.Sprite {
    constructor(map) {
      super();
      this._map = map;
    }

    get map() { return this._map; } 
    set map(value) { this._map = value; }
  }
  
  TCHE.registerClass('MapSprite', MapSprite);
})();