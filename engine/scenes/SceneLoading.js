(function(){
  class SceneLoading extends TCHE.Scene {
    constructor() {
      super();
      this.createBackground();
      this.createMessage();
    }

    update() {
      this.updateBackground();
      this.updateMessage();      
    }    

    createBackground() {
      this._backgroundGraphic = new PIXI.Graphics();
      this._backgroundGraphic.beginFill("0xCCCCCC");
      this._backgroundGraphic.drawRect(0, 0, TCHE.renderer.width, TCHE.renderer.height);
      this._backgroundGraphic.endFill();

      this._backgroundTexture = new PIXI.RenderTexture(TCHE.renderer, TCHE.renderer.width, TCHE.renderer.height);
      this._backgroundTexture.render(this._backgroundGraphic);

      this._backgroundSprite = new PIXI.Sprite(this._backgroundTexture);

      this.addChild(this._backgroundSprite);
    }

    createMessage() {
      this._messageText = "Loading";

      this._messageSprite = new PIXI.Text("");
      this._messageSprite.anchor.x = 0.5;
      this._messageSprite.anchor.y = 0.5;
      this._messageSprite.position.y = Math.floor(TCHE.renderer.height / 2);
      this._messageSprite.position.x = Math.floor(TCHE.renderer.width / 2);

      this.addChild(this._messageSprite);

      this._dots = 0;
      this._counter = 0;
      this._initialCounter = 10;
    }

    updateBackground() {

    }

    updateMessage() {
      if (!!this._initialCounter && this._initialCounter > 0) {
        this._initialCounter--;
        return;
      }

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

  }
  
  TCHE.registerClass('SceneLoading', SceneLoading);
})();