<template>
  <div class="choicebox">
    <button
      v-for="(choice, index) in choices"
      :key="index"
      v-on:click="makeChoice(index)"
    >
      {{ choice }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ChoiceBox",
  data() {
    return {};
  },
  computed: {
    choices() {
      return this.$store.state.stories.ui.choices;
    }
  },
  methods: {
    makeChoice(choice) {
      this.$store.commit("makeChoice", choice);
      //this.$store.dispatch("saveCurrentStoryState");
      //this.$store.dispatch("continueStory");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  display: inline-block;

  margin: 0 0.3em 0.3em 0;
  border: 0.16em solid #ffffff;
  padding: 0.5em;
  box-sizing: border-box;
  border-radius: 0.5em;
  color: #ffffff;
  transition: all 0.15s;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.5);
  overflow: visible;
  //font-size: 2vw;
  font-size: calc(1.5vw + 1.5vh + 0.5vmin);
  text-align: center;
}
button:hover {
  color: #dddddd;
  border-color: #dddddd;
}
.choicebox {
  span {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  display: flex;
  justify-content: space-around;
}
</style>
