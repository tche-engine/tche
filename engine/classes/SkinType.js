(function(){
  class SkinType {
    static loadSkinTexture(skinData) {
      return PIXI.Texture.fromImage(skinData.image);
    }

    static drawSkinFrame(content) {
    }

    static addSkinBackground(window, container, skinData) {
    }

    static drawCursor(skinData, contents, x, y) {
    }
  }

  TCHE.SkinType = SkinType;

})();