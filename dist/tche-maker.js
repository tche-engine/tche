'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var BAH = (function () {
  function BAH() {
    _classCallCheck(this, BAH);
  }

  _createClass(BAH, null, [{
    key: 'log',
    value: function log(msg) {
      console.log(msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      console.error(msg);
    }
  }]);

  return BAH;
})();

var TCHE = {
  globals: {},
  data: {},
  maps: {}
};

(function ($) {
  /*jshint validthis: true */
  "use strict";

  function ajaxLoadFileAsync(name, filePath, onLoad, onError, mimeType) {
    mimeType = mimeType || "application/json";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath);
    if (mimeType && xhr.overrideMimeType) {
      xhr.overrideMimeType(mimeType);
    }
    if (onLoad === undefined) {
      onLoad = function (xhr, filePath, name) {
        if (xhr.status < 400) {
          TCHE.data[name] = JSON.parse(xhr.responseText);
        }
      };
    }
    xhr.onload = function () {
      onLoad.call(this, xhr, filePath, name);
    };
    xhr.onerror = onError;
    if (onLoad !== undefined) {
      TCHE.data[name] = null;
    }
    xhr.send();
  }

  function deepClone(obj) {
    var result;
    if (obj instanceof Array) {
      return obj.map(function (i) {
        return $.deepClone(i);
      });
    } else if (obj && !obj.prototype && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' || obj instanceof Object)) {
      result = {};
      for (var p in obj) {
        result[p] = $.deepClone(obj[p]);
      }
      return result;
    }
    return obj;
  }

  function shallowClone(obj) {
    var result;
    if (obj instanceof Array) {
      return obj.slice(0);
    } else if (obj && !obj.prototype && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' || obj instanceof Object)) {
      result = {};
      for (var p in obj) {
        result[p] = obj[p];
      }
      return result;
    }
    return obj;
  }

  function registerClass(className, classDeclaration) {
    TCHE[className] = classDeclaration;
    TCHE.trigger(classDeclaration.prototype);
  }

  function registerStaticClass(className, classDeclaration) {
    TCHE[className] = classDeclaration;
    TCHE.trigger(classDeclaration);
  }

  function fillSettings(settings) {
    settings.screenWidth = settings.screenWidth || 800;
    settings.screenHeight = settings.screenHeight || 600;
    settings.backgroundColor = settings.backgroundColor || 0x1099bb;

    settings.showFps = settings.showFps !== false;
    settings.fpsVisibleOnStartup = settings.fpsVisibleOnStartup === true;

    // settings.initialScene = settings.initialScene || null;
    settings.playerX = settings.playerX || 0;
    settings.playerY = settings.playerY || 0;
    settings.initialMap = settings.initialMap || null;

    // settings.sceneParams = settings.sceneParams || {};

    TCHE.settings = settings;
  }

  function createGlobals() {
    TCHE.globals.player = new TCHE.Player();
    TCHE.globals.map = new TCHE.Map();
  }

  function setupFpsMeter() {
    if (TCHE.settings.showFps) {
      TCHE.meter = new FPSMeter({ theme: 'transparent', graph: 1, decimals: 0 });

      if (!TCHE.settings.fpsVisibleOnStartup) {
        TCHE.meter.hide();
      }

      TCHE.InputManager.on("FPS", function (argument) {
        return TCHE.meter.isPaused ? TCHE.meter.show() : TCHE.meter.hide();
      });
    }
  }

  function init(settings) {
    TCHE.fillSettings(settings);

    TCHE.renderer = PIXI.autoDetectRenderer(settings.screenWidth, settings.screenHeight, { backgroundColor: settings.backgroundColor });
    document.body.appendChild(TCHE.renderer.view);

    setupFpsMeter();
    createGlobals();

    TCHE.SceneManager.start(TCHE.SceneLaunch);
    TCHE.fire("started");
  }

  function startFrame() {
    if (!!TCHE.meter) {
      TCHE.meter.tickStart();
    }
  }

  function endFrame() {
    if (!!TCHE.meter) {
      TCHE.meter.tick();
    }
  }

  $.trigger = Trigger;
  $.fillSettings = fillSettings;
  $.ajaxLoadFileAsync = ajaxLoadFileAsync;
  $.shallowClone = shallowClone;
  $.deepClone = deepClone;
  $.init = init;
  $.startFrame = startFrame;
  $.endFrame = endFrame;
  $.registerClass = registerClass;
  $.registerStaticClass = registerStaticClass;

  $.trigger(TCHE);
})(TCHE);
function Trigger(el) {
  el._listeners = {};

  el.on = el.addListener = function (type, listener) {
    if (typeof this._listeners[type] == "undefined") {
      this._listeners[type] = [];
    }

    this._listeners[type].push(listener);
  };

  el.fire = function (event) {
    event = event || {};
    if (typeof event == "string") {
      event = {
        type: event
      };
    }
    if (!event.target) {
      event.target = this;
    }

    if (!event.type) {
      //false
      throw new Error("Event object missing 'type' property.");
    }

    if (this._listeners[event.type] instanceof Array) {
      var listeners = this._listeners[event.type];
      var params = Array.prototype.slice.call(arguments);
      params.shift();

      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].apply(this, params);
      }
    }
  };

  el.removeListener = function (type, listener) {
    if (this._listeners[type] instanceof Array) {
      var listeners = this._listeners[type];
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  };
  return el;
}

