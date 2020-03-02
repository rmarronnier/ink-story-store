<template>
  <modal
    name="ask-for-payment"
    transition="nice-modal-fade"
    classes="demo-modal-class"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    :clickToClose="false"
    width="60%"
    height="auto"
  >
    <article class="size-modal-content">
      <!-- <p>{{ this.$store.getters.paymentTeaser }}</p> -->
      <div v-if="networkOnLine">
        <div class="gumroad-buttons">
          <GumroadOverlayButton />
          <CheckLicenseKey />
        </div>
      </div>
      <div v-else>
        <p>
          Vous n'êtes pas connecté à Internet, veuillez vous connecter pour
          pouvoir débloquer la suite.
        </p>
      </div>
      <div class="modal-buttons">
        <button class="skewBtn blue" @click="goHome">
          Revenir à l'accueil
        </button>
        <button class="skewBtn brick" @click="startOver">
          Recommencer l'histoire
        </button>
      </div>
    </article>
  </modal>
</template>
<script>
import { mapState } from "vuex";
import GumroadOverlayButton from "@/components/payment/gumroad/GumroadOverlayButton.vue";
import CheckLicenseKey from "@/components/payment/gumroad/CheckLicenseKey.vue";
export default {
  name: "AskForPayment",
  components: {
    GumroadOverlayButton,
    CheckLicenseKey
  },
  mounted() {
    /*eslint-disable */
    window.addEventListener("message", message => {
      if (message.origin == "https://gumroad.com") {
        var messageDataObject = JSON.parse(message.data);
        let purchase = {
          email: "",
          licence_key: "",
          permalink: ""
        };

        let success = false;
        if (messageDataObject.hasOwnProperty("email")) {
          purchase.email = messageDataObject.email;
        }
        if (messageDataObject.hasOwnProperty("licence_key")) {
          purchase.licence_key = messageDataObject.licence_key;
        }
        if (messageDataObject.hasOwnProperty("permalink")) {
          purchase.permalink = messageDataObject.permalink;
        }
        if (messageDataObject.hasOwnProperty("success")) {
          success = messageDataObject.success;
        }
        if (success) {
          this.$store.dispatch("buyStory", purchase);
          //show thank you note
          this.$modal.hide("ask-for-payment");
        }
      }
    });
    /*eslint-enable */
  },
  computed: mapState({
    user: state => state.user.user,
    networkOnLine: state => state.app.networkOnLine,
    appTitle: state => state.app.appTitle,
    appShortTitle: state => state.app.appShortTitle
  }),
  methods: {
    buyStory() {
      this.$store.dispatch("buyStory");
      this.$modal.hide("ask-for-payment");
    },
    goHome() {
      //this.$modal.hide("ask-for-payment");
      this.$router.push("/");
      this.$modal.hide("start-over-confirmation");
    },
    startOver() {
      this.$store.dispatch("startOver");
    }
  }
};
</script>
<style>
.size-modal-content {
  padding: 10px;
  font-style: 13px;
}

.v--modal-overlay[data-modal="size-modal"] {
  background: rgba(0, 0, 0, 0.5);
}

.demo-modal-class {
  border-radius: 5px;
  background: #f7f7f7;
  box-shadow: 5px 5px 30px 0px rgba(46, 61, 73, 0.6);
}
</style>
