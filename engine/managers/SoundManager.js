(()=>
    TCHE.SoundManager = Trigger(new class SoundManager {
        play(sound) {
            createjs.Sound.play(sound);
        }
        setSound(id, src){
            createjs.Sound.registerSound({src:src, id:id});
        }
        setSounds(obj, assetsPath = "./assets/"){
            createjs.Sound.createjs.Sound.registerSounds(sounds, assetsPath);
        }
    }())
)();
