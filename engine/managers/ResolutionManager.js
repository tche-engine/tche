(function(){
  class ResolutionManager {
    static updateResolution() {
      if (!TCHE.data.game.resolution) return;

      var dynamic = TCHE.data.game.resolution.useDynamicResolution || false;

      if (dynamic) {
        TCHE.onResize = function(e){
          var size = TCHE.getClientSize();
          
          TCHE.renderer.resize(size.width, size.height);

          TCHE.renderer.view.style.width = size.width + 'px';
          TCHE.renderer.view.style.height = size.height + 'px';
        };

        TCHE.onResize();
      } else {
        var width = TCHE.data.game.resolution.width;
        var height = TCHE.data.game.resolution.height;

        TCHE.renderer.resize(width, height);

        if (TCHE.Params.isNwjs) {
          var gui = require('nw.gui');
          var win = gui.Window.get();

          var screenWidth = TCHE.data.game.resolution.screenWidth;
          var screenHeight = TCHE.data.game.resolution.screenHeight;

          win.resizeTo(screenWidth, screenHeight);
          win.setPosition("center");
        }
      }
    }
  }
  
  TCHE.registerStaticClass('ResolutionManager', ResolutionManager);
})();