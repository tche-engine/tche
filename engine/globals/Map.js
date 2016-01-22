(function(){
  var collisionMapDirty = true;
  var shouldCreateCollisionMap = true;

  class Map {
    constructor() {
      this._mapData = {};
      this._objects = [];
      this._collisionMap = [];
      this._mapName = null;
      this._offsetX = 0;
      this._offsetY = 0;
    }

    get mapName() { return this._mapName; }

    get mapData() { return this._mapData; } 
    set mapData(value) {
      this._mapData = value;
      this._objects = [];
      this.createObjects();
    }

    get width() { return TCHE.MapManager.getMapWidth(this._mapData); }
    get height() { return TCHE.MapManager.getMapHeight(this._mapData); }

    get offsetX() { return this._offsetX; }
    set offsetX(value) { this._offsetX = value; }
    get offsetY() { return this._offsetY; }
    set offsetY(value) { this._offsetY = value; }

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

    getImportantObjectData(mapData, obj) {
      var data = TCHE.MapManager.getImportantObjectData(mapData, obj);

      data.x = data.x || 0;
      data.y = data.y || 0;
      data.width = data.width || 0;
      data.height = data.height || 0;
      data.sprite = data.sprite || '';
      data.objectType = data.objectType || '';
      data.offsetY = data.offsetY || 0;
      data.offsetX = data.offsetX || 0;
      data.ghost = !!data.ghost;

      return data;
    }

    updateOffset() {
      var diffX = this.width - TCHE.renderer.width;
      var diffY = this.height - TCHE.renderer.height;
      var middleX = Math.floor(TCHE.renderer.width / 2);
      var middleY = Math.floor(TCHE.renderer.height / 2);
      var mapMiddleX = Math.floor(this.width / 2);
      var mapMiddleY = Math.floor(this.height / 2);
      var playerX = TCHE.globals.player.x;
      var playerY = TCHE.globals.player.y;

      if (diffX < 0) {
        this._offsetX = Math.abs(Math.floor(diffX / 2));
      } else if (diffX > 0) {
        if (playerX > middleX) {
          if (playerX < this.width - middleX) {
            this._offsetX = middleX - playerX;
          } else {
            this._offsetX = TCHE.renderer.width - this.width;
          }
        } else {
          this._offsetX = 0;
        }
      } else {
        this._offsetX = 0;
      }

      if (diffY < 0) {
        this._offsetY = Math.abs(Math.floor(diffY / 2));
      } else if (diffY > 0) {
        if (playerY > middleY) {
          if (playerY < this.height - middleY) {
            this._offsetY = middleY - playerY;
          } else {
            this._offsetY = TCHE.renderer.height - this.height;
          }
        } else {
          this._offsetY = 0;
        }
      } else {
        this._offsetY = 0;
      }
    }

    createObjects() {
      var objectList = [];
      var map = this;

      if (!!this._mapData) {
        objectList = TCHE.MapManager.getMapObjects(this._mapData) || objectList;
      }

      objectList.forEach(function(obj){
        var data = map.getImportantObjectData(this._mapData, obj);
        var characterClass = TCHE.Character;

        if (data.class && TCHE[data.class] && typeof(TCHE[data.class]) == "function") {
          characterClass = TCHE[data.class];
        }

        var objCharacter = new (characterClass)();
        for (var key in data) {
          objCharacter[key] = data[key];
        }

        this._objects.push(objCharacter);
      }.bind(this));

      collisionMapDirty = true;
      shouldCreateCollisionMap = true;
    }

    addCharacterToCollisionMap(character) {
      for (var x = character.x; x < character.rightX; x++) {
        for (var y = character.y; y < character.bottomY; y++) {
          if (this._collisionMap.length < x || !this._collisionMap[x]) {
            this._collisionMap[x] = {};
          }
          if (this._collisionMap[x].length < y || !this._collisionMap[x][y]) {
            this._collisionMap[x][y] = [];
          }

          this._collisionMap[x][y].push(character);
        }
      }
    }

    getMapObjects() {
      return TCHE.MapManager.getMapObjects(this._mapData);
    }

    // Go over all objects to form a list of blocked pixels
    createCollisionMap() {
      this._collisionMap = {};

      for (var i = 0; i < this._objects.length; i++) {
        var obj = this._objects[i];

        this.addCharacterToCollisionMap(obj);
      }

      //The player is not added to the collision map, collisions with it should be tested directly
      // this.addCharacterToCollisionMap(TCHE.globals.player);
      collisionMapDirty = false;
      shouldCreateCollisionMap = false;
    }

    update() {
      if (collisionMapDirty) {
        shouldCreateCollisionMap = true;
      }

      this.updateOffset();
    }

    isValid(x, y) {
      if (x >= this.width) return false;
      if (y >= this.height) return false;
      if (x < 0) return false;
      if (y < 0) return false;

      return true;
    }

    validateCollision(x, y) {
      if (x > this.collisionMap.length) return false;
      if (!this.collisionMap[x]) return false;
      if (y > this.collisionMap[x].length) return false;
      if (!this.collisionMap[x][y]) return false;
      return true;
    }

    isCollided(x, y, character, triggerEvents = false) {
      if (this.validateCollision(x, y) !== true) {
        return false;
      }

      var blockingCharacter = this.collisionMap[x][y].find(function(item){
        return item != character && !item.ghost;
      });

      if (blockingCharacter === undefined) {
        return false;
      }

      if (triggerEvents) {
        blockingCharacter.onBlockCharacter(character);
        character.onBlockedBy(blockingCharacter);
      }

      return true;
    }

    collidedObjects(x, y, character) {
      if (this.validateCollision(x, y) !== true) {
        return [];
      }

      var blockingCharacters = this.collisionMap[x][y].filter(function(item){
        return item != character;
      });

      return blockingCharacters;
    }

    canMoveLeft(character, triggerEvents = false) {
      for (var y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.x - character.stepSize, y)) return false;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.x - i, y, character, triggerEvents)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveRight(character, triggerEvents = false) {
      for (var y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.rightX + character.stepSize, y)) return false;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.rightX + i, y, character, triggerEvents)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveUp(character, triggerEvents = false) {
      for (var x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.y - character.stepSize)) return false;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.y - i, character, triggerEvents)) {
            return false;
          }
        }
      }

      return true;
    }

    canMoveDown(character, triggerEvents = false) {
      for (var x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.bottomY + character.stepSize)) return false;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.bottomY + i, character, triggerEvents)) {
            return false;
          }
        }
      }

      return true;
    }

    reasonNotToMoveUp(character) {
      for (var x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.y - character.stepSize)) return [];

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.y - i, character)) {
            return this.collidedObjects(x, y, character);
          }
        }
      }

      return [];   
    }

    reasonNotToMoveDown(character) {
      for (var x = character.x; x < character.rightX; x++) {
        if (!this.isValid(x, character.bottomY + character.stepSize)) return undefined;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(x, character.bottomY + i, character)) {
            return this.collidedObjects(x, y, character);
          }
        }
      }

      return [];      
    }

    reasonNotToMoveLeft(character) {
      for (var y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.x - character.stepSize, y)) return undefined;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.x - i, y, character)) {
            return this.collidedObjects(x, y, character);
          }
        }
      }

      return [];
    }

    reasonNotToMoveRight(character) {
      for (var y = character.y; y < character.bottomY; y++) {
        if (!this.isValid(character.rightX + character.stepSize, y)) return undefined;

        for (var i = character.stepSize; i > 0; i--) {
          if (this.isCollided(character.rightX + i, y, character)) {
            return this.collidedObjects(x, y, character);
          }
        }
      }

      return [];
    }

    canMove(character, direction, triggerEvents = false) {
      if (direction.indexOf('left') >= 0) {
        if (!this.canMoveLeft(character, triggerEvents)) {
          return false;
        }
      } else if (direction.indexOf('right') >= 0) {
        if (!this.canMoveRight(character, triggerEvents)) {
          return false;
        }
      }

      if (direction.indexOf('up') >= 0) {
        if (!this.canMoveUp(character, triggerEvents)) {
          return false;
        }
      } else if (direction.indexOf('down') >= 0) {
        if (!this.canMoveDown(character, triggerEvents)) {
          return false;
        }
      }

      return true;
    }

    reasonNotToMove(character, direction) {
      if (direction.indexOf('left') >= 0) {
        return this.reasonNotToMoveLeft(character);
      } else if (direction.indexOf('right') >= 0) {
        return this.reasonNotToMoveRight(character);
      }

      if (direction.indexOf('up') >= 0) {
        return this.reasonNotToMoveUp(character);
      } else if (direction.indexOf('down') >= 0) {
        return this.reasonNotToMoveDown(character);
      }

      return [];
    }

    loadMap(mapName) {
      this._mapName = mapName;
      this.mapData = TCHE.maps[mapName];
    }

    changeMap(newMapName) {
      TCHE.SceneManager.changeScene(TCHE.SceneMapLoading, { mapName : newMapName });
    }
  }
  
  TCHE.registerClass('Map', Map);
})();