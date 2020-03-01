<template>
  <article class="textbox" v-on:click="continueStory">
    <ParagraphBox v-if="paragraph"></ParagraphBox>
    <SpeechBox v-if="speech"></SpeechBox>
    <transition name="bounce">
      <ChoiceBox v-if="choices" />
    </transition>
  </article>
</template>

<script>
import ParagraphBox from "@/components/story/ParagraphBox.vue";
import SpeechBox from "@/components/story/SpeechBox.vue";
import ChoiceBox from "@/components/story/ChoiceBox.vue";
export default {
  name: "TextBox",
  components: {
    ParagraphBox,
    SpeechBox,
    ChoiceBox
  },
  data() {
    return {};
  },
  methods: {
    continueStory() {
      this.$store.dispatch("continueStory");
    }
  },
  computed: {
    paragraph() {
      return this.$store.getters.paragraph != null;
    },
    speech() {
      return this.$store.getters.speech != null;
    },
    choices() {
      return this.$store.getters.choices != null;
    }
  }
};
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
