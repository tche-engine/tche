(function(){
  class RpgMakerSpriteType extends TCHE.SpriteType {
    static isFullImage() {
      return false;
    }

    static configureLoadedSprite(character, spriteObj, spriteData) {
      spriteObj.texture.frame = RpgMakerSpriteType.getSpriteFrame(spriteObj, spriteData);
      spriteObj.texture.crop = RpgMakerSpriteType.getSpriteCrop(character, spriteObj, spriteData);
    }

    static getSpriteFrame(spriteObj, spriteData) {
      var spriteWidth = spriteData.imageWidth / 4;
      var spriteHeight = spriteData.imageHeight / 2;
      var index = spriteData.index;
      var spriteY = 0;
      var spriteX = index * spriteWidth;
      if (spriteX > spriteData.imageWidth) {
        spriteX -= spriteData.imageWidth;
        spriteY = spriteData.imageHeight;
      }

      return {
        x : spriteX,
        y : spriteY,
        width : spriteWidth,
        height : spriteHeight
      };
    }

    static getSpriteCrop(character, spriteObj, spriteData) {
      var frame = RpgMakerSpriteType.getSpriteFrame(spriteObj, spriteData);

      var directionIndex = ["down", "left", "right", "up"].indexOf(character.direction);

      var width = frame.width / 3;
      var height = frame.height / 4;
      var x = frame.x + width;
      var y = frame.y + (directionIndex * height);

      return {
        x : x,
        y : y,
        width : width,
        height : height
      };
    }

    static update(character, spriteObj, spriteData) {
      spriteObj.texture.crop = RpgMakerSpriteType.getSpriteCrop(character, spriteObj, spriteData);
    }    
  }

  TCHE.spriteTypes.rpgmaker = RpgMakerSpriteType;

})();