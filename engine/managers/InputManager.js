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
    return !!$.keyStates[keyCode];
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

  $.isKeyPressed = function(keyCodeOrName) {
    if (typeof(keyCodeOrName) == "string") {
      return $.isKeyNamePressed(keyCodeOrName);
    } else {
      return $.isKeyCodePressed(keyCodeOrName);
    }
  };

  // incomplete
  $.getAllKeys = function(){
    var pressedKeys = [];
    for(var keyCode in $.keyStates){
      if (!!$.keyStates[keyCode]){
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
    if ($.isBlockedKey(event.keyCode)) {
      event.preventDefault();
    }

    $.keyStates[event.keyCode] = true;
  };

  $.onKeyUp = function(event) {
    $.keyStates[event.keyCode] = false;
  };

  $.onWindowBlur = function() {
    $.clear();
  };

  $.clear = function(){
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

})(TCHE.declareClass('InputManager'));