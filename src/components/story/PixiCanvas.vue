<template>
  <!-- <canvas ref="renderCanvas"></canvas> -->
  <!-- All child <template> elements get added in here -->
  <div id="pixi"></div>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "PixiCanvas",
  data() {
    return {
      //   // These need to be contained in an object because providers are not reactive.
      //   PIXIWrapper: {
      //     // Expose PIXI and the created app to all descendants.
      //     PIXI,
      //     PIXIApp: null
      //   },
      //   // Expose the event bus to all descendants so they can listen for the app-ready event.
      //   EventBus: new Vue()
    };
  },
  // Allows descendants to inject everything.
  // provide() {
  //   return {
  //     PIXIWrapper: this.PIXIWrapper,
  //     EventBus: this.EventBus
  //   };
  // },

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
    // const backgrounds = this.$store.getters.backgrounds[storyId].map(filename =>
    //   require(`@/assets/stories/${storyId}/images/backgrounds/${filename}`)
    // );
    const picture = require(`@/assets/stories/${storyId}/images/backgrounds/${this.$store.getters.backgroundImage}`);
    const texture = PIXI.Texture.from(picture);
    console.log(texture);
    // // app.loader.add(backgrounds).load((loader, resources) => {
    // //   const background = new PIXI.Sprite(resources[""].texture);
    // //   app.stage.addChild(background);
    // // });
    const background = new PIXI.Sprite(texture);
    app.stage.addChild(background);
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