(function(){
  class SoundManager {
    static play(soundName) {
      createjs.Sound.play(soundName);
    }
  }
  
  TCHE.registerStaticClass('SoundManager', SoundManager);
})();