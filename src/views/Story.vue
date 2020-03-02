<template>
  <section id="story">
    <Background />
    <TextBox v-if="hasText" />
    <InputModal v-if="inputModalData" />
    <Cover v-if="cover" />
    <InGameMenu class="in-game-menu" />
  </section>
</template>

<script>
import Background from "@/components/story/Background.vue";
import InGameMenu from "@/components/story/InGameMenu.vue";
import TextBox from "@/components/story/TextBox.vue";
import InputModal from "@/components/story/InputModal.vue";
import Cover from "@/components/story/Cover.vue";
import { mapGetters } from "vuex";
export default {
  name: "Story",
  components: {
    InGameMenu,
    Background,
    TextBox,
    InputModal,
    Cover
  },
  beforeCreate() {
    if (
      this.$store.getters.storyId == null ||
      this.$store.getters.currentStory == null
    ) {
      if (this.$store.getters.downloaded == null) {
        this.$store.dispatch("downloadStories");
        this.$store.dispatch("downloadInkEngine");
      }
      //this.$store.dispatch("changeStory", "events-tome-1"); // dirty dirty fix. Should use a default value instead or lastStoryRead
      // console.log("We should really go home");
      // console.log(this.$store.getters.storyId);
      // this.$router.push("/");
    }
  },
  // created() {
  //   if (this.$store.getters.currentStory == null) {
  //     console.log("We should really go home");
  //     this.$router.push("/");
  //   }
  //   this.shouldShowPaymentAskedModal = this.$store.getters.shouldShowPaymentAskedModal;
  // },
  mounted() {
    if (this.$store.getters.isStoryUIready == false) {
      //console.log("We should really go home");
      this.$router.push("/");
    }
    if (this.$store.getters.shouldShowPaymentAskedModal) {
      // TODO : make this a payment plugin
      this.$modal.show("ask-for-payment");
    } else {
      this.$modal.hide("ask-for-payment");
    }
  },
  computed: {
    ...mapGetters([
      "backgroundSound",
      "storyAssetsURL",
      "backgroundImageURL",
      "backgroundSoundURL",
      "inputModalData",
      "cover",
      "hasText",
      "shouldShowPaymentAskedModal" // TODO : make this a payment plugin
    ])
  },
  watch: {
    shouldShowPaymentAskedModal(newValue) {
      // TODO : make this a payment plugin
      if (newValue) {
        this.$modal.show("ask-for-payment");
      } else {
        this.$modal.hide("ask-for-payment");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.background {
  background: rgba(0, 0, 0, 0) no-repeat scroll center center / cover;
  width: 100vw;

  height: 100%;
}
#story {
  user-select: none;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
}

.in-game-menu {
  display: flex;
  flex: 1 1;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
}

.textbox {
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 40%;
  // max-height: 40%;
  overflow-y: auto;
  width: 100%;
  z-index: 10;
  text-align: left;
  position: absolute;
  bottom: 0;
  color: rgb(255, 255, 255);
}

#inputmodal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(99, 160, 240, 0.9);
  position: fixed;
  z-index: 12;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

#cover {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
#input-modal:before {
  filter: blur(10px);
}

.backdrop-filter {
  filter: blur(10px);
}
</style>
