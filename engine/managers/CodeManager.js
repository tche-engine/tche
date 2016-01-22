(function(){
  class CodeManager {
    static executeEvent(event) {
      this.runCodeBlock(event.codeLines);
    }

    static runCodeBlock(codeBlock) {
      var interpreter = new TCHE.CodeInterpreter();
      return interpreter.runCodeBlock(codeBlock);
    }
  }
  
  TCHE.registerStaticClass('CodeManager', CodeManager);
})();