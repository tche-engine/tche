(function(){
  class PlayerObjectType extends TCHE.objectTypes.Creature {
    constructor() {
      super();

      //Removes this event, as it is invalid
      delete this._events['On Block Player'];
    }

    get name() {
      return 'Player';
    }
  }

  TCHE.objectTypes.Player = PlayerObjectType;
})();