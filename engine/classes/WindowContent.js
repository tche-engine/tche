(function(){
  class WindowContent extends PIXI.RenderTexture {
    constructor(renderer, width, height, skinName) {
      super(renderer, width, height);
      this._objects = [];
      this._skinName = skinName;

      this._style = {
        "font" : "12pt Arial",
        "fill" : "black",
        "align" : "left"
      };      
    }

    get style() {
      return this._style;
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

    mergeStyles(style1, style2) {
      if (!style2) {
        return style1;
      }
      if (!style1) {
        return style2;
      }

      var mergedStyle = TCHE.Clone.shallow(style1);
      for (var key in style2) {
        mergedStyle[key] = style2[key];
      }

      return mergedStyle;
    }

    drawText(text, x, y, style) {
      var mergedStyle = this.mergeStyles(this.style, style);
      var textObj = new PIXI.Text(text, mergedStyle);
      textObj.x = x;
      textObj.y = y;

      this.renderObjectInContainer(textObj);
      return textObj;
    }

    drawRightAlignedText(text, x, y, width, style) {
      var mergedStyle = this.mergeStyles(this.style, style);
      var textObj = new PIXI.Text(text, mergedStyle);
      textObj.x = x;
      textObj.y = y;

      if (textObj.width > width) {
        textObj.width = width;
      } else {
        var diffX = width - textObj.width;
        textObj.x += diffX;
      }

      var container = new PIXI.Container();
      container.addChild(textObj);

      container.width = x + width;
      this.render(container);
      return textObj;      
    }

    drawTextCentered(text, x, y, width, style) {
      var mergedStyle = this.mergeStyles(this.style, style);
      var textObj = new PIXI.Text(text, mergedStyle);
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