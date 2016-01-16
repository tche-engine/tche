(function(){
  class SkinManager {
    static getSkinData(skinName) {
      var data = TCHE.data.game.skins[skinName];
      if (!!data) {
        data.skinName = skinName;
      }
      return data;
    }

    static getSkinType(skinData) {
      if (TCHE.skinTypes[skinData.type] !== undefined) {
        return TCHE.skinTypes[skinData.type];
      } else {
        return TCHE.SkinType;
      }
    }

    static loadSkinTexture(skinData) {
      var type = this.getSkinType(skinData.skinName);
      return type.loadSkinTexture(skinData);
    }

    static getTextureFromCache(skinName, identifier) {
      if (this._textureCache === undefined) {
        return undefined;
      }

      return this._textureCache[skinName + '/' + identifier];
    }

    static saveTextureCache(skinName, identifier, texture) {
      if (this._textureCache === undefined) {
        this._textureCache = {};
      }

      this._textureCache[skinName + '/' + identifier] = texture;
    }

    static loadSkinBackgroundTexture(skinData) {
      var texture = this.getTextureFromCache(skinData.name, 'background');
      if (!texture) {
        texture = new PIXI.Texture(this.loadSkinTexture(skinData));
        this.saveTextureCache(skinData.name, 'background', texture);
      }

      return texture;
    }

    static loadSkinFrameTexture(skinData) {
      var texture = this.getTextureFromCache(skinData.name, 'frame');
      if (!texture) {
        texture = new PIXI.Texture(this.loadSkinTexture(skinData));
        this.saveTextureCache(skinData.name, 'frame', texture);
      }

      return texture;
    }

    static drawSkinFrame(skinName, content) {
      var data = this.getSkinData(skinName);
      this.getSkinType(data).drawSkinFrame(content, data);
    }

    static addSkinBackground(skinName, windowObj, container) {
      var data = this.getSkinData(skinName);
      this.getSkinType(data).addSkinBackground(windowObj, container, data);
    }

    static drawSkinCursor(skinName, content, x, y) {
      var data = this.getSkinData(skinName);
      this.getSkinType(data).drawSkinCursor(data, content, x, y);
    }

    static getSkinCursorSize(skinName) {
      var data = this.getSkinData(skinName);
      return this.getSkinType(data).getSkinCursorSize(data);
    }
  }
  
  TCHE.registerStaticClass('SkinManager', SkinManager);
})();