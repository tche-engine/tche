(function(){
  class WindowContent extends PIXI.RenderTexture {
    constructor(renderer, width, height) {
      super(renderer, width, height);
      this._objects = [];
    }

    update() {
    }

    renderObjectInContainer(object) {
      let container = new PIXI.Container();
      container.addChild(object);
      this.render(container);
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

      this.renderObjectInContainer(textObj);
    }
  }
  
  TCHE.registerClass('WindowContent', WindowContent);
})();