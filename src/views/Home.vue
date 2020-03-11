<template>
  <div id="home">
    <header>
      <article>
        <homeMarkdown id="markdown" />
      </article>
      <img :alt="shortName" src="@/assets/logo.svg" />
    </header>

    <section>
      <StoryMenu v-if="assetsCached" />
      <LoadingScreen v-else />
    </section>

    <footer>
      Histoires créés par
      <a :href="authorURL">{{ authorName }}</a
      >.
    </footer>
  </div>
</template>

<script>
import homeMarkdown from "@/assets/home.md";
import StoryMenu from "@/components/StoryMenu.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
export default {
  name: "home",
  components: {
    StoryMenu,
    LoadingScreen,
    homeMarkdown
  },
  computed: {
    assetsCached() {
      return (
        this.$store.getters.allAssetsCached &&
        this.$store.getters.downloaded != null
      );
    },
    authorName() {
      return this.$store.getters.appData.authorName;
    },
    authorURL() {
      return this.$store.getters.appData.authorURL;
    },
    shortName() {
      return this.$store.getters.appData.shortName;
    }
  },
  mounted() {
    let gumroadScript = document.createElement("script");
    gumroadScript.setAttribute("src", "https://gumroad.com/js/gumroad.js");
    document.head.appendChild(gumroadScript);

    this.$modal.hide("ask-for-payment");
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap");
//#home {
// height: 100%;
// max-height: 100%;
// max-width: 100%;
// overflow: hidden;
// width: 100%;
// display: block;
// background-color: #493c50ff;
header {
  display: flex;
  width: 100%;
  article {
    padding: 15px;
    min-width: 75%;
    #markdown {
      flex-direction: column;
      color: white;
      font-size: calc(1vw + 1vh + 1vmin);
      font-family: "Libre Baskerville", serif;
      //text-shadow: 0 1px 1px #fff;
      line-height: calc(2vw + 2vh + 2vmin);
      //width: 50%;
    }
  }
  img {
    width: 25%;
  }
}
section {
  display: flex;

  #StoryMenu,
  #LoadingScreen {
    width: 100%;
  }
}
//}
</style>
