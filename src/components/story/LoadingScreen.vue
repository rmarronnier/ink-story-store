<template>
  <div id="loading-screen">
    <section id="content">
      <img src="@/assets/logo.svg" />
      <p>Chargement de l'histoire...</p>
      <progress class="pure-material-progress-circular" />
    </section>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  data() {
    return {};
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
</style>
