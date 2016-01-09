(function(){
  class SpriteType {
    static isFullImage() {
      return true;
    }

    static configureLoadedSprite(character, spriteObj, spriteData) {
    }

    static getSpriteFrame(spriteObj, spriteName) {
      return false;
    }

    static getSpriteCrop(character, spriteObj, spriteData) {
      return false;
    }

    static update(character, spriteObj, spriteData) {


    }
  }

  TCHE.SpriteType = SpriteType;

})();