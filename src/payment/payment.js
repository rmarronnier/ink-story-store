// https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
// https://vuejs.org/v2/guide/plugins.html
import AskForPayment from "@/components/payment/modals/AskForPayment.vue";

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// This exports the plugin object.
export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue, options) {
    // Add or modify global methods or properties.
    //Vue.yourMethod = (value) => value
    // Add a component or directive to your plugin, so it will be installed globally to your project.
    Vue.component("AskForPayment", AskForPayment);
    // Add `Vue.mixin()` to inject options to all components.
    Vue.mixin({
      // Add component lifecycle hooks or properties.
      created() {
        //console.log("Hello from created hook!");
      }
    });
    // Add Vue instance methods by attaching them to Vue.prototype.
    Vue.prototype.$myProperty = "This is a Vue instance property.";
  }
};
