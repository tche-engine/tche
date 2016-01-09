(function(){
  class SpriteManager {
    static getSpriteData(spriteName) {
      return TCHE.data.game.sprites[spriteName];
    }

    static configureLoadedSprite(spriteObj, spriteData) {
      switch(spriteData.type) {
        case 'image' :
          break;
        case 'rpgmaker' :
          var spriteWidth = spriteObj.texture.baseTexture.width / 4;
          var spriteHeight = spriteObj.texture.baseTexture.height / 2;
          var index = spriteData.index;
          var spriteY = 0;
          var spriteX = index * spriteWidth;
          if (spriteX > spriteObj.texture.baseTexture.width) {
            spriteX -= spriteObj.texture.baseTexture.width;
            spriteY = spriteObj.texture.baseTexture.height;
          }

          var width = spriteWidth / 3;
          var height = spriteHeight / 4;
          var x = width;
          var y = 0;

          spriteObj.texture.frame = {
            x : x,
            y : y,
            width : width,
            height : height
          };

          break;
        case 'frame' : 
          spriteObj.texture.frame = {
            x : spriteData.imageX,
            y : spriteData.imageY,
            width : spriteData.width,
            height : spriteData.height
          };
          break;
      }
    }

    static loadSprite(spriteName) {
      var data = this.getSpriteData(spriteName);
      var texture = PIXI.Texture.fromImage(data.image);
      var spriteObj = new PIXI.Sprite(texture);

      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          TCHE.SpriteManager.configureLoadedSprite(spriteObj, data);
        });
      } else {
        TCHE.SpriteManager.configureLoadedSprite(spriteObj, data);
      }


      return spriteObj;
    }
  }
  
  TCHE.registerStaticClass('SpriteManager', SpriteManager);
})();