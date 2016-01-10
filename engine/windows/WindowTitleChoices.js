(function(){
  class WindowTitleChoices extends TCHE.ChoiceWindow {
    constructor(width, height) {
      super(width, height);
    }

    get startFromTheBottom() {
      return true;
    }

    makeChoiceList() {
      this._choices = [];
      this.addChoice('startGame', 'Start Game');
      this.addChoice('quitGame', 'Quit Game');
    }

    update() {
      // this.refresh();
    }
  }

  TCHE.registerClass('WindowTitleChoices', WindowTitleChoices);
})();