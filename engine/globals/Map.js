(function(){
  let collisionMapDirty = true;
  let shouldCreateCollisionMap = true;

  class Map {
    constructor() {
      this._mapData = {};
      this._objects = [];
      this._collisionMap = [];
      this._mapName = null;
    }

    get mapName() { return this._mapName; }

    get mapData() { return this._mapData; } 
    set mapData(value) {
      this._mapData = value;
      this._objects = [];
      this.createObjects();
    }

    get width() { return this._mapData.width || 0; }
    get height() { return this._mapData.height || 0; }

    get objects() {
      return this._objects;
    }

    get collisionMap() {
      if (shouldCreateCollisionMap) {
        this.createCollisionMap();
      }

      return this._collisionMap;
    }

    requestCollisionMapRefresh() {
      collisionMapDirty = true;
    }

    createObjects() {
      var objectList = [];

      if (!!this._mapData) {
        objectList = this._mapData.objects || objectList;
      }

      objectList.forEach(function(obj){
        var objCharacter = new TCHE.Character();
        objCharacter.x = obj.x;
        objCharacter.y = obj.y;
        objCharacter.width = obj.width;
        objCharacter.height = obj.height;
        objCharacter.image = obj.image;

        this._objects.push(objCharacter);
      }.bind(this));

      collisionMapDirty = true;
      shouldCreateCollisionMap = true;
    }

    addCharacterToCollisionMap(character) {
      for (let x = character.x; x < character.rightX; x++) {
        for (let y = character.y; y < character.bottomY; y++) {
          if (this._collisionMap.length < x || !this._collisionMap[x]) {
            this._collisionMap[x] = [];
          }
          if (this._collisionMap[x].length < y || !this._collisionMap[x][y]) {
            this._collisionMap[x][y] = [];
          }

          this._collisionMap[x][y].push(character);
        }
      }
    }

    // Go over all objects to form a list of blocked pixels
    createCollisionMap() {
      this._collisionMap = [];

      for (let i = 0; i < this._objects.length; i++) {
        let obj = this._objects[i];

        this.addCharacterToCollisionMap(obj);
      }

      this.addCharacterToCollisionMap(TCHE.globals.player);
      collisionMapDirty = false;
      shouldCreateCollisionMap = false;
    }

    update() {
      if (collisionMapDirty) {
        shouldCreateCollisionMap = true;
      }
    }

    isValid(x, y) {
      if (x >= this.width) return false;
      if (y >= this.height) return false;
      if (x < 0) return false;
      if (y < 0) return false;

      return true;
    }

    isCollided(x, y, character) {
      if (x > this.collisionMap.length) return false;
      if (!this.collisionMap[x]) return false;
      if (y > this.collisionMap[x].length) return false;
      if (!this.collisionMap[x][y]) return false;

      let blockingCharacter = this.collisionMap[x][y].find(function(item){
        return item != character;
      });

      if (blockingCharacter === undefined) {
        return false;
      }

      blockingCharacter.onBlockCharacter(character);
      character.onBlockedBy(blockingCharacter);
      return true;
    }

    canMoveLeft(character) {
      for (let y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.x - character.stepSize, y)) return false;

        for (let i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.x - i, y, character)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveRight(character) {
      for (let y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.rightX + character.stepSize, y)) return false;

        for (let i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.rightX + i, y, character)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveUp(character) {
      for (let x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.y - character.stepSize)) return false;

        for (let i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.y - i, character)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveDown(character) {
      for (let x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.bottomY + character.stepSize)) return false;

        for (let i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.bottomY + i, character)) {
            return false;
          }
        }
      }

      return true;
    }

    canMove(character, direction) {
      if (direction.indexOf('left') >= 0) {
        if (!this.canMoveLeft(character)) return false;
      } else if (direction.indexOf('right') >= 0) {
        if (!this.canMoveRight(character)) return false;
      }

      if (direction.indexOf('up') >= 0) {
        if (!this.canMoveUp(character)) return false;
      } else if (direction.indexOf('down') >= 0) {
        if (!this.canMoveDown(character)) return false;
      }

      return true;
    }

    loadMap(mapName) {
      this._mapName = mapName;
      this.mapData = TCHE.maps[mapName];
    }

    changeMap(newMapName) {
      TCHE.SceneManager.changeScene(TCHE.SceneMap, { mapName : newMapName });
    }
  }
  
  TCHE.registerClass('Map', Map);
})();