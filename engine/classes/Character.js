(function(){
  class Character {
    constructor() {
      this._x = null;
      this._y = null;
      this._xDest = null;
      this._yDest = null;
      this._direction = "down";
      this._sprite = null;
      this._dirty = false;
      this._height = null;
      this._width = null;
      this._lastBlockedByCharacter = null;
      this._lastBlockCharacter = null;
      this._frameInitialX = null;
      this._frameInitialY = null;
      this._animationStep = 0;
      this._animationStepCount = 0;
      this._animationDelay = 10;
      this._animationDelayCount = 0;
      this._offsetX = 0;
      this._offsetY = 0;
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
    set direction(value) {
      console.log(value);
      this._direction = value;
    }
    get dirty() { return this._dirty; }
    set dirty(value) { this._dirty = value; }
    get width() { return this._width; }
    set width(value) { this._width = value; }
    get height() { return this._height; }
    set height(value) { this._height = value; }
    get animationStep() { return this._animationStep; }
    set animationStep(value) { this._animationStep = value; }
    get animationStepCount() { return this._animationStepCount; }
    set animationStepCount(value) { this._animationStepCount = value; }
    get animationDelay() { return this._animationDelay; }
    set animationDelay(value) { this._animationDelay = value; }
    get animationDelayCount() { return this._animationDelayCount; }
    set animationDelayCount(value) { this._animationDelayCount = value; }
    get offsetX() { return this._offsetX; }
    set offsetX(value) { this._offsetX = value; }
    get offsetY() { return this._offsetY; }
    set offsetY(value) { this._offsetY = value; }

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
      if (this._xDest === null || this._yDest === null || isNaN(this._xDest) || isNaN(this._yDest)) return;
      if (this._xDest == this._x && this._yDest == this._y) return;

      var direction = this.getDirectionToDest();
      if (direction !== false) {
        this.performMovement(direction);
      }
    }

    update() {
      this._frameInitialX = this.x;
      this._frameInitialY = this.y;

      this.respondToMouseMovement();
      this.updateAnimation();
    }

    setDest(x, y) {
      this._xDest = x;
      this._yDest = y;
    }

    clearDestination() {
      this._xDest = null;
      this._yDest = null;
    }

    canMove(direction, triggerEvents = false) {
      return TCHE.globals.map.canMove(this, direction, triggerEvents);
    }

    updateDirection(directions) {
      if (directions.indexOf(this._direction) >= 0) return false;
      if (directions.length > 0) {
        this._direction = directions[0];
      }
    }

    updateAnimation() {
      TCHE.SpriteManager.updateAnimationStep(this);
    }

    performLeftMovement(stepSize) {
      this._x -= stepSize;
    }

    performRightMovement(stepSize) {
      this._x += this.stepSize;
    }

    performUpMovement(stepSize) {
      this._y -= this.stepSize;
    }

    performDownMovement(stepSize) {
      this._y += this.stepSize;
    }

    performMovement(direction) {
      var actualDirections = [];

      if (direction.indexOf('left') >= 0 && this.canMove('left', true)) {
        this.performLeftMovement(this.stepSize);
        actualDirections.push('left');
      } else if (direction.indexOf('right') >= 0 && this.canMove('right', true)) {
        this.performRightMovement(this.stepSize);
        actualDirections.push('right');
      }

      if (direction.indexOf('up') >= 0 && this.canMove('up', true)) {
        this.performUpMovement(this.stepSize);
        actualDirections.push('up');
      } else if (direction.indexOf('down') >= 0 && this.canMove('down', true)) {
        this.performDownMovement('down');
        actualDirections.push('down');
      }

      if (this.isMoving()) {
        this._lastBlockCharacter = null;
        this._lastBlockedByCharacter = null;
        this.requestCollisionMapRefresh();
      }

      this.updateDirection(actualDirections);
    }

    move(direction) {
      var anyDirection = false;
      this._xDest = this._x;
      this._yDest = this._y;

      var leftPressed = direction.indexOf('left') >= 0;
      var rightPressed = direction.indexOf('right') >= 0;

      if (leftPressed && this.canMove('left')) {
        this._xDest = this._x - this.stepSize;
        anyDirection = true;
      } else if (rightPressed && this.canMove('right')) {
        this._xDest = this._x + this.stepSize;
        anyDirection = true;
      } else {
        if (leftPressed) {
          this.canMove('left', true);
        }
        if (rightPressed) {
          this.canMove('right', true);
        }
      }

      var upPressed = direction.indexOf('up') >= 0;
      var downPressed = direction.indexOf('down') >= 0;

      if (upPressed && this.canMove('up')) {
        this._yDest = this._y - this.stepSize;
        anyDirection = true;
      } else if (downPressed && this.canMove('down')) {
        this._yDest = this._y + this.stepSize;
        anyDirection = true;
      } else {
        if (upPressed) {
          this.canMove('up', true);
        }
        if (downPressed) {
          this.canMove('down', true);
        }
      }

      return anyDirection;
    }

    requestCollisionMapRefresh() {
      TCHE.globals.map.requestCollisionMapRefresh();
    }

    isMoving() {
      if (this._frameInitialX !== this._x || this._frameInitialY !== this._y) return true;
      if (!!this._destX && !!this._destY && (this._x !== this._destX || this._y !== this._destY)) return true;
      return false;
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