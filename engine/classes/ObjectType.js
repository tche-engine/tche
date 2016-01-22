(function(){
  class ObjectType {
    constructor() {
      super();
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