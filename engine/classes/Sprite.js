(function(){
  class Sprite extends PIXI.Container {
    constructor() {
      super();
      this._sprite = null;
    }

    //The sprite property of the Sprite class is a PIXI sprite.
    get sprite() { return this._sprite; } 
    set sprite(value) { this._sprite = value; }

    update() {
      
    }    
  }
  
  TCHE.registerClass('Sprite', Sprite);
})();