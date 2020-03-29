<template>
  <div>
    <div id="XS-pay2play-widget"></div>
    <script type="application/javascript">
  /* eslint-disable */
  var options = {
    access_data: {
      settings: {
        mode: "sandbox",
        project_id: 53121
      },
      purchase: {
        pin_codes: {
          codes: [{ digital_content: "lise-marcy-events-tome-1" }]
        }
      },
      user: {
        country: {
          allow_modify: false
        }
      }
    },
    theme: {
      foreground: "green",
      background: "light"
    },
    lightbox: {
      height: "700px",
      spinner: "round"
    },
    target_element: "#XS-pay2play-widget",
    access_token: ""
  };
  const merchant_id = 128642;
  const url =
    "https://api.xsolla.com/merchant/v2/merchants/" + merchant_id + "/token";
  const data = JSON.stringify({
    user: { id: { value: "choucroute" } }
  });
  fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(result => {
      this.checking = false;
      if (result.success) {
        this.$store.dispatch("buyStory");
        this.$modal.hide("ask-for-payment");
        //this.choucroute = "Bonne clé, merci !!!";
      } else {
        this.error = "La clé entrée est invalide.";
      }
    });

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
