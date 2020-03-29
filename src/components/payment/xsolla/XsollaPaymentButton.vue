<template>
  <div>
    <div id="XS-pay2play-widget"></div>
    <script type="application/javascript">
  /* eslint-disable */
  var options = {
    sandbox: true,
    access_token: "zdpafeuSsPLwmeIeLK3rCCcgQOXhMoFp",
    theme: {
      foreground: "green",
      background: "light"
    },
    lightbox: {
      height: "700px",
      spinner: "round"
    },
    target_element: "#XS-pay2play-widget"
  };
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
    </script>
  </div>
</template>

<script>
export default {
  name: "XsollaPaymentButton"
};
</script>

<style scoped lang="scss">
</style>
