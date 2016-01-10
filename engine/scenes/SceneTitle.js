(function(){
  class SceneTitle extends TCHE.SceneWindow {
    constructor(params) {
      super();

      this._windowSprite = new TCHE.WindowTitleChoices(TCHE.renderer.width, TCHE.renderer.height);
      this.addChild(this._windowSprite);
    }

    update() {
      super.update();

      this._windowSprite.update();
    }    
  }
  
  TCHE.registerClass('SceneTitle', SceneTitle);
})();