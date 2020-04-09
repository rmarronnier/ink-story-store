<template>
  <main class="home">
    <!-- <header>
      <h1>{{ shortName }}</h1>
    </header>-->

    <section id="story-menu">
      <StoryMenu v-if="assetsCached" />
      <LoadingScreen v-else />
    </section>

    <footer>
      Histoires créées par
      <a :href="authorURL">
        <img :alt="authorName" src="@/assets/logo.svg" />
      </a>
    </footer>
  </main>
</template>

<script>
import StoryMenu from "@/components/StoryMenu.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
export default {
  name: "home",
  components: {
    StoryMenu,
    LoadingScreen
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
    // let gumroadScript = document.createElement("script");
    // gumroadScript.setAttribute("src", "https://gumroad.com/js/gumroad.js");
    // document.head.appendChild(gumroadScript);

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
    height: 20vh;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    margin: 0;
    h1 {
      //min-width: fit-content;
      //width: 70%;
      //text-transform: uppercase;
      text-shadow: 1px 1px 1px black;
      margin: 0;
      padding: 15px;
      color: white;
      font-family: "Lora", serif;
      font-size: calc(1vw + 1vh + 1vmin);
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
    font-size: calc(1vw + 1vh + 1vmin);
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: white;
      text-decoration: dotted 1px white;
      img {
        max-width: calc(4vw + 4vh + 4vmin);
      }
    }
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
