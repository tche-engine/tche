var TCHE = {
  globals : {},
  data : {},
  maps : {},
  objectTypes : {},
  spriteTypes : {},
  mapTypes : {},
  skinTypes : {}
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
    settings.screenWidth = settings.screenWidth || window.innerWidth;
    settings.screenHeight = settings.screenHeight || window.innerHeight;
    settings.backgroundColor = settings.backgroundColor || 0x1099bb;
    settings.transparent = settings.transparent || true;

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

  $.getClientSize = function(){
    return {
      width : window.innerWidth,
      height : window.innerHeight
    };
  };

  $.onResize = function(e){
    var size = TCHE.getClientSize();
    TCHE.renderer.resize(size.width, size.height);    
  };

  $.init = function(settings) {
    TCHE.fillSettings(settings);

    var options = {backgroundColor : settings.backgroundColor, transparent : settings.transparent};
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
    TCHE.renderer.view.style.width = "100%";
    TCHE.renderer.view.style.height = "100%";

    window.addEventListener('resize', function(e){ TCHE.onResize(e); } );
    TCHE.onResize();

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