(function(){
  class Ajax {
    static loadFileAsync(name, filePath, onLoad, onError, mimeType) {
      mimeType = mimeType || "application/json";
      var xhr = new XMLHttpRequest();
      xhr.open('GET', filePath);
      if (mimeType && xhr.overrideMimeType) {
        xhr.overrideMimeType(mimeType);
      }
      if(onLoad === undefined){
        onLoad = function(xhr, filePath, name) {
          if (xhr.status < 400) {
            TCHE.data[name] = JSON.parse(xhr.responseText);
          }
        };
      }
      xhr.onload = function() {
        onLoad.call(this, xhr, filePath, name);
      };
      xhr.onerror = onError;
      if(onLoad !== undefined){
        TCHE.data[name] = null;
      }
      xhr.send();
    }
  }

  TCHE.Ajax = Ajax;
})();