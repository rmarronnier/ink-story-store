<template>
  <!-- <canvas ref="renderCanvas"></canvas> -->
  <!-- All child <template> elements get added in here -->
  <div id="pixi"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import { MotionBlurFilter } from "@pixi/filter-motion-blur";

export default {
  name: "PixiCanvas",

  mounted() {
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

    let app = new PIXI.Application({ width: 256, height: 256 });
    document.getElementById("pixi").appendChild(app.view);
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
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

    loader.load((loader, resources) => {
      const background = new PIXI.Sprite(resources[picture].texture);
      background.width = app.renderer.width;
      background.height = app.renderer.height;
      app.stage.addChild(background);
    });

    app.stage.filters = [new MotionBlurFilter([1, 45])];

    this.$store.watch(
      () => this.$store.getters.backgroundImage,
      newBackground => {
        console.log("watched: ", newBackground);
        newBackground = require(`@/assets/stories/${storyId}/images/backgrounds/${newBackground}`);
        loader.load((loader, resources) => {
          const background = new PIXI.Sprite(resources[newBackground].texture);
          background.width = app.renderer.width;
          background.height = app.renderer.height;
          app.stage.addChild(background);
        });
      },
      { deep: true }
    );
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