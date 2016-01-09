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

        this._sprite = TCHE.SpriteManager.loadSprite(this._character.sprite);
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
    }
  }
  
  TCHE.registerClass('CharacterSprite', CharacterSprite);
})();