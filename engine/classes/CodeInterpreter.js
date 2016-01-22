(function(){
  class CodeInterpreter {
    constructor() {
      this._codeBlock = null;
      this._index = 0;
    }

    get codeBlock() {
      return this._codeBlock;
    }

    get currentLine() {
      return this._codeBlock[this._index];
    }

    get nextLine() {
      return this._codeBlock[this._index + 1];
    }

    runCodeBlock(codeBlock) {
      this._codeBlock = codeBlock;
      this._index = 0;

      while (this._index < this._codeBlock.length) {
        this.executeLine();

        this._index++;
      }
    }

    executeLine() {
      var line = this.currentLine;

      switch(line.code) {
        case 'exit' :
          this._index = this._codeBlock.length;
          break;
        case 'teleport' : 
          TCHE.globals.player.teleport(line.params.mapName, line.params.x, line.params.y);
          break;
      }
    }
  }

  TCHE.CodeInterpreter = CodeInterpreter;

})();