(function () {
  var Character = (function () {
    function Character() {
      _classCallCheck(this, Character);

      this._x = null;
      this._y = null;
      this._xDest = null;
      this._yDest = null;
      this._direction = null;
      this._image = null;
      this._dirty = false;
      this._height = null;
      this._width = null;
      this._lastBlockedByCharacter = null;
      this._lastBlockCharacter = null;
      this._frameInitialX = null;
      this._frameInitialY = null;
    }

    _createClass(Character, [{
      key: 'update',
      value: function update() {
        this._frameInitialX = this.x;
        this._frameInitialY = this.y;

        var direction = {
          "x": ["right", "left"],
          "y": ["down", "up"]
        };

        this.move(Object.keys(direction).reduce((function (old, val) {
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
        }).bind(this), []).join(" "));
      }
    }, {
      key: 'setDest',
      value: function setDest(x, y) {
        this._xDest = x;
        this._yDest = y;
      }
    }, {
      key: 'canMove',
      value: function canMove(direction) {
        return TCHE.globals.map.canMove(this, direction);
      }
    }, {
      key: 'move',
      value: function move(direction) {
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
    }, {
      key: 'isMoving',
      value: function isMoving() {
        return this._frameInitialX !== this._x || this._frameInitialY !== this._y;
      }
    }, {
      key: 'onBlockCharacter',
      value: function onBlockCharacter(character) {
        if (this._lastBlockCharacter !== character) {
          this._lastBlockCharacter = character;
          this.fire('blockCharacter', character);
        }
      }
    }, {
      key: 'onBlockedBy',
      value: function onBlockedBy(character) {
        if (this._lastBlockedByCharacter !== character) {
          this._lastBlockedByCharacter = character;
          this.fire('blockedBy', character);
        }
      }
    }, {
      key: 'x',
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this._x = value;
      }
    }, {
      key: 'y',
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this._y = value;
      }
    }, {
      key: 'xDest',
      get: function get() {
        return this._xDest;
      },
      set: function set(value) {
        this._xDest = value;
      }
    }, {
      key: 'yDest',
      get: function get() {
        return this._yDest;
      },
      set: function set(value) {
        this._yDest = value;
      }
    }, {
      key: 'direction',
      get: function get() {
        return this._direction;
      },
      set: function set(value) {
        this._direction = value;
      }
    }, {
      key: 'dirty',
      get: function get() {
        return this._dirty;
      },
      set: function set(value) {
        this._dirty = value;
      }
    }, {
      key: 'width',
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
      }
    }, {
      key: 'rightX',
      get: function get() {
        return this.x + this.width;
      }
    }, {
      key: 'bottomY',
      get: function get() {
        return this.y + this.height;
      }
    }, {
      key: 'image',
      get: function get() {
        return this._image;
      },
      set: function set(value) {
        this._image = value;
        this._dirty = true;
      }
    }, {
      key: 'stepSize',
      get: function get() {
        return 5;
      }
    }]);

    return Character;
  })();

  TCHE.registerClass('Character', Character);
})();
(function () {
  var Sprite = (function (_PIXI$Container) {
    _inherits(Sprite, _PIXI$Container);

    function Sprite() {
      _classCallCheck(this, Sprite);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));

      _this._sprite = null;
      return _this;
    }

    //The sprite property of the Sprite class is a PIXI sprite.

    _createClass(Sprite, [{
      key: 'update',
      value: function update() {}
    }, {
      key: 'sprite',
      get: function get() {
        return this._sprite;
      },
      set: function set(value) {
        this._sprite = value;
      }
    }]);

    return Sprite;
  })(PIXI.Container);

  TCHE.registerClass('Sprite', Sprite);
})();
(function () {
  var CharacterSprite = (function (_TCHE$Sprite) {
    _inherits(CharacterSprite, _TCHE$Sprite);

    function CharacterSprite(character) {
      _classCallCheck(this, CharacterSprite);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(CharacterSprite).call(this));

      _this2._character = character;
      _this2.createPixiSprite();
      return _this2;
    }

    _createClass(CharacterSprite, [{
      key: 'createPixiSprite',
      value: function createPixiSprite() {
        if (this._character.dirty) {
          this._texture = null;
          if (!!this._sprite) {
            this._sprite.texture = null;
          }
        }

        if (!this._texture && !!this._character.image) {
          this._texture = PIXI.Texture.fromImage(this._character.image);
        }

        if (!this._sprite && !!this._texture) {
          this._sprite = new PIXI.Sprite(this._texture);
          this.addChild(this._sprite);
        }

        if (!!this._sprite && !!this._texture && this._sprite._texture != this._texture) {
          this._sprite.texture = this._texture;
        }

        this._character.dirty = false;
      }
    }, {
      key: 'update',
      value: function update() {
        //Makes sure the sprite exists
        this.createPixiSprite();

        if (!this._sprite) return;

        //Syncs the position
        this.position.x = this._character.x;
        this.position.y = this._character.y;
      }
    }, {
      key: 'character',
      get: function get() {
        return this._character;
      },
      set: function set(value) {
        this._character = value;
      }
    }]);

    return CharacterSprite;
  })(TCHE.Sprite);

  TCHE.registerClass('CharacterSprite', CharacterSprite);
})();
(function () {
  var MapSprite = (function (_TCHE$Sprite2) {
    _inherits(MapSprite, _TCHE$Sprite2);

    function MapSprite(map) {
      _classCallCheck(this, MapSprite);

      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapSprite).call(this));

      _this3._map = map;
      return _this3;
    }

    _createClass(MapSprite, [{
      key: 'map',
      get: function get() {
        return this._map;
      },
      set: function set(value) {
        this._map = value;
      }
    }]);

    return MapSprite;
  })(TCHE.Sprite);

  TCHE.registerClass('MapSprite', MapSprite);
})();
(function () {
  var Map2d = (function (_TCHE$MapSprite) {
    _inherits(Map2d, _TCHE$MapSprite);

    function Map2d(map) {
      _classCallCheck(this, Map2d);

      var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Map2d).call(this, map));

      _this4._objectSprites = [];

      _this4.createBackground();
      _this4.createObjects();

      _this4.createPlayer();
      return _this4;
    }

    _createClass(Map2d, [{
      key: 'createBackground',
      value: function createBackground() {
        this._backgroundGraphic = new PIXI.Graphics();
        this._backgroundGraphic.beginFill(this._map._mapData["background-color"]);
        this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
        this._backgroundGraphic.endFill();

        this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
        this._backgroundTexture.render(this._backgroundGraphic);

        this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

        this.addChild(this._backgroundSprite);
      }
    }, {
      key: 'createPlayer',
      value: function createPlayer() {
        this._playerSprite = new TCHE.CharacterSprite(TCHE.globals.player);
        this.addChild(this._playerSprite);
      }
    }, {
      key: 'createObjects',
      value: function createObjects() {
        this._objectSprites = [];

        this._map.objects.forEach((function (obj) {
          var objSprite = new TCHE.CharacterSprite(obj);
          this._objectSprites.push(objSprite);
          this.addChild(objSprite);
        }).bind(this));
      }
    }, {
      key: 'updatePlayer',
      value: function updatePlayer() {
        this._playerSprite.update();
      }
    }, {
      key: 'updateObjects',
      value: function updateObjects() {
        this._objectSprites.forEach(function (objSprite) {
          objSprite.update();
        });
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Object.getPrototypeOf(Map2d.prototype), 'update', this).call(this);

        this.updateObjects();
        this.updatePlayer();
      }
    }]);

    return Map2d;
  })(TCHE.MapSprite);

  TCHE.registerClass('Map2d', Map2d);
})();
(function () {
  var _startedLoadingMaps = false;
  var _loading = 0;

  var FileManager = (function () {
    function FileManager() {
      _classCallCheck(this, FileManager);
    }

    _createClass(FileManager, null, [{
      key: '_loadGameSettings',
      value: function _loadGameSettings() {
        var path = './game.json';

        TCHE.ajaxLoadFileAsync('game', path);
      }
    }, {
      key: '_loadAllMaps',
      value: function _loadAllMaps() {
        if (!TCHE.data.game) return;

        var maps = TCHE.data.game.maps;

        maps.forEach((function (mapName) {
          this._loadMapData(mapName);
        }).bind(this));
      }
    }, {
      key: '_loadMapData',
      value: function _loadMapData(mapName) {
        var path = './maps/' + mapName + '.json';
        _loading++;

        TCHE.maps[mapName] = null;
        TCHE.ajaxLoadFileAsync(mapName, path, function (xhr, filePath, name) {
          if (xhr.status < 400) {
            TCHE.maps[name] = JSON.parse(xhr.responseText);
            _loading--;
          } else {
            console.log(arguments);
            throw new Error("Failed to load map.");
          }
        }, function () {
          console.log(arguments);
          throw new Error("Failed to load map.");
        });
      }
    }, {
      key: 'update',
      value: function update() {
        if (!TCHE.data.game) {
          if (TCHE.data.game === undefined) {
            this._loadGameSettings();
          }

          return;
        }

        if (!_startedLoadingMaps) {
          _startedLoadingMaps = true;
          this._loadAllMaps();
        }
      }
    }, {
      key: 'isLoaded',
      value: function isLoaded() {
        if (!TCHE.data.game) return false;
        if (!_startedLoadingMaps) return false;
        if (_loading > 0) return false;

        return true;
      }
    }]);

    return FileManager;
  })();

  TCHE.registerStaticClass('FileManager', FileManager);
})();
(function () {
  var keyAliases = {};
  var keyStates = {};
  var previousKeyStates = {};
  var triggeredKeys = [];
  var releasedKeys = [];

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

    113: 'F2'
  };

  var InputManager = (function () {
    function InputManager() {
      _classCallCheck(this, InputManager);
    }

    _createClass(InputManager, null, [{
      key: 'update',
      value: function update() {
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

        previousKeyStates = TCHE.shallowClone(keyStates);

        for (var i = 0; i < triggeredKeys.length; i++) {
          var names = this.getKeyNames(triggeredKeys[i]);

          for (var j = 0; j < names.length; j++) {
            this.fire(names[j], {});
          }
        }
      }
    }, {
      key: 'addKeyCode',
      value: function addKeyCode(code, name) {
        keys[code] = name;
      }
    }, {
      key: 'addKeyAlias',
      value: function addKeyAlias(keyName, keyAlias) {
        keyAliases[keyName] = keyAliases[keyName] || [];
        keyAliases[keyName].push(keyAlias);
      }
    }, {
      key: 'isKeyCodePressed',
      value: function isKeyCodePressed(keyCode) {
        return !!keyStates[keyCode];
      }
    }, {
      key: 'isKeyCodeTriggered',
      value: function isKeyCodeTriggered(keyCode) {
        return triggeredKeys.indexOf(keyCode) >= 0;
      }
    }, {
      key: 'isKeyCodeReleased',
      value: function isKeyCodeReleased(keyCode) {
        return releasedKeys.indexOf(keyCode) >= 0;
      }
    }, {
      key: 'getKeyCodes',
      value: function getKeyCodes(keyName) {
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

        return codes;
      }
    }, {
      key: 'getKeyNames',
      value: function getKeyNames(keyCode) {
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
    }, {
      key: 'isKeyNamePressed',
      value: function isKeyNamePressed(keyName) {
        var codes = this.getKeyCodes(keyName);

        return codes.find((function (key) {
          return this.isKeyCodePressed(key);
        }).bind(this)) || false;
      }
    }, {
      key: 'isKeyNameReleased',
      value: function isKeyNameReleased(keyName) {
        var codes = this.getKeyCodes(keyName);

        return codes.find((function (key) {
          return this.isKeyCodeReleased(key);
        }).bind(this)) || false;
      }
    }, {
      key: 'isKeyNameTriggered',
      value: function isKeyNameTriggered(keyName) {
        var codes = this.getKeyCodes(keyName);

        return codes.find((function (key) {
          return this.isKeyCodeTriggered(key);
        }).bind(this)) || false;
      }
    }, {
      key: 'isKeyPressed',
      value: function isKeyPressed(keyCodeOrName) {
        if (typeof keyCodeOrName == "string") {
          return this.isKeyNamePressed(keyCodeOrName);
        } else {
          return this.isKeyCodePressed(keyCodeOrName);
        }
      }
    }, {
      key: 'isKeyTriggered',
      value: function isKeyTriggered(keyCodeOrName) {
        if (typeof keyCodeOrName == "string") {
          return this.isKeyNameTriggered(keyCodeOrName);
        } else {
          return this.isKeyCodeTriggered(keyCodeOrName);
        }
      }
    }, {
      key: 'isKeyReleased',
      value: function isKeyReleased(keyCodeOrName) {
        if (typeof keyCodeOrName == "string") {
          return this.isKeyNameReleased(keyCodeOrName);
        } else {
          return this.isKeyCodeReleased(keyCodeOrName);
        }
      }
    }, {
      key: 'getPressedKeys',
      value: function getPressedKeys(keys) {
        return Object.keys(keys).filter((function (key) {
          return this.isKeyCodePressed(key);
        }).bind(this));
      }
    }, {
      key: 'getFirstDirection',
      value: function getFirstDirection() {
        return ['left', 'right', 'up', 'down'].find((function (direction) {
          return this.isKeyNamePressed(direction);
        }).bind(this)) || '';
      }
    }, {
      key: 'getDirection',
      value: function getDirection() {
        return ['left', 'right', 'up', 'down'].filter((function (direction) {
          return this.isKeyNamePressed(direction);
        }).bind(this)).join('-');
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(event) {
        if (this.isBlockedKey(event.keyCode)) {
          event.preventDefault();
        }

        keyStates[event.keyCode] = true;
      }
    }, {
      key: 'onKeyUp',
      value: function onKeyUp(event) {
        keyStates[event.keyCode] = false;
      }
    }, {
      key: 'onWindowBlur',
      value: function onWindowBlur() {
        this.clear();
      }
    }, {
      key: 'clear',
      value: function clear() {
        keyStates = {};
      }
    }, {
      key: 'isBlockedKey',
      value: function isBlockedKey(keyCode) {
        switch (keyCode) {
          case 8: // backspace
          case 33: // pageup
          case 34: // pagedown
          case 37: // left arrow
          case 38: // up arrow
          case 39: // right arrow
          case 40:
            // down arrow
            return true;
          default:
            return false;
        }
      }
    }]);

    return InputManager;
  })();

  document.addEventListener('keydown', InputManager.onKeyDown.bind(InputManager));
  document.addEventListener('keyup', InputManager.onKeyUp.bind(InputManager));
  window.addEventListener('blur', InputManager.onWindowBlur.bind(InputManager));

  TCHE.on("started", function () {
    TCHE.renderer.view.addEventListener("click", function (evt) {
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

  TCHE.registerStaticClass('InputManager', InputManager);
})();
(function () {
  var scene = undefined;
  var newScene = undefined;

  var SceneManager = (function () {
    function SceneManager() {
      _classCallCheck(this, SceneManager);
    }

    _createClass(SceneManager, [{
      key: 'scene',
      get: function get() {
        return scene;
      },
      set: function set(value) {
        scene = value;
      }
    }, {
      key: 'newScene',
      get: function get() {
        return newScene;
      }
    }], [{
      key: 'requestAnimationFrame',
      value: function requestAnimationFrame() {
        window.requestAnimationFrame(this.update.bind(this));
      }
    }, {
      key: '_doSceneChange',
      value: function _doSceneChange() {
        if (newScene !== undefined) {
          if (!!scene) {
            scene.terminate();
            scene = undefined;
          }

          if (!!newScene) {
            scene = new newScene();
          }
        }

        newScene = undefined;
      }
    }, {
      key: 'update',
      value: function update() {
        TCHE.startFrame();

        this._doSceneChange();

        TCHE.FileManager.update();
        TCHE.InputManager.update();

        TCHE.globals.map.update();
        TCHE.globals.player.update();

        if (!!scene) {
          scene.update();

          TCHE.renderer.render(scene);
        }

        TCHE.endFrame();

        //If there's no active scene, then end the game
        if (!!scene) {
          this.requestAnimationFrame();
        }
      }
    }, {
      key: 'changeScene',
      value: function changeScene(newSceneClass) {
        newScene = newSceneClass;
      }
    }, {
      key: 'start',
      value: function start(initialScene) {
        this.changeScene(initialScene);
        this.requestAnimationFrame();
      }
    }, {
      key: 'end',
      value: function end() {
        this.changeScene(null);
      }
    }]);

    return SceneManager;
  })();

  TCHE.registerStaticClass('SceneManager', SceneManager);
})();
(function () {
  return TCHE.SoundManager = Trigger(new ((function () {
    function SoundManager() {
      _classCallCheck(this, SoundManager);
    }

    _createClass(SoundManager, [{
      key: 'play',
      value: function play(sound) {
        createjs.Sound.play(sound);
      }
    }, {
      key: 'setSound',
      value: function setSound(id, src) {
        createjs.Sound.registerSound({ src: src, id: id });
      }
    }, {
      key: 'setSounds',
      value: function setSounds(obj) {
        var assetsPath = arguments.length <= 1 || arguments[1] === undefined ? "./assets/" : arguments[1];

        createjs.Sound.createjs.Sound.registerSounds(sounds, assetsPath);
      }
    }]);

    return SoundManager;
  })())());
})();

(function () {
  var Scene = (function (_PIXI$Container2) {
    _inherits(Scene, _PIXI$Container2);

    function Scene() {
      _classCallCheck(this, Scene);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Scene).call(this));
    }

    _createClass(Scene, [{
      key: 'update',
      value: function update() {}
    }, {
      key: 'terminate',
      value: function terminate() {}
    }]);

    return Scene;
  })(PIXI.Container);

  TCHE.registerClass('Scene', Scene);
})();
(function () {
  var SceneLoading = (function (_TCHE$Scene) {
    _inherits(SceneLoading, _TCHE$Scene);

    function SceneLoading() {
      _classCallCheck(this, SceneLoading);

      var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneLoading).call(this));

      _this6.createBackground();
      _this6.createMessage();
      return _this6;
    }

    _createClass(SceneLoading, [{
      key: 'update',
      value: function update() {
        this.updateBackground();
        this.updateMessage();
      }
    }, {
      key: 'createBackground',
      value: function createBackground() {
        this._backgroundGraphic = new PIXI.Graphics();
        this._backgroundGraphic.beginFill("0xCCCCCC");
        this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
        this._backgroundGraphic.endFill();

        this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
        this._backgroundTexture.render(this._backgroundGraphic);

        this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

        this.addChild(this._backgroundSprite);
      }
    }, {
      key: 'createMessage',
      value: function createMessage() {
        this._messageText = "Now Loading";

        this._messageSprite = new PIXI.Text(this._messageText);
        this._messageSprite.anchor.x = 0;
        this._messageSprite.anchor.y = 0.5;
        this._messageSprite.position.y = Math.floor(TCHE.renderer.height / 2);
        this._messageSprite.position.x = Math.floor(TCHE.renderer.width / 2 - this._messageSprite.width / 2);

        this.addChild(this._messageSprite);

        this._dots = 0;
        this._counter = 0;
      }
    }, {
      key: 'updateBackground',
      value: function updateBackground() {}
    }, {
      key: 'updateMessage',
      value: function updateMessage() {
        this._counter++;

        if (this._counter > 20) {
          this._counter = 0;
          this._dots++;

          if (this._dots > 3) {
            this._dots = 0;
          }

          var string = this._messageText;
          for (var i = 0; i < this._dots; i++) {
            string += ".";
          }

          this._messageSprite.text = string;
        }
      }
    }]);

    return SceneLoading;
  })(TCHE.Scene);

  TCHE.registerClass('SceneLoading', SceneLoading);
})();
(function () {
  var SceneLaunch = (function (_TCHE$SceneLoading) {
    _inherits(SceneLaunch, _TCHE$SceneLoading);

    function SceneLaunch() {
      _classCallCheck(this, SceneLaunch);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SceneLaunch).call(this));
    }

    _createClass(SceneLaunch, [{
      key: 'update',
      value: function update() {
        if (TCHE.FileManager.isLoaded()) {
          TCHE.fire("ready");
          TCHE.SceneManager.changeScene(TCHE.SceneMap);
        }
      }
    }]);

    return SceneLaunch;
  })(TCHE.SceneLoading);

  TCHE.registerClass('SceneLaunch', SceneLaunch);
})();
(function () {
  var SceneMap = (function (_TCHE$Scene2) {
    _inherits(SceneMap, _TCHE$Scene2);

    function SceneMap() {
      _classCallCheck(this, SceneMap);

      var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneMap).call(this));

      TCHE.globals.player.x = TCHE.data.game.player.x;
      TCHE.globals.player.y = TCHE.data.game.player.y;
      TCHE.globals.player.width = TCHE.data.game.player.width;
      TCHE.globals.player.height = TCHE.data.game.player.height;
      TCHE.globals.player.image = TCHE.data.game.player.image;

      TCHE.globals.map.loadMap(TCHE.data.game.initialMap);

      _this8._mapSprite = new TCHE.Map2d(TCHE.globals.map);
      _this8.addChild(_this8._mapSprite);
      return _this8;
    }

    _createClass(SceneMap, [{
      key: 'update',
      value: function update() {
        _get(Object.getPrototypeOf(SceneMap.prototype), 'update', this).call(this);
        this._mapSprite.update();
      }
    }]);

    return SceneMap;
  })(TCHE.Scene);

  TCHE.registerClass('SceneMap', SceneMap);
})();
(function () {
  var collisionMapDirty = true;

  var Map = (function () {
    function Map() {
      _classCallCheck(this, Map);

      this._mapData = {};
      this._objects = [];
      this._collisionMap = [];
    }

    _createClass(Map, [{
      key: 'requestCollisionMapRefresh',
      value: function requestCollisionMapRefresh() {
        collisionMapDirty = true;
      }
    }, {
      key: 'createObjects',
      value: function createObjects() {
        var objectList = [];

        if (!!this._mapData) {
          objectList = this._mapData.objects || objectList;
        }

        objectList.forEach((function (obj) {
          var objCharacter = new TCHE.Character();
          objCharacter.x = obj.x;
          objCharacter.y = obj.y;
          objCharacter.width = obj.width;
          objCharacter.height = obj.height;
          objCharacter.image = obj.image;

          this._objects.push(objCharacter);
        }).bind(this));

        collisionMapDirty = true;
      }
    }, {
      key: 'addCharacterToCollisionMap',
      value: function addCharacterToCollisionMap(character) {
        for (var x = character.x; x < character.rightX; x++) {
          for (var y = character.y; y < character.bottomY; y++) {
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

    }, {
      key: 'createCollisionMap',
      value: function createCollisionMap() {
        this._collisionMap = [];

        for (var i = 0; i < this._objects.length; i++) {
          var obj = this._objects[i];

          this.addCharacterToCollisionMap(obj);
        }

        this.addCharacterToCollisionMap(TCHE.globals.player);
        collisionMapDirty = false;
      }
    }, {
      key: 'update',
      value: function update() {}
    }, {
      key: 'isValid',
      value: function isValid(x, y) {
        if (x >= this.width) return false;
        if (y >= this.height) return false;
        if (x < 0) return false;
        if (y < 0) return false;

        return true;
      }
    }, {
      key: 'isCollided',
      value: function isCollided(x, y, character) {
        if (x > this.collisionMap.length) return false;
        if (!this.collisionMap[x]) return false;
        if (y > this.collisionMap[x].length) return false;
        if (!this.collisionMap[x][y]) return false;

        var blockingCharacter = this.collisionMap[x][y].find(function (item) {
          return item != character;
        });

        if (blockingCharacter === undefined) {
          return false;
        }

        blockingCharacter.onBlockCharacter(character);
        character.onBlockedBy(blockingCharacter);
        return true;
      }
    }, {
      key: 'canMoveLeft',
      value: function canMoveLeft(character) {
        for (var y = character.y; y < character.bottomY; y++) {
          if (!this.isValid(character.x - character.stepSize, y)) return false;

          for (var i = character.stepSize; i > 0; i--) {
            if (this.isCollided(character.x - i, y, character)) {
              return false;
            }
          }
        }

        return true;
      }
    }, {
      key: 'canMoveRight',
      value: function canMoveRight(character) {
        for (var y = character.y; y < character.bottomY; y++) {
          if (!this.isValid(character.rightX + character.stepSize, y)) return false;

          for (var i = character.stepSize; i > 0; i--) {
            if (this.isCollided(character.rightX + i, y, character)) {
              return false;
            }
          }
        }

        return true;
      }
    }, {
      key: 'canMoveUp',
      value: function canMoveUp(character) {
        for (var x = character.x; x < character.rightX; x++) {
          if (!this.isValid(x, character.y - character.stepSize)) return false;

          for (var i = character.stepSize; i > 0; i--) {
            if (this.isCollided(x, character.y - i, character)) {
              return false;
            }
          }
        }

        return true;
      }
    }, {
      key: 'canMoveDown',
      value: function canMoveDown(character) {
        for (var x = character.x; x < character.rightX; x++) {
          if (!this.isValid(x, character.bottomY + character.stepSize)) return false;

          for (var i = character.stepSize; i > 0; i--) {
            if (this.isCollided(x, character.bottomY + i, character)) {
              return false;
            }
          }
        }

        return true;
      }
    }, {
      key: 'canMove',
      value: function canMove(character, direction) {
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
    }, {
      key: 'loadMap',
      value: function loadMap(mapName) {
        this.mapData = TCHE.maps[mapName];
      }
    }, {
      key: 'mapData',
      get: function get() {
        return this._mapData;
      },
      set: function set(value) {
        this._mapData = value;
        this._objects = [];
        this.createObjects();
      }
    }, {
      key: 'width',
      get: function get() {
        return this._mapData.width || 0;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._mapData.height || 0;
      }
    }, {
      key: 'objects',
      get: function get() {
        return this._objects;
      }
    }, {
      key: 'collisionMap',
      get: function get() {
        if (collisionMapDirty) {
          this.createCollisionMap();
        }

        return this._collisionMap;
      }
    }]);

    return Map;
  })();

  TCHE.registerClass('Map', Map);
})();
(function () {
  var Player = (function (_TCHE$Character) {
    _inherits(Player, _TCHE$Character);

    function Player() {
      _classCallCheck(this, Player);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));
    }

    _createClass(Player, [{
      key: 'update',
      value: function update() {
        _get(Object.getPrototypeOf(Player.prototype), 'update', this).call(this);
        this.processInput();
      }
    }, {
      key: 'processInput',
      value: function processInput() {
        var direction = TCHE.InputManager.getDirection();
        if (!!direction) {
          this.move(direction);
        }
      }
    }]);

    return Player;
  })(TCHE.Character);

  TCHE.registerClass('Player', Player);
})();
