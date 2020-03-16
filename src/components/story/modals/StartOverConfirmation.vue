<template>
  <modal
    name="start-over-confirmation"
    transition="nice-modal-fade"
    classes="demo-modal-class"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="auto"
  >
    <article class="size-modal-content">
      <p>Souhaitez-vous recommencer l'histoire au début ?</p>
      <div class="modal-buttons">
        <button class="skewBtn brick" @click="startOver">Recommencer</button>
        <button class="skewBtn blue" @click="close">Non, je continue</button>
      </div>
    </article>
  </modal>
</template>
<script>
export default {
  name: "StartOverConfirmation",
  methods: {
    startOver() {
      this.$store.dispatch("startOver");
      this.$modal.hide("start-over-confirmation");
    },
    close() {
      this.$modal.hide("start-over-confirmation");
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/theme/app/modals/modals.scss";
// .size-modal-content {
//   padding: 10px;
//   font-style: 13px;
// }

// .v--modal-overlay[data-modal="size-modal"] {
//   background: rgba(0, 0, 0, 0.5);
// }

// .demo-modal-class {
//   border-radius: 5px;
//   background: #f7f7f7;
//   box-shadow: 5px 5px 30px 0px rgba(46, 61, 73, 0.6);
// }
</style>
