(function(){
  class ChoiceWindow extends TCHE.WindowSprite {
    constructor(width, height) {
      super(width, height);
      this.interactive = true;
      this._index = 0;

      this.redraw();
    }

    get startFromTheBottom() {
      return false;
    }

    get makeSpaceForCursor() {
      return false;
    }

    get cursorPadding() {
      return 4;
    }

    get inputDelayCount() {
      return 10;
    }

    get cursorMargin() {
      var dimension = TCHE.SkinManager.getSkinCursorSize(this.skinName);
      return dimension.width + (this.cursorPadding * 2);
    }

    get index() {
      return this._index;
    }

    get choiceAlign() {
      return "left";
    }

    set index(value) {
      if (value < this._choices.length) {
        this._index = value;
      }

      if (this._index < 0 || this._index >= this._choices.length) {
        this._index = 0;
      }

      this.redraw();
    }

    get itemWidth() {
      return this.width - (this.margin * 2);
    }

    get highlightColor() {
      return 'grey';
    }

    draw() {
      this.drawChoices();
    }

    drawChoice(index) {
      var choice = this._choices[index];
      var position = this.getChoicePosition(index);
      var y = position.y;
      var x = position.x;
      var width = this.itemWidth;
      var style = {};

      var align = this.choiceAlign;

      if (index == this.index) {
        style.dropShadow = true;
        style.dropShadowColor = this.highlightColor;
        style.dropShadowDistance = 1;

        var dimension = TCHE.SkinManager.getSkinCursorSize(this.skinName);
        var cursorY = y + (this.lineHeight - dimension.height) / 2;
        this.drawCursor(x + this.cursorPadding, cursorY);

        if (align == 'left') {
          x += this.cursorMargin;
          width -= this.cursorMargin;
        }
      } else if (align == 'left' && this.makeSpaceForCursor) {
        x += this.cursorMargin;
        width -= this.cursorMargin;
      }

      switch(align) {
        case 'left' :
          this._contents.drawText(choice.displayName, x, y, style);
          break;
        case 'center' : 
          this._contents.drawTextCentered(choice.displayName, x, y, width, style);
          break;
        case 'right' :
          this._contents.drawRightAlignedText(choice.displayName, x, y, width, style);
          break;
      }
    }

    getChoiceAtGlobal(x, y) {
      var globalX = x;
      var globalY = y;
      var myGlobalX = this.worldTransform.tx;
      var myGlobalY = this.worldTransform.ty;

      var localX = globalX - myGlobalX;
      var localY = globalY - myGlobalY;

      return this.getChoiceAt(localX, localY);
    }

    getChoiceAt(x, y) {
      for (var i = 0; i < this._choices.length; i++) {
        var pos = this.getChoicePosition(i);

        if (x >= pos.x && y >= pos.y && y <= pos.y + this.lineHeight && x <= pos.x + this.itemWidth) {
          return i;
        }
      }

      return -1;
    }

    triggerChoiceAtGlobal(x, y) {
      var choice = this.getChoiceAtGlobal(x, y);
      return this.triggerChoice(choice);
    }

    selectChoiceAtGlobal(x, y) {
      var choice = this.getChoiceAtGlobal(x, y);
      this.selectChoice(choice);
    }

    triggerChoice(index) {
      if (index >= 0) {
        this.onChoice(index);
      }
    }

    selectChoice(index) {
      if (index >= 0) {
        this.index = index;
      }
    }

    selectChoiceAt(x, y) {
      var choice = this.getChoiceAt(x, y);
      this.selectChoice(choice);
    }

    triggerChoiceAt(x, y) {
      var choice = this.getChoiceAt(x, y);
      return this.triggerChoice(choice);
    }

    click(e) {
      this.triggerChoiceAtGlobal(e.data.global.x, e.data.global.y);
    }

    mousemove(e) {
      this.selectChoiceAtGlobal(e.data.global.x, e.data.global.y);
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
      var y = index * this.lineHeight + this.margin;
      var x = this.margin;

      if (this.startFromTheBottom) {
        var reverseIndex = this._choices.length - index;
        y = this.height - this.margin - (reverseIndex * this.lineHeight);
      }

      return { x : x, y : y };
    }

    moveUp() {
      if (this._index < 0) {
        this._index = this._choices.length;
      }

      this._index--;

      if (this._index < 0) {
        this._index = this._choices.length - 1;
      }

      this.redraw();
    }

    moveDown() {
      if (this._index < 0) {
        this._index = -1;
      }

      this._index++;

      if (this._index >= this._choices.length) {
        this._index = 0;
      }

      this.redraw();
    }

    triggerCurrentChoice() {
      if (this._index >= 0) {
        this.triggerChoice(this._index);
      }
    }

    checkInput() {
      if (!!this._inputDelay) {
        this._inputDelay--;
        return;
      }

      var direction = TCHE.InputManager.getDirection();
      if (direction.indexOf('up') >= 0) {
        this._inputDelay = this.inputDelayCount;
        this.moveUp();
      } else if (direction.indexOf('down') >= 0) {
        this._inputDelay = this.inputDelayCount;
        this.moveDown();
      } else if (TCHE.InputManager.isKeyNamePressed('ok')) {
        this._inputDelay = this.inputDelayCount;
        this.triggerCurrentChoice();
      }
    }

    update() {
      this.checkInput();
    }
  }

  TCHE.registerClass('ChoiceWindow', ChoiceWindow);
})();