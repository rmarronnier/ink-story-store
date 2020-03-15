<template>
  <div id="home">
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
@import url("https://fonts.googleapis.com/css?family=Lora:700&display=swap");
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
  justify-content: space-between;
  height: 15vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin: 15px;
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
  height: 75vh;
  article {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    margin: 15px;
    padding: 15px;
    min-width: 75%;
    // background-color: #a87bec;
    // background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bba6dd' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}

footer {
  height: 10vh;
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
