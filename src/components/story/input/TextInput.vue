<template>
  <form
    id="textInput"
    class="input-modal-content TextInput"
    @submit.prevent="submitInput(inputValue, input.variable)"
  >
    <label for="input1">{{ input.question }}</label>
    <input
      autofocus
      name="input1"
      maxlength="10"
      type="text"
      v-model="inputValue"
      :placeholder="defaultValue"
    />
    <button type="submit" form="textInput">Valider</button>
  </form>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      inputValue: null
    };
  },
  computed: {
    input() {
      return this.$store.state.stories.ui.input;
    },
    defaultValue() {
      return this.$store.state.stories.currentStory.variablesState[
        this.input.variable
      ];
    }
  },
  methods: {
    submitInput(value, variableName) {
      if (value == null) {
        value = this.$store.state.stories.currentStory.variablesState[
          this.input.variable
        ];
      }
      this.$store.dispatch("submitInput", {
        variable: variableName,
        value: value
          .trim()
          .replace(">>>", "")
          .replace("[!!!]", "")
          .replace(":::", "") // DIRTY sanitizer
      });
      this.inputValue = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form.input-modal-content:before {
  filter: blur(10px);
}
form.input-modal-content {
  z-index: 15;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  label {
    display: flex;
    font-size: 4vh;
    color: #ffffff;
  }
  input {
    display: flex;
    margin: 0 0.3em 0.3em 0;
    border: 0.16em solid #ffffff;
    padding: 0.5em;
    box-sizing: border-box;
    border-radius: 0.5em;
    color: #0e0c0c;
    transition: all 0.15s;
    text-decoration: none;
    width: 60%;
    height: 10vh;
    overflow: visible;
    font-size: 6vw;
    text-align: center;
  }
  input:hover {
    border-color: #dddddd;
  }
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
}
</style>
