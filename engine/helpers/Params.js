(function(){
  class Params {
    static loadParams() {
      var params = window.location.search.slice(1).split('&');
      TCHE.Params.params = {};

      params.forEach(function(param){
        var data = param.split('=');
        var name = data[0].toLowerCase();
        if (data.length > 1) {
          TCHE.Params.params[name] = data[1];
        } else {
          TCHE.Params.params[name] = true;
        }
      });     
    }

    static get forceCanvas() {
      return this.param('canvas');
    }

    static get forceWebGl() {
      return this.param('webgl');
    }

    static param(paramName) {
      return this.params[paramName.toLowerCase()] || false;
    }
  }

  TCHE.Params = Params;
  TCHE.Params.loadParams();
})();