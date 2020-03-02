<template>
  <div class="in-game-menu">
    <GumroadOverlayButton id="gumroad" v-if="showGumroadButton" />
    <button @click="askConfirmation">
      <img
        width="36px"
        src="@/assets/reset-story-24px.svg"
        alt="Recommencer l'histoire"
      />
      Recommencer
    </button>
    <button @click="goHome">
      <img width="36px" src="@/assets/home-24px.svg" alt="Accueil" />
      Accueil
    </button>
  </div>
</template>

<script>
import GumroadOverlayButton from "@/components/payment/gumroad/GumroadOverlayButton.vue";
export default {
  name: "InGameMenu",
  data() {
    return {};
  },
  components: {
    GumroadOverlayButton
  },
  computed: {
    showGumroadButton() {
      return (
        !this.$store.getters.isStoryBought && this.$store.getters.networkOnLine
      );
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    askConfirmation() {
      //this.$modal.show("ask-for-payment");
      this.$modal.show("start-over-confirmation");
    },
    hide() {
      //this.$modal.hide("ask-for-payment");
      this.$modal.hide("start-over-confirmation");
    }
  }
};
</script>

<style lang="scss" scoped>
// .choucroute {
//   z-index: 3500;
// }
// .v-speed-dial {
//   position: absolute;
// }

// .v-btn--floating {
//   position: relative;
// }
.in-game-menu {
  display: flex;
  flex: 1 1;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  //max-height: 15%;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.404);
    //background-color: rgba(0, 0, 0, 0.3);
    color: rgb(255, 255, 255);
    border: none;
    margin: 10px;
    padding: 10px;
    border-radius: 10%;
    font-size: calc(0.5vw + 0.5vh + 0.5vmin);
    transition: 0.4s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.26);
    //max-height: 50px;
  }
  button:hover {
    transition: 0.4s;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.26);
  }
  button:active {
    transition: 0.2s;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  }
  #gumroad {
    // max-height: 50px;
    display: flex;
    a.gumroad-button {
      background-color: rgba(0, 0, 0, 0.3) !important;
      transition: 0.4s;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.26);
    }
  }
}
</style>
