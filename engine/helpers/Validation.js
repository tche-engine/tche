(function(){
  class Validation {
    static checkBasicFiles() {
      try{
        if (!TCHE.data.game.skins || TCHE.data.game.skins.length === 0) {
          throw new Error("There's no skin configured.");
        }

        if (!TCHE.data.game.sprites || TCHE.data.game.sprites.length === 0) {
          throw new Error("There's no sprite configured.");
        }

        if (!TCHE.data.game.mainSkin || !TCHE.data.game.skins[TCHE.data.game.mainSkin]) {
          throw new Error("The main skin is invalid.");
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