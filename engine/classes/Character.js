(function($) {
  "use strict";
  $.STEP = 5;
  $.STEP_WALKING = 3;
  $.STEP_RUNNING = 5;

  $.changeImage = function(image) {
    this._image = image;
    this._dirty = true;
  };

  TCHE.accessor($, 'x');
  TCHE.accessor($, 'y');
  TCHE.accessor($, 'xDest');
  TCHE.accessor($, 'yDest');
  TCHE.accessor($, 'direction');
  TCHE.accessor($, 'image', $.changeImage);
  TCHE.accessor($, 'dirty');

  $.initialize = function() {

  };

  $.setDest = function(x, y) {
    this._xDest = x;
    this._yDest = y;
  };

  $.update = function() {
    var direction = {
      "x": ["right", "left"],
      "y": ["down", "up"]
    };

    this.move(Object.keys(direction).reduce(function(old, val) {
      var dest = this["_" + val + "Dest"];
      if (dest) {
        var pos = this["_" + val];
        if (Math.abs(dest - pos) >= this.STEP) {
          old.push(dest > pos ? direction[val][0] : direction[val][1]);
        } else {
          this["_" + val + "Dest"] = undefined;
        }
      }
      return old;
    }.bind(this), []).join(" "));

  };

  $.move = function(direction) {


    if (direction.indexOf('left') >= 0) {
      this._x -= this.STEP;
    } else if (direction.indexOf('right') >= 0) {
      this._x += this.STEP;
    }

    if (direction.indexOf('up') >= 0) {
      this._y -= this.STEP;
    } else if (direction.indexOf('down') >= 0) {
      this._y += this.STEP;
    }
  };


})(TCHE.declareClass('Character'));
