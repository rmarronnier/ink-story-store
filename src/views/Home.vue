<template>
  <div id="home">
    <img :alt="shortName" src="@/assets/logo.svg" />
    <article>
      <homeMarkdown id="markdown" />
    </article>

    <StoryMenu v-if="assetsCached" />
    <LoadingScreen v-else />
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
      return this.$store.getters.allAssetsCached;
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
#markdown {
  color: white;
}
#home {
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100%;
  display: block;
  text-align: center;
  background-color: #493c50ff;
}
</style>
