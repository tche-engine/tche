(function(){
  class Validation {
    static hasAnySkin() {
      if (!TCHE.data.game.skins) {
        return false;
      }

      for (var key in TCHE.data.game.skins) {
        return true;
      }

      return false;
    }

    static hasAnySprite() {
      if (!TCHE.data.game.sprites) {
        return false;
      }

      for (var key in TCHE.data.game.sprites) {
        return true;
      }

      return false;
    }

    static hasPlayerSprite() {
      if (!TCHE.data.game.player.sprite) {
        return false;
      }

      if (!TCHE.data.game.sprites[TCHE.data.game.player.sprite]) {
        return false;
      }

      return true;
    }

    static checkBasicFiles() {
      try{
        // if (!this.hasAnySkin()) {
        //   throw new Error("There's no skin configured.");
        // }

        if (!this.hasAnySprite()) {
          throw new Error("There's no sprite configured.");
        }

        if (!this.hasPlayerSprite()) {
          throw new Error("The player's sprite doesn't exist.");
        }
      }
      catch(e) {
        alert(e);
        TCHE.SceneManager.end();
      }
    }
  }

  TCHE.Validation = Validation;
})();