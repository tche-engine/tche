(function(){
  class ObjectTypeManager {
    static loadObjectType(objectName) {
      if (!!TCHE.objectTypes[objectName]) return TCHE.objectTypes[objectName];

      var objects = TCHE.data.game.objects || {};
      var object = objects[objectName];
      var events = object.events || {};

      var parentName = object.inherits;
      if (!parentName || !parentName.trim()) {
        parentName = 'Object';
      } else {
        parentName = parentName.trim();
      }

      var parentObject = TCHE.objectTypes[parentName];
      if (!parentObject) {
        parentObject = TCHE.ObjectTypeManager.loadObjectType(parentName);
      }

      var objectType = function(){
        parentObject.call(this);
        for (var eventName in events) {
          this._events[eventName] = TCHE.Clone.shallow(events[eventName]);
        }
      };
      objectType.prototype = Object.create(parentObject.prototype);
      objectType.prototype.constructor = objectType;

      TCHE.objectTypes[objectName] = objectType;
      return TCHE.objectTypes[objectName];
    }

    static loadCustomObjectTypes() {
      for (var objectName in objects) {
        TCHE.ObjectTypeManager.loadObjectType(objectName);
      }
    }
  }
  
  TCHE.registerStaticClass('ObjectTypeManager', ObjectTypeManager);
})();