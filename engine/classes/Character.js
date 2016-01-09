(function(){
  class Character {
    constructor() {
      this._x = null;
      this._y = null;
      this._xDest = null;
      this._yDest = null;
      this._direction = null;
      this._sprite = null;
      this._dirty = false;
      this._height = null;
      this._width = null;
      this._lastBlockedByCharacter = null;
      this._lastBlockCharacter = null;
      this._frameInitialX = null;
      this._frameInitialY = null;
    }

    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get xDest() { return this._xDest; }
    set xDest(value) { this._xDest = value; }
    get yDest() { return this._yDest; }
    set yDest(value) { this._yDest = value; }
    get direction() { return this._direction; }
    set direction(value) { this._direction = value; }
    get dirty() { return this._dirty; }
    set dirty(value) { this._dirty = value; }
    get width() { return this._width; }
    set width(value) { this._width = value; }
    get height() { return this._height; }
    set height(value) { this._height = value; }

    get rightX() { return this.x + this.width; }
    get bottomY() { return this.y + this.height; }

    get sprite() { return this._sprite; }
    set sprite(value) { 
      this._sprite = value;
      this._dirty = true;
    }

    get stepSize() { return 4; }

    getDirectionToDest() {
      var directions = [];

      if (this._xDest == this._x && this._yDest == this._y) {
        this.clearDestination();
        return false;
      }

      if (this._xDest >= this._x + this.stepSize) {
        directions.push('right');
      } else if (this._xDest <= this._x - this.stepSize) {
        directions.push('left');
      }

      if (this._yDest >= this._y + this.stepSize) {
        directions.push('down');
      } else if (this._yDest <= this._y - this.stepSize) {
        directions.push('up');
      }

      if (directions.length > 0) {
        return directions.join(" ");
      } else {
        this.clearDestination();
        return false;
      }
    }

    respondToMouseMovement() {
      if (!this._xDest || !this._yDest) return;

      var direction = this.getDirectionToDest();
      if (direction !== false) {
        this.move(direction);
      }
    }

    update() {
      this._frameInitialX = this.x;
      this._frameInitialY = this.y;

      this.respondToMouseMovement();
    }

    setDest(x, y) {
      this._xDest = x;
      this._yDest = y;
    }

    clearDestination() {
      this._xDest = null;
      this._yDest = null;
    }

    canMove(direction) {
      return TCHE.globals.map.canMove(this, direction);
    }

    move(direction) {
      if (direction.indexOf('left') >= 0 && this.canMove('left')) {
        this._x -= this.stepSize;
      } else if (direction.indexOf('right') >= 0 && this.canMove('right')) {
        this._x += this.stepSize;
      }

      if (direction.indexOf('up') >= 0 && this.canMove('up')) {
        this._y -= this.stepSize;
      } else if (direction.indexOf('down') >= 0 && this.canMove('down')) {
        this._y += this.stepSize;
      }

      if (this.isMoving()) {
        this._lastBlockCharacter = null;
        this._lastBlockedByCharacter = null;
        TCHE.globals.map.requestCollisionMapRefresh();
      }
    }

    isMoving() {
      return this._frameInitialX !== this._x || this._frameInitialY !== this._y;
    }

    onBlockCharacter(character) {
      if (this._lastBlockCharacter !== character) {
        this._lastBlockCharacter = character;
        this.fire('blockCharacter', character);
      }
    }

    onBlockedBy(character) {
      if (this._lastBlockedByCharacter !== character) {
        this._lastBlockedByCharacter = character;
        this.fire('blockedBy', character);
      }
    }
  }
  
  TCHE.registerClass('Character', Character);
})();