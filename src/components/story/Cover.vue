<template>
  <div id="cover" v-on:click="continueStory">
    <section id="content" :style="coverStyle">{{ coverContent }}</section>
  </div>
</template>

<script>
export default {
  name: "Cover",
  data() {
    return {};
  },
  methods: {
    continueStory() {
      this.$store.commit("clearCover");
      this.$store.dispatch("continueStory");
    }
  },
  computed: {
    coverStyle() {
      return this.$store.getters.style;
    },
    coverContent() {
      return this.$store.getters.cover;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section#content {
  z-index: 15;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
// #cover {
//   z-index: 15;
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   //   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
// }
</style>
