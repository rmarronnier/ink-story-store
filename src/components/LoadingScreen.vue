<template>
  <main id="loading-screen">
    <p>Les histoires sont en train d'être téléchargées...</p>
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

#loading {
  background-color: #63ab97;
  color: white;
  font-size: 32px;
  padding-top: 10vh;
  height: 100vh;
  text-align: center;
}
</style>
