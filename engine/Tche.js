var TCHE = {
  globals : {},
  data : {},
  maps : {}
};

(function($){
  /*jshint validthis: true */
  "use strict";

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
  $.init = init;
  $.startFrame = startFrame;
  $.endFrame = endFrame;
  $.registerClass = registerClass;
  $.registerStaticClass = registerStaticClass;

  $.trigger(TCHE);
})(TCHE);