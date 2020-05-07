<template>
  <div>
    <a
      class="gumroad-button"
      :href="gumroadLink"
      target="_blank"
      data-gumroad-single-product="true"
    >Débloquer l'histoire</a>
  </div>
</template>

<script>
export default {
  name: "GumroadOverlayButton",
  mounted() {
    let gumroadScript = document.createElement("script");
    gumroadScript.setAttribute("src", "https://gumroad.com/js/gumroad.js");
    document.head.appendChild(gumroadScript);
  },
  computed: {
    gumroadLink() {
      return (
        "https://gum.co/" +
        this.$store.getters.gumroadPermalink +
        "?wanted=true"
      );
    }
  }
};
</script>

<style scoped lang="scss">
a.gumroad-button {
  //border: 2px red solid;
}
</style>
