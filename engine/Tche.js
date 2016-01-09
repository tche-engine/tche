var TCHE = {
  globals : {},
  data : {},
  maps : {},
  spriteTypes : {}
};

(function($){
  /*jshint validthis: true */
  "use strict";

  $.registerClass = function(className, classDeclaration) {
    TCHE[className] = classDeclaration;
    TCHE.trigger(classDeclaration.prototype);
  };

  $.registerStaticClass = function(className, classDeclaration) {
    TCHE[className] = classDeclaration;
    TCHE.trigger(classDeclaration);    
  };

  $.fillSettings = function(settings) {
    settings.screenWidth = settings.screenWidth || 800;
    settings.screenHeight = settings.screenHeight || 600;
    settings.backgroundColor = settings.backgroundColor || 0x1099bb;

    settings.showFps = settings.showFps !== false;
    settings.fpsVisibleOnStartup = settings.fpsVisibleOnStartup === true;

    TCHE.settings = settings;
  };

  $.createGlobals = function(){
    TCHE.globals.player = new TCHE.Player();
    TCHE.globals.map = new TCHE.Map();
  };

  $.setupFpsMeter = function(){
    if (TCHE.settings.showFps) {
      TCHE.meter = new FPSMeter({theme : 'transparent', graph : 1, decimals : 0});

      if (!TCHE.settings.fpsVisibleOnStartup) {
        TCHE.meter.hide();
      }

      TCHE.InputManager.on("FPS", function (argument) {
        return TCHE.meter.isPaused ? TCHE.meter.show() : TCHE.meter.hide();
      });
    }
  };

  $.init = function(settings) {
    TCHE.fillSettings(settings);

    var options = {backgroundColor : settings.backgroundColor};
    var width = settings.screenWidth;
    var height = settings.screenHeight;

    if (TCHE.Params.forceCanvas) {
      TCHE.renderer = new PIXI.CanvasRenderer(width, height, options);
    } else if (TCHE.Params.forceWebGl) {
      TCHE.renderer = new PIXI.WebGLRenderer(width, height, options);
    } else {
      TCHE.renderer = PIXI.autoDetectRenderer(width, height, options);
    }

    document.body.appendChild(TCHE.renderer.view);

    TCHE.setupFpsMeter();
    TCHE.createGlobals();

    TCHE.SceneManager.start(TCHE.SceneLaunch);
    TCHE.fire("started");
  };

  $.startFrame = function(){
    if (!!TCHE.meter) {
      TCHE.meter.tickStart();
    }
  };

  $.endFrame = function(){
    if (!!TCHE.meter) {
      TCHE.meter.tick();
    }
  };

  $.trigger = Trigger;
  $.trigger(TCHE);
})(TCHE);