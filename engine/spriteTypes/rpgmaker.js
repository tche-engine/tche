(function(){
  class RpgMakerSpriteType extends TCHE.SpriteType {
    static isFullImage() {
      return false;
    }

    static configureLoadedSprite(character, spriteObj, spriteData) {
      spriteObj.texture.frame = RpgMakerSpriteType.getSpriteFrame(character, spriteObj, spriteData);
      character.animationStep = 1;
      character.animationStepCount = 3;
      character.animationDelayCount = 10;
    }

    static getSpriteFrame(character, spriteObj, spriteData) {
      var spriteWidth = spriteData.imageWidth / 4;
      var spriteHeight = spriteData.imageHeight / 2;
      var index = spriteData.index;
      var spriteY = 0;
      var spriteX = index * spriteWidth;
      if (spriteX > spriteData.imageWidth) {
        spriteX -= spriteData.imageWidth;
        spriteY = spriteData.imageHeight;
      }

      var frame = {
        x : spriteX,
        y : spriteY,
        width : spriteWidth,
        height : spriteHeight
      };

      var directionIndex = Math.max(0, ["down", "left", "right", "up"].indexOf(character.direction));
      var step = character.animationStep % character.animationStepCount;

      var width = frame.width / 3;
      var height = frame.height / 4;
      var x = frame.x + (step * width);
      var y = frame.y + (directionIndex * height);

      return {
        x : x,
        y : y,
        width : width,
        height : height
      };
    }

    static update(character, spriteObj, spriteData) {
      if (!spriteObj.texture.baseTexture.isLoading) {
        spriteObj.texture.frame = RpgMakerSpriteType.getSpriteFrame(character, spriteObj, spriteData);
      }
    }

    static updateAnimationStep(character) {
      if (character.isMoving()) {
        character.animationDelayCount++;

        if (character.animationDelayCount >= character.animationDelay) {
          character.animationDelayCount = 0;
          character.animationStep++;
        }

        if (character.animationStep >= character.animationStepCount) {
          character.animationStep = 0;
        }
      }
      else {
        character.animationStep = 1;
      }
    }
  }

  TCHE.spriteTypes.rpgmaker = RpgMakerSpriteType;

})();