(function(){
  class ChoiceWindow extends TCHE.WindowSprite {
    constructor(width, height) {
      super(width, height);
      this.interactive = true;
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

    getChoiceAtGlobal(x, y) {
      let globalX = x;
      let globalY = y;
      let myGlobalX = this.worldTransform.tx;
      let myGlobalY = this.worldTransform.ty;

      let localX = globalX - myGlobalX;
      let localY = globalY - myGlobalY;

      return this.getChoiceAt(localX, localY);
    }

    getChoiceAt(x, y) {
      for (let i = 0; i < this._choices.length; i++) {
        let pos = this.getChoicePosition(i);

        if (x >= pos.x && y >= pos.y && y <= pos.y + this.lineHeight) {
          return i;
        }
      }

      return -1;
    }

    triggerChoiceAtGlobal(x, y) {
      let choice = this.getChoiceAtGlobal(x, y);
      return this.triggerChoice(choice);
    }

    triggerChoice(index) {
      if (index >= 0) {
        this.onChoice(index);
      }
    }

    triggerChoiceAt(x, y) {
      let choice = this.getChoiceAt(x, y);
      return this.triggerChoice(choice);
    }

    click(e) {
      this.triggerChoiceAtGlobal(e.data.global.x, e.data.global.y);
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