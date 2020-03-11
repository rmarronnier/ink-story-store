<template>
  <main id="loading-screen">
    <!-- <img src="@/assets/logo.svg
    " alt />-->
    <p>Les histoires sont en train d'être téléchargées...</p>
    <progress class="pure-material-progress-circular" />
  </main>
</template>
<script>
export default {
  name: "LoadingScreen"
};
</script>
<style lang="scss">
body {
  margin: 0;
}

#loading-screen {
  background-color: #63ab97;
  color: white;
  font-size: 32px;
  padding-top: 10vh;
  height: 100vh;
  text-align: center;
  @import "@/theme/app/progress.scss";
}
</style>
