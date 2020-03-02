<template>
  <div id="home">
    <!-- <img alt="Lise Marcy logo" src="@/assets/logo.svg" /> -->
    <StoryMenu />
  </div>
</template>

<script>
import StoryMenu from "@/components/StoryMenu.vue";
export default {
  name: "home",
  components: {
    StoryMenu
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
}
</style>
