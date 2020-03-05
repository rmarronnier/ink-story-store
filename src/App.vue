<template>
  <div id="app">
    <!-- Modals -->
    <StartOverConfirmation />
    <AskForPayment />
    <router-view id="view" />
  </div>
</template>

<script>
import StartOverConfirmation from "@/components/story/modals/StartOverConfirmation.vue";
//import AskForPayment from "@/components/payment/modals/AskForPayment.vue";
export default {
  components: {
    StartOverConfirmation
    //AskForPayment
  },
  mounted() {
    this.$store.dispatch("downloadStories");
    this.$store.dispatch("downloadInkEngine");
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  //height: 100vh;
  //width: 100vw;
  overscroll-behavior-y: contain; // TODO ?  : https://www.npmjs.com/package/@wessberg/polyfiller
}

#app {
  overflow-x: hidden;
  //height: 100vh;
  //width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  font-size: calc(1.2vw + 1.2vh + 4vmin);
  text-align: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: rgba(0, 0, 0, 0.5);
  background-color: #f7f7f7;
}
</style>
