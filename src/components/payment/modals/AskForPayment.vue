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
          <div v-if="!userEmail">
            <label for="xsolla-email"
              >Veuillez entrer votre email pour débloquer la suite de l'histoire
              :</label
            >
            <input
              type="email"
              name="xsolla-email"
              id="xsolla-email"
              v-model="email"
            />
            <button v-if="!gettingToken" @click="submitEmail"></button>
            <progress
              v-if="gettingToken"
              class="pure-material-progress-circular"
            />
          </div>
          +
          <button v-if="token" @click="xsollaPayment">
            Acheter maintenant
          </button>
          <!-- <GumroadOverlayButton /> -->
          <!-- <div id="xl_auth" style="height: 700px"></div> -->
          <!-- <XsollaPaymentButton /> -->
          <!-- <XsollaIframe /> -->
          <!-- <CheckLicenseKey /> -->
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
//import AppData from "@/assets/app.json";
import { mapState } from "vuex";
import getXsollaToken from "@/xsolla/token.js";
//import GumroadOverlayButton from "@/components/payment/gumroad/GumroadOverlayButton.vue";
//import XsollaPaymentButton from "@/components/payment/xsolla/XsollaPaymentButton.vue";
//import { Widget } from "@xsolla-login/sdk";
//import CheckLicenseKey from "@/components/payment/gumroad/CheckLicenseKey.vue";
export default {
  name: "AskForPayment",
  components: {
    //GumroadOverlayButton,
    //CheckLicenseKey,
    //XsollaPaymentButton,
    //XsollaIframe
  },
  data() {
    return {
      email: this.$store.getters.email,
      token: null,
      gettingToken: false
    };
  },
  mounted() {
    /*eslint-disable */
    window.addEventListener("message", message => {
      //console.log(message);
      if (message.origin == "https://sandbox-secure.xsolla.com") {
        console.log(message.data);
        const messageDataObject = JSON.parse(message.data);
        if (messageDataObject.hasOwnProperty("action")) {
          console.log("ACTIONNNNNN");
          if (messageDataObject.action == "complete") {
            console.log("DONNNE");

            this.$store.dispatch("buyStory");
            //show thank you note
            this.$modal.hide("ask-for-payment");
          }
        }
      }
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
    appShortTitle: state => state.app.appShortTitle,
    userEmail: state => state.user.email
  }),
  methods: {
    buyStory() {
      this.$store.dispatch("buyStory");
      this.$modal.hide("ask-for-payment");
      this.$modal.hide("xsolla-frame");
    },
    goHome() {
      //this.$modal.hide("ask-for-payment");
      this.$router.push("/");
      this.$modal.hide("start-over-confirmation");
    },
    startOver() {
      this.$store.dispatch("startOver");
    },
    submitEmail() {
      this.$store.commit("setEmail", this.email);
      const url =
        "https://us-central1-lise-story.cloudfunctions.net/xsollaTokenGeneration";
      this.gettingToken = true;
      getXsollaToken(url, this.email)
        .then(response => response.json())
        .then(result => {
          this.$store.commit("xsollaToken", result.token);
          this.gettingToken = false;
        })
        .catch(error => {
          this.gettingToken = false;
          console.error(error);
        });
    }
  },
  xsollaPayment() {
    this.$modal.show("xsolla-iframe");
  }
};
</script>
<style lang="scss">
@import "@/theme/app/modals/modals.scss";
</style>
