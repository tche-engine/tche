(function(){
  class WindowTitleChoices extends TCHE.ChoiceWindow {
    constructor() {
      super(300, 62);
    }

    get startFromTheBottom() {
      return true;
    }

    get margin() {
      return 5;
    }

    makeChoiceList() {
      this._choices = [];
      this.addChoice('startGame', 'Start Game');
      this.addChoice('quitGame', 'Quit Game');
    }

    update() {
      // this.refresh();
    }

    draw() {
      this._contents.drawRect('0xFF0000', 0, 0, this.width, this.height);
      this.drawChoices();
    }    
  }

  TCHE.registerClass('WindowTitleChoices', WindowTitleChoices);
})();