<template>
  <main class="home">
    <header>
      <h1>{{ shortName.toUpperCase() }}</h1>
      <homeMarkdown id="markdown" />
      <img :alt="shortName" src="@/assets/logo.svg" />
    </header>

    <section id="story-menu">
      <StoryMenu v-if="assetsCached" />
      <LoadingScreen v-else />
    </section>

    <footer>
      Histoires créés par
      <a :href="authorURL">{{ authorName }}</a>.
    </footer>
  </main>
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
@import url("https://fonts.googleapis.com/css?family=Lora:700&display=swap");

main.home {
  min-height: 100vh;
  // max-width: 100%;
  // overflow: hidden;
  // width: 100%;
  // display: block;
  // background-color: #493c50ff;

  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 15vh;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    margin: 0;
    h1,
    img {
      margin: 15px;
    }
    h1 {
      //width: 70%;

      background-color: #f49f05;
      color: white;
      font-family: "Lora", serif;
      font-size: calc(1vw + 1vh + 1vmin);
    }
    #markdown {
      //background-color: wheat;
      //flex-direction: column;
      color: black;
      font-size: calc(0.5vw + 0.5vh + 0.5vmin);
      font-family: "Libre Baskerville", serif;
      //text-shadow: 0 1px 1px #fff;
      // line-height: calc(2vw + 2vh + 2vmin);
      //width: 50%;
    }
    img {
      width: 25%;
    }
  }
  #story-menu {
    min-height: 75vh;
    article {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
      margin: 15px;
      padding: 15px;
      min-width: 75%;
    }
  }

  footer {
    //height: 10vh;
    font-size: calc(0.5vw + 0.5vh + 0.5vmin);
    color: white;
  }
}

section {
  display: flex;

  #StoryMenu,
  #LoadingScreen {
    width: 100%;
    margin: 25px;
  }
}
</style>
