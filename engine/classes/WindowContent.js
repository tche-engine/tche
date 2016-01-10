(function(){
  class WindowContent extends PIXI.RenderTexture {
    constructor(renderer, width, height) {
      super(renderer, width, height);
      this._objects = [];
    }

    update() {
    }

    drawRect(color, x, y, width, height, alpha) {
      let graphics = new PIXI.Graphics();

      graphics.beginFill(color, alpha);
      graphics.drawRect(x, y, width, height);
      graphics.endFill();

      this.render(graphics);
    }

    drawText(text, x, y) {
      let textObj = new PIXI.Text(text);
      textObj.x = x;
      textObj.y = y;
      this.render(textObj);
    }
  }
  
  TCHE.registerClass('WindowContent', WindowContent);
})();