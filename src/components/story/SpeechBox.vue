<template>
  <article class="speech">
    <p class="portrait">
      <img
        v-if="this.$store.getters.portrait"
        :src="computedPortrait"
        alt="portrait"
      />
      <strong>{{ speech.character }}</strong>
    </p>

    <p
      class="content"
      v-anime="{
        timeline,
        targets: '.content .letter',
        translateX: [0, 40],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      }"
    >
      {{ speech.content }}
    </p>
  </article>
</template>

<script>
// :src="require(`@/assets/cards/${image}.jpg`)"
export default {
  name: "SpeechBox",
  data() {
    return {
      portrait: this.$store.getters.portrait
    };
  },
  computed: {
    speech() {
      return this.$store.getters.speech;
    },
    computedPortrait() {
      let picture = "default.png";
      if (this.$store.getters.portrait != null) {
        picture = this.$store.getters.portrait;
      }
      return require(`@/assets/stories/${this.$store.getters.storyId}/images/characters/${picture}`);
    }
  }
};
</script>

<style scoped lang="scss">
.speech {
  padding: 1vh;
  padding-left: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  .portrait {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 50px;
    height: 100%;
    width: 20%;
    img {
      width: calc(4vw + 4vh + 4vmin);
      object-fit: cover;
      height: calc(4vw + 4vh + 4vmin);
      margin-bottom: 10px;
      border-radius: 50%;
    }
    strong {
      width: calc(4vw + 4vh + 4vmin);
      font-size: calc(1vw + 1vh + 1vmin);
    }
  }
  .content {
    padding-right: 10%;
    height: 100%;
    width: 70%;
  }
}
</style>
