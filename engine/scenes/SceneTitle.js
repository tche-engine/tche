(function(){
  class SceneTitle extends TCHE.SceneWindow {
    constructor(params) {
      super();

      this._windowSprite = new TCHE.WindowTitleChoices();
      this._windowSprite.x = Math.floor(TCHE.renderer.width / 2) - Math.floor(this._windowSprite.width / 2);
      this._windowSprite.y = TCHE.renderer.height - this._windowSprite.height;

      this.addChild(this._windowSprite);
    }

    update() {
      super.update();

      this._windowSprite.update();
    }    
  }
  
  TCHE.registerClass('SceneTitle', SceneTitle);
})();