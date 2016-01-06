(function(){
  let scene;
  let newScene;

  class SceneManager {
    get scene() { return scene; }
    set scene(value) { scene = value; }

    get newScene() { return newScene; }

    static requestAnimationFrame(){
      window.requestAnimationFrame(this.update.bind(this));
    }

    static _doSceneChange() {
      if (newScene !== undefined) {
        if (!!scene) {
          scene.terminate();
          scene = undefined;
        }

        if (!!newScene) {
          scene = new (newScene)();
        }
      }

      newScene = undefined;
    }

    static update() {
      TCHE.startFrame();

      this._doSceneChange();

      TCHE.FileManager.update();
      TCHE.InputManager.update();

      TCHE.globals.map.update();
      TCHE.globals.player.update();

      if (!!scene) {
        scene.update();

        TCHE.renderer.render(scene);
      }

      TCHE.endFrame();

      //If there's no active scene, then end the game
      if (!!scene) {
        this.requestAnimationFrame();
      }
    }

    static changeScene(newSceneClass) {
      newScene = newSceneClass;
    }

    static start(initialScene) {
      this.changeScene(initialScene);
      this.requestAnimationFrame();
    }

    static end() {
      this.changeScene(null);
    }
  }
  
  TCHE.SceneManager = SceneManager;
})();