<template>
  <div>
    <div class="gumroad-product-embed" data-gumroad-product-id="HWRx">
      <a href="https://gumroad.com/HWRx">Loading...</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "GumroadEmbed",

  mounted() {
    let gumroadScript = document.createElement("script");
    gumroadScript.setAttribute(
      "src",
      "https://gumroad.com/js/gumroad-embed.js"
    );
    document.head.appendChild(gumroadScript);
  }
};
</script>

<style scoped lang="scss"></style>
