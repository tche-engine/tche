(function(){
  class Character {
    constructor() {
      this._x = null;
      this._y = null;
      this._xDest = null;
      this._yDest = null;
      this._direction = null;
      this._image = null;
      this._dirty = false;
      this._height = null;
      this._width = null;
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

    get image() { return this._image; }
    set image(value) { 
      this._image = value;
      this._dirty = true;
    }

    get stepSize() { return 5; }

    update() {
      var direction = {
        "x": ["right", "left"],
        "y": ["down", "up"]
      };

      this.move(Object.keys(direction).reduce(function(old, val) {
        var dest = this["_" + val + "Dest"];
        if (dest) {
          var pos = this["_" + val];
          if (Math.abs(dest - pos) >= this.stepSize) {
            old.push(dest > pos ? direction[val][0] : direction[val][1]);
          } else {
            this["_" + val + "Dest"] = undefined;
          }
        }
        return old;
      }.bind(this), []).join(" "));
    }

    setDest(x, y) {
      this._xDest = x;
      this._yDest = y;
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

      TCHE.globals.map.requestCollisionMapRefresh();
    }
  }
  
  TCHE.Character = Character;
})();