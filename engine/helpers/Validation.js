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
      }
      catch(e) {
        alert(e);
        TCHE.SceneManager.end();
      }
    }
  }

  TCHE.Validation = Validation;
})();