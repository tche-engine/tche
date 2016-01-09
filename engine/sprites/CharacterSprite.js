(function(){
  class CharacterSprite extends TCHE.Sprite {
    constructor(character) {
      super();
      this._character = character;
      this.createPixiSprite();
    }

    get character() { return this._character; } 
    set character(value) { this._character = value; }

    createPixiSprite() {
      if (this._character.dirty || !this._sprite) {
        if (!this._character.sprite) {
          throw new Error("Character has no sprite defined.");
        }

        this.removeChildren();

        this._sprite = TCHE.SpriteManager.loadSprite(this._character);
        var frame = TCHE.SpriteManager.getSpriteFrame(this._character, this._sprite, this._character.sprite);
        if (frame === false) {
          this._useFrame = false;
        } else {
          this._useFrame = true;
          this._frame = frame;
        }
        this.addChild(this._sprite);

        this._character.dirty = false;      
      }
    }

    update() {
      //Makes sure the sprite exists
      this.createPixiSprite();

      if (!this._sprite) return;

      //Syncs the position
      this.position.x = this._character.x;
      this.position.y = this._character.y;

      TCHE.SpriteManager.updateCharacterSprite(this._sprite, this._character);
    }
  }
  
  TCHE.registerClass('CharacterSprite', CharacterSprite);
})();