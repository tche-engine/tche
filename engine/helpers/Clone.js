(function(){
  class Clone {
    static deep(obj) {
      var result;
      if (obj instanceof Array) {
        return obj.map(function (i) { return TCHE.clone.deep(i); });
      } else if (obj && !obj.prototype && (typeof obj == 'object' || obj instanceof Object)) {
        result = {};
        for (var p in obj) {
          result[p] = TCHE.clone.deep(obj[p]);
        }
        return result;
      }
      return obj;
    }

    static shallow(obj) {
      var result;
      if (obj instanceof Array) {
        return obj.slice(0);
      } else if (obj && !obj.prototype && (typeof obj == 'object' || obj instanceof Object)) {
        result = {};
        for (var p in obj) {
          result[p] = obj[p];
        }
        return result;
      }
      return obj;
    }
  }

  TCHE.Clone = Clone;
})();