<template>
  <modal
    name="xsolla-iframe"
    @before-open="beforeOpen"
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
    <iframe id="xsolla-iframe" :src="iframeSrc" frameborder="0"></iframe>
  </modal>
</template>

<script>
//import AppData from "@/assets/app.json";
export default {
  name: "XsollaIframe",
  data() {
    return {
      token: null
    };
  },
  computed: {
    iframeSrc() {
      return (
        "https://secure.xsolla.com/paystation2/?access_token=" + this.token
      );
    }
  },
  methods: {
    beforeOpen(event) {
      this.token = event.params.token;
    }
  },
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
