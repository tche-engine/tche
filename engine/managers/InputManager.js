(function(){
  var keyAliases = {};
  var keyStates = {};
  var previousKeyStates = {};
  var triggeredKeys = [];
  var releasedKeys = [];
  var keyCodes = null;

  var keys = {
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
    104: 'up', // numpad 8

    113 : 'F2'
  };

  class InputManager {
    static update() {
      triggeredKeys = [];
      releasedKeys = [];

      for (var key in keyStates) {
        if (keyStates[key] === previousKeyStates[key]) continue;

        if (keyStates[key]) {
          triggeredKeys.push(key);
        } else {
          releasedKeys.push(key);
        }
      }

      previousKeyStates = TCHE.Clone.shallow(keyStates);

      for (var i = 0; i < triggeredKeys.length; i++) {
        var names = this.getKeyNames(triggeredKeys[i]);

        for (var j = 0; j < names.length; j++) {
          this.fire(names[j], {});
        }
      }
    }

    static addKeyCode(code, name) {
      keys[code] = name;
      keyCodes = null;
    }

    static addKeyAlias(keyName, keyAlias) {
      keyAliases[keyName] = keyAliases[keyName] || [];
      keyAliases[keyName].push(keyAlias);

      keyCodes = null;
    }

    static isKeyCodePressed(keyCode) {
      return !!keyStates[keyCode];
    }

    static isKeyCodeTriggered(keyCode) {
      return triggeredKeys.indexOf(keyCode) >= 0;
    }

    static isKeyCodeReleased(keyCode) {
      return releasedKeys.indexOf(keyCode) >= 0;
    }

    static generateKeyCodes(keyName) {
      var codes = [];

      for (var key in keys) {
        if (keys.hasOwnProperty(key)) {
          if (keys[key].toUpperCase() == keyName.toUpperCase()) {
            codes.push(key);
            continue;
          }

          var thisKeyName = keys[key];
          if (!!keyAliases[thisKeyName] && keyAliases[thisKeyName].indexOf(keyName) >= 0) {
            codes.push(key);
          }
        }
      }

      keyCodes = keyCodes || {};
      keyCodes[keyName] = codes;

      return codes;
    }

    static getKeyCodes(keyName) {
      if (!!keyCodes && !!keyCodes[keyName]) {
        return keyCodes[keyName];
      }

      return this.generateKeyCodes(keyName);
    }

    static getKeyNames(keyCode) {
      var names = [];

      if (!!keys[keyCode]) {
        var name = keys[keyCode];

        names.push(name);
        if (!!keyAliases[name]) {
          names = names.concat(keyAliases[name]);
        }
      }

      return names;
    }

    static isKeyNamePressed(keyName) {
      var codes = this.getKeyCodes(keyName);

      return codes.find(function(key){
        return this.isKeyCodePressed(key);
      }.bind(this)) || false;
    }

    static isKeyNameReleased(keyName) {
      var codes = this.getKeyCodes(keyName);

      return codes.find(function(key){
        return this.isKeyCodeReleased(key);
      }.bind(this)) || false;
    }

    static isKeyNameTriggered(keyName) {
      var codes = this.getKeyCodes(keyName);

      return codes.find(function(key){
        return this.isKeyCodeTriggered(key);
      }.bind(this)) || false;
    }

    static isKeyPressed(keyCodeOrName) {
      if (typeof(keyCodeOrName) == "string") {
        return this.isKeyNamePressed(keyCodeOrName);
      } else {
        return this.isKeyCodePressed(keyCodeOrName);
      }
    }

    static isKeyTriggered(keyCodeOrName) {
      if (typeof(keyCodeOrName) == "string") {
        return this.isKeyNameTriggered(keyCodeOrName);
      } else {
        return this.isKeyCodeTriggered(keyCodeOrName);
      }
    }

    static isKeyReleased(keyCodeOrName) {
      if (typeof(keyCodeOrName) == "string") {
        return this.isKeyNameReleased(keyCodeOrName);
      } else {
        return this.isKeyCodeReleased(keyCodeOrName);
      }
    }

    static getPressedKeys(keys) {
      return Object.keys(keys).filter(function(key){
        return this.isKeyCodePressed(key);
      }.bind(this));
    }

    static getFirstDirection() {
      return ['left', 'right', 'up', 'down'].find(function(direction) {
        return this.isKeyNamePressed(direction);
      }.bind(this)) || '';
    }

    static getDirection() {
      return ['left', 'right', 'up', 'down'].filter(function(direction) {
        return this.isKeyNamePressed(direction);
      }.bind(this)).join('-');
    }

    static onKeyDown(event) {
      if (this.isBlockedKey(event.keyCode)) {
        event.preventDefault();
      }

      keyStates[event.keyCode] = true;
    }

    static onKeyUp(event) {
      keyStates[event.keyCode] = false;
    }

    static onWindowBlur() {
      this.clear();
    }

    static clear() {
      keyStates = {};
    }

    static isBlockedKey(keyCode) {
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
    }
  }

  document.addEventListener('keydown', InputManager.onKeyDown.bind(InputManager));
  document.addEventListener('keyup', InputManager.onKeyUp.bind(InputManager));
  window.addEventListener('blur', InputManager.onWindowBlur.bind(InputManager));

  TCHE.on("started", function() {
    TCHE.renderer.view.addEventListener("click", function(evt) {
      var pos = getMousePos(this, evt);

      TCHE.SceneManager.processClick(pos);
    });
  });

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  TCHE.registerStaticClass('InputManager', InputManager);
})();