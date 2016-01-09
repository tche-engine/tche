(function(){
  class SpriteType {
    static isFullImage() {
      return true;
    }

    static configureLoadedSprite(character, spriteObj, spriteData) {
    }

    static getSpriteFrame(character, spriteObj, spriteName) {
      return false;
    }

    static update(character, spriteObj, spriteData) {
    }

    static updateAnimationStep(character) {
    }    
  }

  TCHE.SpriteType = SpriteType;

})();