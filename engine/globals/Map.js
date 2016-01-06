(function(){
  class Map {
    constructor() {
      this._mapData = {};
    }

    get mapData() { return this._mapData; } 
    set mapData(value) { this._mapData = value; }

    get objects() {
      if (!!this._mapData) {
        return this._mapData.objects || [];
      }
      return [];
    }

    update() {
      
    }

    loadMap(mapName) {
      this._mapData = TCHE.maps[mapName];
    }
  }
  
  TCHE.Map = Map;
})();