(function(){
  class CreatureObjectType extends TCHE.objectTypes.Object {
    constructor() {
      super();
      // this._events['On Block Player'] = [];
    }

    get name() {
      return 'Creature';
    }
  }

  TCHE.objectTypes.Creature = CreatureObjectType;
})();