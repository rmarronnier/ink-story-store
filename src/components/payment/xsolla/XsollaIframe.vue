<template>
  <modal
    name="xsolla-iframe"
    transition="nice-modal-fade"
    classes="demo-modal-class"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    :clickToClose="true"
    width="90%"
    height="90%"
  >
    <iframe
      id="xsolla-iframe"
      src="https://sandbox-secure.xsolla.com/paystation2/?access_token=zdpaSiSggsYtuGGM3B2xtlrxM0tg0CSN"
      frameborder="0"
    ></iframe>
  </modal>
</template>

<script>
//import AppData from "@/assets/app.json";
export default {
  name: "XsollaIframe",
  beforeCreate() {},
  mounted() {
    /* eslint-disable */
  }
};
</script>

<style lang="scss">
#xsolla-iframe {
  width: 100%;
  height: 100vh;
}
</style>
