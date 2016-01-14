(function(){
  class WindowTitleChoices extends TCHE.ChoiceWindow {
    constructor() {
      super(224, 68);
    }

    get startFromTheBottom() {
      return true;
    }

    makeChoiceList() {
      this._choices = [];
      this.addChoice('startGame', 'Start Game');
      this.addChoice('quitGame', 'Quit Game');
    }

    onChoice(index) {
      switch(index) {
        case 0 :
          TCHE.globals.map.changeMap(TCHE.data.game.initialMap);
          break;
        case 1 :
          console.log("There's no quitting. You're here FOREVER.");
          // TCHE.SceneManager.end();
          break;
      }
     
    }

    get choiceAlign() {
      return "center";
    }

    draw() {
      this.drawChoices();
    }    
  }

  TCHE.registerClass('WindowTitleChoices', WindowTitleChoices);
})();