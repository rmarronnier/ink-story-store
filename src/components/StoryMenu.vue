<template>
  <main id="StoryMenu">
    <agile
      v-if="stories != null"
      class="main"
      ref="main"
      :options="options1"
      :as-nav-for="asNavFor1"
    >
      <div
        class="slide teaser-choice"
        v-for="(json, storyId) in stories"
        v-bind:key="storyId"
        :style="{ 'background-image': `url(${teaserImageUrl(storyId)})` }"
      >
        <h2>{{ storyTitle(json) }}</h2>
        <!-- <article>{{ teaserText(json) }}</article> -->
        <button class="lined thin" @click="choose(storyId)">Lire {{ storyId }}</button>
      </div>
    </agile>
    <agile class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
      <div
        class="slide slide--thumbnail"
        v-for="(json, storyId) in stories"
        v-bind:key="storyId"
        @click="$refs.thumbnails.goTo(asNavFor1.indexOf(storyId))"
      >
        <img :src="teaserImageUrl(storyId)" />
      </div>
      <template slot="prevButton">
        <i class="fas fa-chevron-left"></i>
      </template>
      <template slot="nextButton">
        <i class="fas fa-chevron-right"></i>
      </template>
    </agile>
  </main>
</template>

<script>
import { VueAgile } from "vue-agile";
// import VueSlickCarousel from "vue-slick-carousel";
// optional style for arrows & dots
//import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import getGlobalTagValueFromDownloaded from "@/story/downloaded";
export default {
  name: "StoryMenu",
  components: {
    agile: VueAgile
    // VueSlickCarousel
  },
  data() {
    return {
      //stories: this.$store.getters.downloaded,
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false,
        speed: 2500
      },

      options2: {
        autoplay: true,
        // autoplaypeed: 3000,
        // speed: 2500,
        // fade: true,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  },
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
  display: block;
  text-align: center;
  //position: relative;
  margin: 0;
  padding: 0;
  .teaser-choice {
    width: 100%;
    //align-items: center;
    background-size: cover;
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

  .main {
    margin-bottom: 30px;
  }

  .thumbnails {
    margin: 0 -5px;
    width: calc(100% + 10px);
  }

  .agile__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .thumbnails .agile__nav-button {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .thumbnails .agile__nav-button--prev {
    left: -45px;
  }
  .thumbnails .agile__nav-button--next {
    right: -45px;
  }
  .agile__nav-button:hover {
    color: #888;
  }
  .agile__dot {
    margin: 0 10px;
  }
  .agile__dot button {
    background-color: #eee;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 10px;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    width: 10px;
  }
  .agile__dot--current button,
  .agile__dot:hover button {
    background-color: #888;
  }

  .slide {
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    color: #fff;
    display: -webkit-box;
    display: flex;
    height: 450px;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .slide--thumbnail {
    cursor: pointer;
    height: 100px;
    padding: 0 5px;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
  }
  .slide--thumbnail:hover {
    opacity: 0.75;
  }
  .slide img {
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
    width: 100%;
  }
}
</style>
