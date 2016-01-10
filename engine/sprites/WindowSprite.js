(function(){
  class WindowSprite extends TCHE.Sprite {
    constructor(width, height) {
      super();
      this.createContents(width, height);
      this.createSprite();
      this.refresh();
    }

    get width() {
      return this._contents.width;
    }
    get height() {
      return this._contents.height;
    }

    createContents(width, height) {
      this._contents = new TCHE.WindowContent(TCHE.renderer, width, height);
    }

    createSprite() {
      this._sprite = new PIXI.Sprite(this._contents);
      this.addChild(this._sprite);      
    }

    refresh() {
      this.clear();
      this.draw();

      this._contents.update();
    }

    clear() {
      this._contents.clear();
    }

    draw() {
    }

    update() {
      // this.refresh();
    }
  }
  
  TCHE.registerClass('WindowSprite', WindowSprite);
})();