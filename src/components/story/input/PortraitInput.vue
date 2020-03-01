<template>
  <div class="portrait-input">
    <croppa
      v-model="myCroppa"
      :width="350"
      :height="350"
      :placeholder="input.question"
    ></croppa>
    <button @click="submitPortrait(input.variable)">Valider</button>
  </div>
</template>

<script>
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
export default {
  name: "PortraitInput",
  data: function() {
    return {
      myCroppa: {}
    };
  },
  components: {
    Croppa
  },
  computed: {
    input() {
      return this.$store.state.stories.input;
    }
  },
  methods: {
    submitPortrait(variableName) {
      this.myCroppa.generateBlob(
        blob => {
          // write code to upload the cropped image file (a file is a blob)
          this.$store.commit("addPortrait", {
            variable: variableName,
            value: blob
          });
          this.$store.dispatch("changeVariable", {
            name: variableName,
            value: variableName
          });
          //this.$store.dispatch("saveCurrentStoryState");
          this.$store.commit("clearInput");
          this.$store.dispatch("continueStory");
        },
        "image/jpeg",
        0.8
      ); // 80% compressed jpeg file
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.portrait-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .croppa-container {
    margin-bottom: 50px;
  }
  button {
    margin: auto;
  }
}
</style>
