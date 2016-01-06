function Trigger(el) {
  el._listeners = {};

  el.on = el.addListener = function(type, listener) {
    if (typeof this._listeners[type] == "undefined") {
      this._listeners[type] = [];
    }

    this._listeners[type].push(listener);
  };

  el.fire = function(event) {
    event = event || {};
    if (typeof event == "string") {
      event = {
        type: event
      };
    }
    if (!event.target) {
      event.target = this;
    }

    if (!event.type) { //false
      throw new Error("Event object missing 'type' property.");
    }

    if (this._listeners[event.type] instanceof Array) {
      var listeners = this._listeners[event.type];
      var params = Array.prototype.slice.call(arguments);
      params.shift();

      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].apply(this, params);
      }
    }
  };

  el.removeListener = function(type, listener) {
    if (this._listeners[type] instanceof Array) {
      var listeners = this._listeners[type];
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  };
  return el;
}
