import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VModal from "vue-js-modal";
import Payment from "@/payment/payment";

Vue.config.productionTip = false;

Vue.use(VModal);

Vue.use(Payment, { gumroad: true });

new Vue({
  router,
  store,
  VModal,
  Payment,
  render: h => h(App)
}).$mount("#app");
