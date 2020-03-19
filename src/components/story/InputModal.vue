<template>
  <div id="inputmodal">
    <TextInput />
  </div>
</template>

<script>
import TextInput from "@/components/story/input/TextInput.vue";
export default {
  name: "InputModal",
  data() {
    return {};
  },
  components: {
    TextInput
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
}
</style>
