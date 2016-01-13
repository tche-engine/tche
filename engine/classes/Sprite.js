(function(){
  class Sprite extends PIXI.Container {
    constructor() {
      super();
      this._sprite = null;
      this._frame = new PIXI.Rectangle(0, 0, 1, 1);
      this._useFrame = false;
    }

    //The sprite property of the Sprite class is a PIXI sprite.
    get sprite() { return this._sprite; } 
    set sprite(value) { this._sprite = value; }
    get useFrame() { return this._useFrame; }
    set useFrame(value) { this._useFrame = value; }

    get frame() { return this._frame; }
    set frame(value) { this._frame = value; }

    update() {
      
    }
  }
  
  TCHE.registerClass('Sprite', Sprite);
})();