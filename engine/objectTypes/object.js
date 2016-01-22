(function(){
  class ObjectObjectType extends TCHE.ObjectType {
    constructor() {
      super();
      this._events['On Block Player'] = {
        codeLines : []
      };
    }

    get name() {
      return 'Object';
    }
  }

  TCHE.objectTypes.Object = ObjectObjectType;
})();