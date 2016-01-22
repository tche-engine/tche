(function(){
  class NpcObjectType extends TCHE.objectTypes.Creature {
    constructor() {
      super();
      // this._events['On Block Player'] = [];
    }

    get name() {
      return 'NPC';
    }
  }

  TCHE.objectTypes.NPC = NpcObjectType;
})();