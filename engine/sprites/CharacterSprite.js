(function($){
  "use strict";

  var parent = TCHE.Sprite.prototype;

  TCHE.accessor($, 'character');

  $.initialize = function(character) {
    parent.initialize.call(this);
    this._character = character;
    this.createPixiSprite();
  };

  $.createPixiSprite = function() {
    if (this._character.dirty) {
      this._texture = null;
      if (!!this._sprite) {
        this._sprite.texture = null;
      }
    }

    if (!this._texture && !!this._character.image) {
      this._texture = PIXI.Texture.fromImage(this._character.image);
    }

    if (!this._sprite && !!this._texture) {
      this._sprite = new PIXI.Sprite(this._texture);
      this.addChild(this._sprite);
    }

    if (!!this._sprite && !!this._texture && this._sprite._texture != this._texture) {
      this._sprite.texture = this._texture;
    }

    this._character.dirty = false;
  };

  $.update = function() {
    //Makes sure the sprite exists
    this.createPixiSprite();

    if (!this._sprite) return;

    //Syncs the position
    this.position.x = this._character.x;
    this.position.y = this._character.y;
  };
})(TCHE.declareClass('CharacterSprite', TCHE.Sprite));