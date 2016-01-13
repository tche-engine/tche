(function(){
  class WindowContent extends PIXI.RenderTexture {
    constructor(renderer, width, height, skinName) {
      super(renderer, width, height);
      this._objects = [];
      this._skinName = skinName;
    }

    get skinName() { return this._skinName; }
    set skinName(value) {
      this._skinName = value;
    }

    update() {

    }

    drawSkinFrame() {
      if (!this._skinName) {
        return;
      }

      TCHE.SkinManager.drawSkinFrame(this._skinName, this);
    }

    clear() {
      super.clear();
      this.drawSkinFrame();
    }

    renderObjectInContainer(object) {
      var container = new PIXI.Container();
      container.addChild(object);
      this.render(container);
    }

    renderResized(sprite, x, y, width, height) {
      var renderTexture = new PIXI.RenderTexture(TCHE.renderer, width, height);
      
      var matrix = new PIXI.Matrix();
      matrix.scale(width / sprite.width, height / sprite.height);

      renderTexture.render(sprite, matrix);

      var newSprite = new PIXI.Sprite(renderTexture);
      newSprite.x = x;
      newSprite.y = y;
      this.renderObjectInContainer(newSprite);
    }

    drawRect(color, x, y, width, height, alpha) {
      var graphics = new PIXI.Graphics();

      graphics.beginFill(color, alpha);
      graphics.drawRect(x, y, width, height);
      graphics.endFill();

      this.render(graphics);
    }

    drawText(text, x, y) {
      var textObj = new PIXI.Text(text);
      textObj.x = x;
      textObj.y = y;

      this.renderObjectInContainer(textObj);
      return textObj;
    }

    drawTextCentered(text, x, y, width) {
      var textObj = new PIXI.Text(text);
      textObj.x = x;
      textObj.y = y;

      if (textObj.width > width) {
        textObj.width = width;
      } else {
        var diffX = width - textObj.width;
        textObj.x += Math.floor(diffX / 2);
      }

      var container = new PIXI.Container();
      container.addChild(textObj);

      container.width = x + width;
      this.render(container);
      return textObj;
    }
  }
  
  TCHE.registerClass('WindowContent', WindowContent);
})();