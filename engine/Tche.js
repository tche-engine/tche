var TCHE = {
  globals : {},
  data : {},
  maps : {}
};

(function($){
  /*jshint validthis: true */
  "use strict";

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
    TCHE.fire("started");
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