var TCHE = {
  globals : {},
  data : {},
  maps : {}
};

(function($){
  /*jshint validthis: true */
  "use strict";

  function _defaultGetter(name) {
    return function () {
      return this['_' + name];
    };
  }

  function _defaultSetter(name) {
    return function (value) {
      var prop = '_' + name;
      if ((!this[prop]) || this[prop] !== value) {
        this[prop] = value;
        if (this._refresh) {
          this._refresh();
        }
      }
    };
  }

  function ajaxLoadFile(filePath, mimeType) {
    mimeType = mimeType || "application/json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET",filePath,false);
    if (mimeType && xhr.overrideMimeType) {
      xhr.overrideMimeType(mimeType);
    }
    xhr.send();
    if (xhr.status <= 200 || xhr.status == 304) {
      return xhr.responseText;
    }
    else {
      throw new Error("Cannot load file " + filePath);
    }
  }

  function ajaxLoadFileAsync(name, filePath, onLoad, onError, mimeType){
    mimeType = mimeType || "application/json";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath);
    if (mimeType && xhr.overrideMimeType) {
      xhr.overrideMimeType(mimeType);
    }
    if(onLoad === undefined){
      onLoad = function(xhr, filePath, name) {
        if (xhr.status < 400) {
          TCHE.data[name] = JSON.parse(xhr.responseText);
        }
      };
    }
    xhr.onload = function() {
      onLoad.call(this, xhr, filePath, name);
    };
    xhr.onerror = onError;
    if(onLoad !== undefined){
      TCHE.data[name] = null;
    }
    xhr.send();
  }

  function extend(/*parent , constructor */) {
    var constructor, parent;
    parent = arguments.length > 0 ? arguments[0] : Object;
    constructor = arguments.length > 1 ? arguments[1] : function () {
      parent.apply(this, arguments);
      if(!parent.prototype.initialize && this.initialize) {
        this.initialize.apply(this, arguments);
      }
    };

    constructor.prototype = Object.create(parent.prototype);
    constructor.prototype.constructor = constructor;
    constructor.prototype.parentClass = parent.prototype;

    constructor.extend = function (/* constructor*/) {
      if (arguments.length) {
        return $.extend(constructor, arguments[0]);
      }
      return $.extend(constructor, function () {
        constructor.apply(this, arguments);
      });
    };
    return constructor;
  }

  function _declareClass(className /*, parent, content*/) {
    var parent = Object;
    var content;
    var classObj;

    if (arguments.length > 2) {
      parent = arguments[1];
      content = arguments[2];
    } else if (arguments.length > 1) {
      parent = arguments[1];
    }

    classObj = TCHE.extend(parent);

    if (!!content) {
      for (var key in content) {
        if (content.hasOwnProperty(key)) {
          classObj.prototype[key] = content[key];
        }
      }
    }

    TCHE[className] = classObj;
    return classObj;
  }

  function declareClass(className /*, parent, content*/) {
    return this.trigger(_declareClass.apply(this, arguments).prototype);
  }

  function declareStaticClass(className) {
    return this.trigger(_declareClass(className));
  }

  function reader(obj, name /*, getter */) {
    Object.defineProperty(obj, name, {
      get: arguments.length > 2 ? arguments[2] : _defaultGetter(name),
      configurable: true
    });
  }

  function writer(obj, name /*, setter*/) {
    Object.defineProperty(obj, name, {
      set: arguments.length > 2 ? arguments[2] : _defaultSetter(name),
      configurable: true
    });
  }

  function accessor(value, name /* , setter, getter */) {
    Object.defineProperty(value, name, {
      get: arguments.length > 3 ? arguments[3] : _defaultGetter(name),
      set: arguments.length > 2 ? arguments[2] : _defaultSetter(name),
      configurable: true
    });
  }

  function deepClone(obj) {
    var result;
    if (obj instanceof Array) {
      return obj.map(function (i) { return $.deepClone(i); });
    } else if (obj && !obj.prototype && (typeof obj == 'object' || obj instanceof Object)) {
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
    } else if (obj && !obj.prototype && (typeof obj == 'object' || obj instanceof Object)) {
      result = {};
      for (var p in obj) {
        result[p] = obj[p];
      }
      return result;
    }
    return obj;
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

  function createGlobals(){
    TCHE.globals.player = new TCHE.Player();
    TCHE.globals.map = new TCHE.Map();
  }

  function setupFpsMeter(){
    if (TCHE.settings.showFps) {
      TCHE.meter = new FPSMeter({theme : 'transparent', graph : 1, decimals : 0});

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

    TCHE.renderer = PIXI.autoDetectRenderer(settings.screenWidth, settings.screenHeight, {backgroundColor : settings.backgroundColor});
    document.body.appendChild(TCHE.renderer.view);

    setupFpsMeter();
    createGlobals();

    TCHE.SceneManager.start(TCHE.SceneLaunch);
    TCHE.fire("ready");
  }

  function startFrame(){
    if (!!TCHE.meter) {
      TCHE.meter.tickStart();
    }
  }

  function endFrame(){
    if (!!TCHE.meter) {
      TCHE.meter.tick();
    }
  }

  $.trigger = Trigger;
  $.fillSettings = fillSettings;
  $.ajaxLoadFile = ajaxLoadFile;
  $.ajaxLoadFileAsync = ajaxLoadFileAsync;
  $.extend = extend;
  $.declareClass = declareClass;
  $.declareStaticClass = declareStaticClass;
  $.reader = reader;
  $.writer = writer;
  $.accessor = accessor;
  $.shallowClone = shallowClone;
  $.deepClone = deepClone;
  $.init = init;
  $.startFrame = startFrame;
  $.endFrame = endFrame;

  $.trigger(TCHE);
})(TCHE);
