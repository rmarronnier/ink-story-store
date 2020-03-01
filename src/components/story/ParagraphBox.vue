<template>
  <article class="paragraph">
    <transition name="fade" mode="out-in">
      <p :key="paragraph">{{ paragraph }}</p>
    </transition>
  </article>
</template>

<script>
export default {
  name: "ParagraphBox",
  data() {
    return {};
  },
  computed: {
    paragraph() {
      return this.$store.getters.paragraph;
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.paragraph {
  padding: 1vh;
  padding-left: 4vh;
  // font-size: 3vh;
}
</style>
