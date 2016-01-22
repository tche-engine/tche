(function(){
  class ObjectType {
    constructor() {
      this._events = {};
    }

    get name() {
      return '';
    }

    get events() {
      return this._events;
    }
  }

  TCHE.ObjectType = ObjectType;

})();