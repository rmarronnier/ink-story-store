import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VModal from "vue-js-modal";
import Payment from "@/payment/payment";
import VueAnime from "vue-animejs"; //DIRTY better put it deep down the story component if not used elsewhere
import VueTinySlider from "vue-tiny-slider";
import "tiny-slider/src/tiny-slider.scss";

Vue.component("tiny-slider", VueTinySlider);

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(Payment, { gumroad: true });
Vue.use(VueAnime);

new Vue({
  router,
  store,
  VModal,
  Payment,
  render: h => h(App)
}).$mount("#app");
