<template>
  <div id="home">
    <img alt="Lise Marcy logo" src="@/assets/logo.svg" />
    <StoryMenu v-if="assetsCached" />
    <LoadingScreen v-else />
  </div>
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
      return this.$store.getters.allAssetsCached;
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
