<template>
  <div id="background">
    <transition name="fade" mode="out-in">
      <PixiCanvas v-if="test" />
      <!-- <img
        v-if="this.$store.getters.backgroundImage != null"
        :src="backgroundImageURL"
        :key="backgroundImageURL"
        alt="background image"
      />-->
      <video
        v-else-if="this.$store.getters.backgroundVideo != null"
        :src="backgroundVideoURL"
        :key="backgroundVideoURL"
      ></video>
    </transition>
    <audio
      v-if="this.$store.getters.backgroundSound != null"
      autoplay
      loop
      :src="backgroundSoundURL"
      :key="backgroundSoundURL"
    ></audio>
  </div>
</template>

<script>
import PixiCanvas from "@/components/story/PixiCanvas.vue";

export default {
  name: "Background",
  components: {
    PixiCanvas
  },
  data() {
    return {
      test: true
    };
  },
  computed: {
    backgroundImageURL() {
      let storyId = this.$store.getters.storyId;
      let picture = "default.jpg";
      if (this.$store.getters.backgroundImage != null) {
        picture = this.$store.getters.backgroundImage;
      }
      return require(`@/assets/stories/${storyId}/images/backgrounds/${picture}`);
    },
    backgroundSoundURL() {
      let storyId = this.$store.getters.storyId;
      let sound = "";
      if (this.$store.getters.backgroundSound != null) {
        sound = this.$store.getters.backgroundSound;
      }
      return require(`@/assets/stories/${storyId}/sounds/backgrounds/${sound}`);
    },
    backgroundVideoURL() {
      let storyId = this.$store.getters.defaultStoryId;
      if (this.$store.getters.storyId != null) {
        storyId = this.$store.getters.storyId;
      }
      let video = this.$store.getters.backgroundVideo;
      return require(`@/assets/stories/${storyId}/videos/backgrounds/${video}`);
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 1.5s ease-in-out;
  //animation: fade-in 2s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
// .fade-out-active {
//   //animation: fade-out 2s;
// }

#background {
  z-index: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  img {
    /* Set rules to fill background */
    min-height: 100%;
    min-width: 1024px;
    /* Set up proportionate scaling */
    width: 100%;
    height: auto;
  }
  video {
    /* Set rules to fill background */
    min-height: 100%;
    min-width: 1024px;
    /* Set up proportionate scaling */
    width: 100%;
    height: auto;
  }
}
</style>
