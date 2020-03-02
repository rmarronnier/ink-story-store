<template>
  <main id="StoryMenu">
    <section
      :class="`slide--${storyId}`"
      class="slide teaser-choice"
      v-for="(json, storyId) in stories"
      v-bind:key="json"
      :style="{ 'background-image': `url(${teaserImageUrl(storyId)})` }"
    >
      <h2>{{ storyTitle(json) }}</h2>
      <article>{{ teaserText(json) }}</article>
      <button v-if="storyReady" @click="choose(storyId)">
        Lire {{ storyId }}
      </button>
    </section>
  </main>
</template>

<script>
//import { VueAgile } from "vue-agile"
import getGlobalTagValueFromDownloaded from "@/story/downloaded";
export default {
  name: "StoryMenu",
  components: {
    // agile: VueAgile
  },
  data() {
    return {
      flickityOptions: {
        // prevNextButtons: true,
        // pageDots: true
        // any options from Flickity can be used
      }
    };
  },
  mounted() {},
  computed: {
    stories() {
      return this.$store.getters.downloaded;
    },
    storyReady() {
      return this.$store.getters.allAssetsCached;
    }
  },
  methods: {
    teaserImageUrl(storyId) {
      return require(`@/assets/stories/${storyId}/teaser.jpg`);
    },
    storyTitle(json) {
      return getGlobalTagValueFromDownloaded(json, "title");
    },
    teaserText(json) {
      return getGlobalTagValueFromDownloaded(json, "teaser-texte");
    },
    choose(storyId) {
      this.$store.dispatch("changeStory", storyId).then(() => {
        this.$router.push("story");
      });
      // this.$store.commit("changeStory", story);
    }
  }
};
</script>

<style lang="scss" scoped>
main#storyMenu {
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
  margin: 0;
  padding: 0;
  section.teaser-choice {
    width: 100%;
    //align-items: center;
    color: #fff;
    display: block;
    margin: 0;
    padding: 0;
    //height: 300px;
    //justify-content: center;
    // width: 100%;
    // height: 100%;
    // position: relative;
    // display: block;
    // width: 100%;
    // height: 50%;
    // max-width: 800px;
    button {
      display: block;
      // border-top-left-radius: 100%;
      // position: absolute;
      // bottom: 0;
      // right: 0;
      // width: 200px;
      // height: 200px;
    }
  }
}
</style>
