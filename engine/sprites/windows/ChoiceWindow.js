(function(){
  class ChoiceWindow extends TCHE.WindowSprite {
    constructor(width, height) {
      super(width, height);
      this._choices = [];
      this.refresh();
    }

    get startFromTheBottom() {
      return false;
    }

    draw() {
      this.drawChoices();
    }

    drawChoice(index) {
      let choice = this._choices[index];
      let position = this.getChoicePosition(index);

      this._contents.drawTextCentered(choice.displayName, position.x, position.y, this.width);
    }

    drawChoices() {
      for (var i = 0; i < this._choices.length; i++) {
        this.drawChoice(i);
      }
    }

    onChoice(index) {
      console.log('onChoice', index);
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
      let y = index * this.lineHeight + this.margin;
      let x = 0;

      if (this.startFromTheBottom) {
        let reverseIndex = this._choices.length - index;
        y = this.height - this.margin - (reverseIndex * this.lineHeight);
      }

      return { x : x, y : y};
    }

    update() {
      // this.refresh();
    }
  }

  TCHE.registerClass('ChoiceWindow', ChoiceWindow);
})();