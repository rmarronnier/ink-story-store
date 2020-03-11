<template>
  <main id="StoryMenu">
    <section
      v-for="(json, storyId) in stories"
      v-bind:key="storyId"
      :style="{ 'background-image': `url(${teaserImageUrl(storyId)})` }"
      class="teaser-choice"
    >
      <h2>{{ storyTitle(json) }}</h2>
      <article>{{ teaserText(json) }}</article>
      <button class="lined thin" @click="choose(storyId)">
        Lire {{ storyId }}
      </button>
    </section>
  </main>
</template>

<script>
import getGlobalTagValueFromDownloaded from "@/story/downloaded";
export default {
  name: "StoryMenu",
  components: {},
  mounted() {},
  computed: {
    stories() {
      return this.$store.getters.downloaded;
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
main#StoryMenu {
  // height: 100%;
  // max-height: 100%;
  // max-width: 100%;
  // overflow: hidden;
  // width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  //position: relative;
  margin: 0;
  padding: 0;
  .teaser-choice {
    width: 100%;
    //align-items: center;
    color: #fff;
    //display: block;
    // margin: 0;
    // padding: 0;
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
      align-self: center;
      background: #f0f0d8;
      //background:transparent;
      padding: 1rem 1rem;
      margin: 0 1rem;
      transition: all 0.5s ease;
      color: #41403e;
      font-size: 2rem;
      letter-spacing: 1px;
      outline: none;
      box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
      /*
      Above is shorthand for:
      border-top-left-radius: 255px 15px;
      border-top-right-radius: 15px 225px;
      border-bottom-right-radius: 225px 15px;
      border-bottom-left-radius:15px 255px;
      */
      &:hover {
        box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
      }
      &.lined.thick {
        border: solid 7px #41403e;
      }
      &.dotted.thick {
        border: dotted 5px #41403e;
      }
      &.dashed.thick {
        border: dashed 5px #41403e;
      }
      &.lined.thin {
        border: solid 2px #41403e;
      }
      &.dotted.thin {
        border: dotted 2px #41403e;
      }
      &.dashed.thin {
        border: dashed 2px #41403e;
      }
    }
  }
}
</style>
