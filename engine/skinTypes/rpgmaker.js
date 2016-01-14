(function(){
  class RpgMakerSkinType extends TCHE.SkinType {
    static drawTopLeftCorner(content, texture) {
      //The top left corner is at y 0, x = 50%, width and height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 2),
        y : 0,
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      content.render(sprite);
    }

    static drawTopRightCorner(content, texture) {
      //The top right corner is at y 0, x = 87,5%, width and height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 8 * 7),
        y : 0,
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      sprite.x = content.width - texture.frame.width;
      sprite.y = 0;

      content.renderObjectInContainer(sprite);
    }

    static drawBottomLeftCorner(content, texture) {
      //The bottom left corner is at y = 37,5%, x = 50%, width and height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 2),
        y : Math.floor(texture.baseTexture.height / 8 * 3),
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = content.height - texture.frame.height;

      content.renderObjectInContainer(sprite);
    }

    static drawBottomRightCorner(content, texture) {
      //The bottom right corner is at y = 37,5%, x = 87,5%, width and height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 8 * 7),
        y : Math.floor(texture.baseTexture.height / 8 * 3),
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      sprite.x = content.width - texture.frame.width;
      sprite.y = content.height - texture.frame.height;

      content.renderObjectInContainer(sprite);
    }

    static drawLeftSide(content, texture) {
      //The left side is at y = 12,5%, x = 50%, width = 12,5% height = 25%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 2),
        y : Math.floor(texture.baseTexture.height / 8),
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 4)
      };

      var sprite = new PIXI.Sprite(texture);
      var x = 0;
      var y = texture.frame.height / 2;
      var width = texture.frame.width;
      var height = content.height - (y * 2);
      
      content.renderResized(sprite, x, y, width, height);
    }

    static drawRightSide(content, texture) {
      //The right side is at y = 12,5%, x = 87,5%, width = 12,5% height = 25%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 8 * 7),
        y : Math.floor(texture.baseTexture.height / 8),
        width : Math.floor(texture.baseTexture.width / 8),
        height : Math.floor(texture.baseTexture.height / 4)
      };

      var sprite = new PIXI.Sprite(texture);
      var x = content.width - texture.frame.width;
      var y = texture.frame.height / 2;
      var width = texture.frame.width;
      var height = content.height - (y * 2);
      
      content.renderResized(sprite, x, y, width, height);
    }

    static drawTopSide(content, texture) {
      //The top side is at y = 0, x = 62,5%, width = 25% height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 8 * 5),
        y : 0,
        width : Math.floor(texture.baseTexture.width / 4),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      var x = texture.frame.width / 2;
      var y = 0;
      var width = content.width - (x * 2);
      var height = texture.frame.height;
      
      content.renderResized(sprite, x, y, width, height);
    }

    static drawBottomSide(content, texture) {
      //The top side is at y = 37,5%, x = 62,5%, width = 25% height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 8 * 5),
        y : Math.floor(texture.baseTexture.height / 8 * 3),
        width : Math.floor(texture.baseTexture.width / 4),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      var x = texture.frame.width / 2;
      var width = content.width - (x * 2);
      var height = texture.frame.height;
      var y = content.height - height;
      
      content.renderResized(sprite, x, y, width, height);
    }

    static addBackground(windowObj, container, texture) {
      //The rpg maker skin file has the background on the first 50% of the file, both vertically and horizontally
      texture.frame = {
        x : 0,
        y : 0,
        width : Math.floor(texture.baseTexture.width / 2),
        height : Math.floor(texture.baseTexture.height / 2)
      };

      var sprite = new PIXI.Sprite(texture);
      sprite.scale.x = windowObj.width / texture.frame.width;
      sprite.scale.y = windowObj.height / texture.frame.height;
      container.addChild(sprite);
    }

    static drawFrame(content, texture) {
      this.drawLeftSide(content, texture);
      this.drawRightSide(content, texture);
      this.drawTopSide(content, texture);
      this.drawBottomSide(content, texture);
      this.drawTopLeftCorner(content, texture);
      this.drawTopRightCorner(content, texture);
      this.drawBottomLeftCorner(content, texture);
      this.drawBottomRightCorner(content, texture);
    }

    static drawSkinFrame(content, skinData) {
      var texture = TCHE.SkinManager.loadSkinFrameTexture(skinData);

      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          RpgMakerSkinType.drawFrame(content, texture);
        });
      } else {
        this.drawFrame(content, texture);
      }
    }

    static addSkinBackground(windowObj, container, skinData) {
      var texture = TCHE.SkinManager.loadSkinBackgroundTexture(skinData);

      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          RpgMakerSkinType.addBackground(windowObj, container, texture);
        });
      } else {
        this.addBackground(windowObj, container, texture);
      }      
    }

    static drawCursor(content, texture, x, y) {
      //The rpg maker cursor is at x = 81,25%, y = 18,75%, width = 6,25%, height = 12,5%
      texture.frame = {
        x : Math.floor(texture.baseTexture.width / 16 * 13),
        y : Math.floor(texture.baseTexture.height / 16 * 3),
        width : Math.floor(texture.baseTexture.width / 16),
        height : Math.floor(texture.baseTexture.height / 8)
      };

      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      content.renderObjectInContainer(sprite);
    }

    static drawSkinCursor(skinData, content, x, y) {
      var texture = TCHE.SkinManager.loadSkinFrameTexture(skinData);

      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          RpgMakerSkinType.drawCursor(content, texture, x, y);
        });
      } else {
        this.drawCursor(content, texture, x, y);
      }
    }

    static getSkinCursorSize(skinData) {
      var texture = TCHE.SkinManager.loadSkinFrameTexture(skinData);

      if (texture.baseTexture.isLoading) {
        return { width : 12, height : 24 };
      } else {
        var width = texture.baseTexture.width / 16;
        var height = texture.baseTexture.height / 8;

        return { width : width, height : height };
      }

    }
  }

  TCHE.skinTypes.rpgmaker = RpgMakerSkinType;

})();