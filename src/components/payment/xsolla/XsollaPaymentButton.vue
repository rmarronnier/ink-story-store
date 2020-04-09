<template>
  <section>
    <div id="XS-pay2play-widget"></div>
  </section>
</template>

<script>
//import AppData from "@/assets/app.json";
export default {
  name: "XsollaPaymentButton",
  beforeCreate() {},
  mounted() {
    /* eslint-disable */
    var options = {
      sandbox: false,
      access_token: "zdpazHmA4KUsPookTDIOSGyQbGYhee8S",
      theme: {
        foreground: "green",
        background: "light"
      },
      lightbox: {
        height: "700px",
        spinner: "round"
      },
      childWindow: { target: "_self" },
      target_element: "#XS-pay2play-widget"
    };
    // var options = {
    //   sandbox: true,
    //   access_data: {
    //     settings: {
    //       mode: "sandbox",
    //       project_id: AppData.xsolla_project_id,
    //       ui: {
    //         size: "medium"
    //       }
    //     },
    //     purchase: {
    //       pin_codes: {
    //         codes: [{ digital_content: this.$store.getters.xsollaId }]
    //       }
    //     },
    //     user: {
    //       country: {
    //         allow_modify: false
    //       }
    //     }
    //   },
    //   theme: {
    //     foreground: "green",
    //     background: "dark"
    //   },
    //   lightbox: {
    //     height: "700px",
    //     spinner: "round"
    //   },
    //   //childWindow: { target: "_self" },
    //   target_element: "#XS-pay2play-widget"
    // };
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.xsolla.net/embed/pay2play/2.3.0/widget.min.js";
    s.addEventListener(
      "load",
      function(e) {
        var widgetInstance = XPay2PlayWidget.create(options);
      },
      false
    );
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(s);
  }
};
</script>

<style lang="scss">
.xpay2Play-widget {
  margin: auto;
}
</style>
