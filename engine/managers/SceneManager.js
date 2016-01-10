(function(){
  let scene;
  let newScene;
  let newSceneParams;

  class SceneManager {
    static get scene() { return scene; }
    static set scene(value) { scene = value; }

    static get newScene() { return newScene; }

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
          scene = new (newScene)(newSceneParams);
        }
      }

      newScene = undefined;
    }

    static update() {
      TCHE.startFrame();

      this._doSceneChange();

      TCHE.FileManager.update();
      TCHE.InputManager.update();

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

    static changeScene(newSceneClass, params) {
      newScene = newSceneClass;
      newSceneParams = params;
    }

    static start(initialScene) {
      this.changeScene(initialScene);
      this.requestAnimationFrame();
    }

    static end() {
      this.changeScene(null);
    }

    static processClick(pos) {
      this.scene.processClick(pos);
    }
  }
  
  TCHE.registerStaticClass('SceneManager', SceneManager);
})();