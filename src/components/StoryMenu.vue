<template>
  <main id="StoryMenu">
    <section
      v-for="(json, storyId) in stories"
      v-bind:key="storyId"
      :style="{ 'background-image': `url(${teaserImageUrl(storyId)})` }"
      class="teaser-choice"
    >
      <article>
        <h2>{{ storyTitle(json) }}</h2>
        <p>{{ teaserText(json) }}</p>
        <button class="lined thin" @click="choose(storyId)">
          Lancer l'histoire
        </button>
      </article>
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
  justify-content: space-around;
  text-align: center;
  //position: relative;
  margin: 0;
  padding: 0;
  .teaser-choice {
    //flex-shrink: 0.3;
    border-radius: 5%;
    flex-basis: 40%;
    flex-grow: 1.2;
    margin: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    justify-content: space-between;
    color: #fff;
    display: flex;
    flex-direction: column;

    article {
      border-radius: 5%;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.22);
      text-align: left;
      flex-grow: 2;
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      h2,
      p {
        width: fit-content;
        font-size: calc(1vw + 1vh + 1vmin);
      }
      h2 {
        display: inline-block;
        //width: 173px;
        margin: 0 10px;
        position: relative;
        transform: skewy(-3deg);
        backface-visibility: hidden;
        transition: 200ms all;
        font-size: 125%;
        background: #fff;
        padding: 2px 10px;
        color: #333;
        text-align: center;
        text-decoration: none;
        position: relative;
        z-index: 1;
        text-shadow: 1px 1px 0px #fff, 2px 2px 0px #999, 3px 3px 0px #fff;
        background-image: linear-gradient(
          top,
          transparent 0%,
          rgba(0, 0, 0, 0.05) 100%
        );
        transition: 1s all;
        background-image: linear-gradient(
          left top,
          transparent 0%,
          transparent 25%,
          rgba(0, 0, 0, 0.15) 25%,
          rgba(0, 0, 0, 0.15) 50%,
          transparent 50%,
          transparent 75%,
          rgba(0, 0, 0, 0.15) 75%
        );
        background-size: 4px 4px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4) inset,
          0 0 20px -5px rgba(0, 0, 0, 0.4), 0 0 0px 3px #fff inset;
      }
      p {
        text-shadow: black 1px 1px 1px;
      }
    }
    button {
      align-self: flex-end;
      background: #4b4b2d96;
      //background:transparent;
      padding: 1rem 1rem;
      margin: 20px;
      transition: all 0.5s ease;
      color: white;
      outline: none;
      box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
      border-radius: 10%;
      font-weight: bolder;
      font-size: calc(1vw + 1vh + 2vmin);
      text-shadow: black 1px 1px 1px;
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
        //border: solid 2px #41403e;
        border: solid 4px white;
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
