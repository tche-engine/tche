var TCHE = {
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
    if (xhr.status < 200) {
      return xhr.responseText;
    }
    else {
      throw new Error("Cannot load file " + filePath);
    }
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

  function declareClass(className /*, parent, content*/) {
    var parent = Object;
    var content;
    var classObj;

    if (arguments.length > 2) {
      parent = arguments[1];
      content = arguments[2];
    } else if (arguments.length > 1) {
      parent = arguments[1];
    }

    classObj = this.extend(parent);

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

  function init(){
    this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x1099bb});
    document.body.appendChild(this.renderer.view);

    this.SceneManager.changeScene(new TCHE.SceneSample());
    this.SceneManager.requestAnimationFrame();
  }

  $.ajaxLoadFile = ajaxLoadFile;
  $.extend = extend;
  $.declareClass = declareClass;
  $.reader = reader;
  $.writer = writer;
  $.accessor = accessor;
  $.shallowClone = shallowClone;
  $.deepClone = deepClone;
  $.init = init;
})(TCHE);