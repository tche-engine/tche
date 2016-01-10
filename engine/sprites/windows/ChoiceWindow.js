(function(){
  class ChoiceWindow extends TCHE.WindowSprite {
    constructor(width, height) {
      super(width, height);
      this._choices = [];
      this.refresh();
    }

    draw() {
      this.drawChoices();
    }

    drawChoice(index) {
      let choice = this._choices[index];
      let position = this.getChoicePosition(index);

      this._contents.drawText(choice.displayName, position.x, position.y);
    }

    drawChoices() {
      for (var i = 0; i < this._choices.length; i++) {
        this.drawChoice(i);
      }
    }

    refresh() {
      this.makeChoiceList();
      super.refresh();
    }

    makeChoiceList() {
      this._choices = [];
    }

    addChoice(code, displayName) {
      this._choices.push({code : code, displayName : displayName});
    }

    getChoicePosition(index) {
      let y = index * this.lineHeight;
      let x = 0;

      return { x : x, y : y};
    }

    update() {
      // this.refresh();
    }
  }

  TCHE.registerClass('ChoiceWindow', ChoiceWindow);
})();