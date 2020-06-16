<template>
  <div>
    <a
      class="gumroad-button"
      :href="gumroadLink"
      data-gumroad-single-product="true"
      >Débloquer l'histoire</a
    >
  </div>
</template>

<script>
export default {
  name: "GumroadOverlayButton",
  mounted() {
    // let gumroadScript = document.createElement("script");
    // gumroadScript.setAttribute("src", "https://gumroad.com/js/gumroad.js");
    // document.head.appendChild(gumroadScript);
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
  background: #f1c40f;
  font-weight: bolder;
  color: black;
  border: 3px solid #fff;
  border-radius: 50px;
  padding: 0.8rem calc(0.8vw + 0.8vh + 0.6vmin);
  font-size: calc(0.8vw + 0.8vh + 0.6vmin);
  outline: none;
  // text-shadow: 1px 1px 1px black;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-decoration: none;
}
</style>
