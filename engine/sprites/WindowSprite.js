(function(){
  class WindowSprite extends TCHE.Sprite {
    constructor(width, height, skinName) {
      super();

      if (skinName === undefined) {
        skinName = TCHE.data.game.mainSkin;
      }

      this.createBackground(skinName);

      this.createContents(width, height, skinName);
      this.createSprite();
      this.refresh();
    }

    get style() {
      return this._contents.style;
    }

    get width() {
      return this._contents.width;
    }
    get height() {
      return this._contents.height;
    }

    get contents() {
      return this._contents;
    }

    get lineHeight() {
      var text = new PIXI.Text("Testing", this.style);
      return text.height;
    }

    get margin() {
      return 16;
    }

    get skinName() {
      return this._contents.skinName;
    }

    createBackground(skinName) {
      if (!!this._backgroundContainer) {
        this._backgroundContainer.removeChildren();
      } else {
        this._backgroundContainer = new PIXI.Container();
        this.addChild(this._backgroundContainer);
      }

      TCHE.SkinManager.addSkinBackground(skinName, this, this._backgroundContainer);
    }

    drawCursor(x, y) {
      TCHE.SkinManager.drawSkinCursor(this.skinName, this._contents, x, y);
    }

    createContents(width, height, skinName) {
      this._contents = new TCHE.WindowContent(TCHE.renderer, width, height, skinName);
    }

    createSprite() {
      this._sprite = new PIXI.Sprite(this._contents);
      this.addChild(this._sprite);      
    }

    drawFrame() {
      if (!!this.skinName) {
        this._contents.drawSkinFrame();
      }
    }

    refresh() {
      this.clear();
      // this.drawFrame();
      this.draw();

      this._contents.update();
    }

    clear() {
      this._contents.clear();
    }

    draw() {
    }

    redraw() {
      this.clear();
      this.draw();
      this._contents.update();
    }

    update() {
      // this.refresh();
    }
  }
  
  TCHE.registerClass('WindowSprite', WindowSprite);
})();