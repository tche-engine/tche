(function($){
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

    65 : 'left', // A
    83 : 'down', // S
    68 : 'right', // D
    87 : 'up', // W

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

  $.isKeyCodePressed = function(keyCode) {
    return !!this.keyStates[keyCode];
  };

  $.isKeyNamePressed = function(keyName) {
    for (var key in this.keys) {
      if (this.keys.hasOwnProperty(key)) {
        if (this.keys[key].toUpperCase() == keyName.toUpperCase()) {
          if (this.isKeyCodePressed(key)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  $.isKeyPressed = function(keyCodeOrName) {
    if (typeof(keyCodeOrName) == "string") {
      return this.isKeyNamePressed(keyCodeOrName);
    } else {
      return this.isKeyCodePressed(keyCodeOrName);
    }
  };

  // incomplete
  $.getAllKeys = function(){
    var pressedKeys = [];
    for(var keyCode in this.keyStates){
      if (!!this.keyStates[keyCode]){
        pressedKeys.push(keyCode);
      }
    }
    return pressedKeys;
  };

  $.getDirection = function(){
    return ['left', 'right', 'up', 'down'].find(function(direction){
      return $.isKeyNamePressed(direction);
    });
  };

  $.onKeyDown = function(event){
    if (this.isBlockedKey(event.keyCode)) {
      event.preventDefault();
    }

    this.keyStates[event.keyCode] = true;
  };

  $.onKeyUp = function(event) {
    this.keyStates[event.keyCode] = false;
  };

  $.onWindowBlur = function() {
    this.clear();
  };

  $.clear = function(){
    this.keyStates = {};
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

})(TCHE.declareClass('InputManager'));