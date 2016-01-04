(function($) {
  "use strict";

  $.keys = {
    9: 'tab', // tab
    13: 'ok', // enter
    16: 'shift', // shift
    17: 'control', // control
    18: 'control', // alt
    27: 'escape', // escape
    32: 'ok', // space
    33: 'pageup', // pageup
    34: 'pagedown', // pagedown
    37: 'left', // left arrow
    38: 'up', // up arrow
    39: 'right', // right arrow
    40: 'down', // down arrow
    45: 'escape', // insert

    65: 'left', // A
    83: 'down', // S
    68: 'right', // D
    87: 'up', // W

    74: 'ok', // J
    75: 'shift', // K
    85: 'tool', // U
    // 73: 'I', // I

    81: 'pageup', // Q
    69: 'pagedown', // E

    // 76: 'L', // L,
    // 79: 'O', // O,

    // 88: 'escape', // X
    // 90: 'ok', // Z
    96: 'escape', // numpad 0
    98: 'down', // numpad 2
    100: 'left', // numpad 4
    102: 'right', // numpad 6
    104: 'up' // numpad 8
  };

  $.keyStates = {};
  $.previousKeyStates = {};
  $.triggeredKeys = [];
  $.releasedKeys = [];

  $.update = function(){
    $.triggeredKeys = [];
    $.releasedKeys = [];

    for (var key in $.keyStates) {
      if ($.keyStates[key] === $.previousKeyStates[key]) continue;

      if ($.keyStates[key]) {
        $.triggeredKeys.push(key);
      } else {
        $.releasedKeys.push(key);
      }
    }

    $.previousKeyStates = TCHE.shallowClone($.keyStates);
  };

  $.addKeyCode = function(code, name) {
    this.keys[code] = name;
  };

  $.isKeyCodePressed = function(keyCode) {
    return !!$.keyStates[keyCode];
  };

  $.isKeyCodeTriggered = function(keyCode) {
    return $.triggeredKeys.indexOf(keyCode) >= 0;
  };

  $.isKeyCodeReleased = function(keyCode) {
    return $.releasedKeys.indexOf(keyCode) >= 0;
  };

  $.isKeyNamePressed = function(keyName) {
    for (var key in $.keys) {
      if ($.keys.hasOwnProperty(key)) {
        if ($.keys[key].toUpperCase() == keyName.toUpperCase()) {
          if ($.isKeyCodePressed(key)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  $.isKeyNameReleased = function(keyName) {
    for (var key in $.keys) {
      if ($.keys.hasOwnProperty(key)) {
        if ($.keys[key].toUpperCase() == keyName.toUpperCase()) {
          if ($.isKeyCodeReleased(key)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  $.isKeyNameTriggered = function(keyName) {
    for (var key in $.keys) {
      if ($.keys.hasOwnProperty(key)) {
        if ($.keys[key].toUpperCase() == keyName.toUpperCase()) {
          if ($.isKeyCodeTriggered(key)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  $.isKeyPressed = function(keyCodeOrName) {
    if (typeof(keyCodeOrName) == "string") {
      return $.isKeyNamePressed(keyCodeOrName);
    } else {
      return $.isKeyCodePressed(keyCodeOrName);
    }
  };

  $.isKeyTriggered = function(keyCodeOrName) {
    if (typeof(keyCodeOrName) == "string") {
      return $.isKeyNameTriggered(keyCodeOrName);
    } else {
      return $.isKeyCodeTriggered(keyCodeOrName);
    }
  };

  $.isKeyReleased = function(keyCodeOrName) {
    if (typeof(keyCodeOrName) == "string") {
      return $.isKeyNameReleased(keyCodeOrName);
    } else {
      return $.isKeyCodeReleased(keyCodeOrName);
    }
  };

  $.getPressedKeys = function(keys) {
    return Object.keys($.keys).filter(function(key) {
      return $.isKeyCodePressed(key);
    });
  };

  $.getFirstDirection = function() {
    return ['left', 'right', 'up', 'down'].find(function(direction) {
      return $.isKeyNamePressed(direction);
    }) || '';
  };

  $.getDirection = function() {
    return ['left', 'right', 'up', 'down'].filter(function(direction) {
      return $.isKeyNamePressed(direction);
    }).join('-');
  };

  $.onKeyDown = function(event) {
    if ($.isBlockedKey(event.keyCode)) {
      event.preventDefault();
    }

    $.keyStates[event.keyCode] = true;

    if (this.keys[event.keyCode]) {
      this.fire(this.keys[event.keyCode], {});
    }
  };

  $.onKeyUp = function(event) {
    $.keyStates[event.keyCode] = false;
  };

  $.onWindowBlur = function() {
    $.clear();
  };

  $.clear = function() {
    $.keyStates = {};
  };

  $.isBlockedKey = function(keyCode) {
    switch (keyCode) {
      case 8: // backspace
      case 33: // pageup
      case 34: // pagedown
      case 37: // left arrow
      case 38: // up arrow
      case 39: // right arrow
      case 40: // down arrow
        return true;
      default:
        return false;
    }
  };

  document.addEventListener('keydown', $.onKeyDown.bind($));
  document.addEventListener('keyup', $.onKeyUp.bind($));
  window.addEventListener('blur', $.onWindowBlur.bind($));

  TCHE.on("ready", function() {
    TCHE.renderer.view.addEventListener("click", function(evt) {

      var tmp = getMousePos(this, evt);

      TCHE.globals.player.setDest(tmp.x, tmp.y);
    });
  });

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


})(TCHE.declareStaticClass('InputManager'));
