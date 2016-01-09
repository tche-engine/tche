(function(){
  class SpriteManager {
    static getSpriteData(spriteName) {
      return TCHE.data.game.sprites[spriteName];
    }

    static getSpriteType(spriteData) {
      if (TCHE.spriteTypes[spriteData.type] !== undefined) {
        return TCHE.spriteTypes[spriteData.type];
      } else {
        return TCHE.SpriteType;
      }
    }

    static configureLoadedSprite(character, spriteObj, spriteData) {
      this.getSpriteType(spriteData).configureLoadedSprite(character, spriteObj, spriteData);
    }

    static getSpriteFrame(character, spriteObj, spriteName) {
      var spriteData = this.getSpriteData(spriteName);

      return this.getSpriteType(spriteData).getSpriteFrame(character, spriteObj, spriteData);
    }

    static getTextureFromCache(spriteName) {
      if (this._textureCache === undefined) {
        return undefined;
      }

      return this._textureCache[spriteName];
    }

    static saveTextureCache(spriteName, texture) {
      if (this._textureCache === undefined) {
        this._textureCache = {};
      }

      this._textureCache[spriteName] = texture;
    }

    static spriteIsFullImage(spriteData) {
      return this.getSpriteType(spriteData).isFullImage(spriteData);
    }

    static loadSpriteTexture(spriteName, spriteData) {
      var cached = this.getTextureFromCache(spriteName);

      if (!!cached) {
        return cached;
      }

      var image = PIXI.Texture.fromImage(spriteData.image);

      if (this.spriteIsFullImage(spriteData)) {
        return image;
      }

      return image.clone();
    }

    static loadSprite(character) {
      var data = this.getSpriteData(character.sprite);
      var texture = this.loadSpriteTexture(character.sprite, data);
      var spriteObj = new PIXI.Sprite(texture);

      if (texture.baseTexture.isLoading) {
        texture.baseTexture.addListener('loaded', function(){
          TCHE.SpriteManager.configureLoadedSprite(character, spriteObj, data);
        });
      } else {
        TCHE.SpriteManager.configureLoadedSprite(character, spriteObj, data);
      }

      return spriteObj;
    }

    static updateCharacterSprite(spriteObj, character) {
      var data = this.getSpriteData(character.sprite);
      this.getSpriteType(data).update(character, spriteObj, data);
    }

    static updateAnimationStep(character) {
      var data = this.getSpriteData(character.sprite);
      this.getSpriteType(data).updateAnimationStep(character);
    }
  }
  
  TCHE.registerStaticClass('SpriteManager', SpriteManager);
})();