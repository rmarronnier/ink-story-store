<template>
  <!-- <canvas ref="renderCanvas"></canvas> -->
  <!-- All child <template> elements get added in here -->
  <div id="pixi"></div>
</template>

<script>
import * as PIXI from "pixi.js";
//import { MotionBlurFilter } from "@pixi/filter-motion-blur";

export default {
  name: "PixiCanvas",
  updated() {},

  mounted() {
    this.$store.commit("storyUIready", false);
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }

    PIXI.utils.sayHello(type);

    //   // Determine the width and height of the renderer wrapper element.
    //   const renderCanvas = this.$refs.renderCanvas;
    //   const w = renderCanvas.offsetWidth;
    //   const h = renderCanvas.offsetHeight;

    //   // Create a new PIXI app.
    //   //this.PIXIWrapper.PIXIApp = new PIXI.Application(w, h, {
    //   let PIXIApp = new PIXI.Application(w, h, {
    //     view: renderCanvas,
    //     backgroundColor: 0x1099bb
    //   });
    //   PIXIApp.backgroundColor = "0x1099bb";
    //   //this.EventBus.$emit("ready");

    const storyId = this.$store.getters.storyId;
    const picture = require(`@/assets/stories/${storyId}/images/backgrounds/${this.$store.getters.backgroundImage}`);

    if (this.$store.getters.pixiLoader == null) {
      this.$store.commit("savePixiLoader", PIXI.Loader.shared);
    }

    const loader = this.$store.getters.pixiLoader;

    if (!this.$store.getters.areAssetsLoaded) {
      const backgrounds = this.$store.getters.backgrounds[storyId]
        .map(filename =>
          require(`@/assets/stories/${storyId}/images/backgrounds/${filename}`)
        )
        .filter(filename => loader.resources[filename] == undefined);
      loader.add(backgrounds);
      this.$store.commit("savePixiLoader", loader);
      this.$store.commit("registerAssetsLoadState", storyId);
    }

    loader.load(
      (loader, resources) => {
        let app = new PIXI.Application({
          antialias: false,
          width: 256,
          height: 256
        });
        // let ticker = PIXI.Ticker.shared;
        // ticker.autoStart = false;
        // ticker.stop();
        document.getElementById("pixi").appendChild(app.view);
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = false;
        app.renderer.resize(window.innerWidth, window.innerHeight);

        const background = new PIXI.Sprite(resources[picture].texture);
        background.width = app.renderer.width;
        background.height = app.renderer.height;
        app.stage.addChild(background);
        this.$store.commit("storyUIready", true);

        this.$store.watch(
          () => this.$store.getters.backgroundImage,
          (newBackground, oldBackground) => {
            console.log("watched: ", newBackground);
            console.log("old: ", oldBackground);
            //var renderer = PIXI.autoDetectRenderer();
            newBackground = require(`@/assets/stories/${storyId}/images/backgrounds/${newBackground}`);
            oldBackground = require(`@/assets/stories/${storyId}/images/backgrounds/${oldBackground}`);
            console.log(newBackground + oldBackground);
            const nextBackground = new PIXI.Sprite(
              resources[newBackground].texture
            );
            const previousBackground = new PIXI.Sprite(
              resources[oldBackground].texture
            );
            nextBackground.width = app.renderer.width;
            nextBackground.height = app.renderer.height;
            //nextBackground.alpha = 0;
            app.stage.addChild(nextBackground);
            //animate();
            app.stage.removeChild(previousBackground);
            // function animate() {
            //   previousBackground.alpha -= 0.01;
            //   nextBackground.alpha += 0.05;
            //   renderer.render(app.stage);
            //   requestAnimationFrame(animate);
            // }
            //renderer.render(app.stage);
            // PIXI.utils.destroyTextureCache();
          }
        );

        //app.stage.filters = [new MotionBlurFilter([1, 45])];

        // this.$store.watch(
        //   () => this.$store.getters.backgroundImage,
        //   (newBackground, oldBackground) => {
        //     console.log("watched: ", newBackground);
        //     console.log("old: ", oldBackground);
        //     var renderer = PIXI.autoDetectRenderer();
        //     newBackground = require(`@/assets/stories/${storyId}/images/backgrounds/${newBackground}`);
        //     oldBackground = require(`@/assets/stories/${storyId}/images/backgrounds/${oldBackground}`);
        //     console.log(newBackground + oldBackground);

        //   loader.load((loader, resources) => {
        //     const nextBackground = new PIXI.Sprite(
        //       resources[newBackground].texture
        //     );
        //     const previousBackground = new PIXI.Sprite(
        //       resources[oldBackground].texture
        //     );
        //     nextBackground.width = app.renderer.width;
        //     nextBackground.height = app.renderer.height;
        //     //nextBackground.alpha = 0;
        //     app.stage.addChild(nextBackground);
        //     //animate();
        //     app.stage.removeChild(previousBackground);
        //     // function animate() {
        //     //   previousBackground.alpha -= 0.01;
        //     //   nextBackground.alpha += 0.05;
        //     //   renderer.render(app.stage);
        //     //   requestAnimationFrame(animate);
        //     // }
        //     renderer.render(app.stage);
        //   });
      }
      //{ deep: true }
    );
    // PIXI.loader.reset();
    // app.destroy(true);
    // PIXI.utils.destroyTextureCache();
    // app = null;
  }
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
#pixi {
  width: 100%;
  height: 100%;
}
</style>
