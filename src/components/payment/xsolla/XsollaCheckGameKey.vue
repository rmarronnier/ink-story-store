<template>
  <div id="licence-form">
    <a id="licence-form-show" @click="showLicenceForm"
      >Vous avez déjà acheté cette histoire ?</a
    >

    <div class="licence-form" v-if="show">
      <div class="form-group">
        <label for="license-key">
          Veuillez entrer votre code d'activation qui vous a été envoyée par
          Xsolla sur votre adresse email.
        </label>
        <div id="input-licence-group">
          <input
            type="text"
            autofocus
            placeholder="Exemple: 3028b8ee-be4e-41f7-a09f-87471933f5ba"
            name="license-key"
            v-model="key"
          />
          <button @click="checkGameKey(key)">Envoyer</button>
          <progress v-if="checking" class="pure-material-progress-circular" />
        </div>
      </div>

      <p class="error-message">{{ error }}</p>
      <!-- <a href="https://gumroad.com/license-key-lookup" target="_blank"
      >Clé de license oubliée ou perdue ?</a-->
    </div>
  </div>
</template>

<script>
export default {
  name: "XsollaCheckGameKey",
  data() {
    return {
      show: false,
      key: null,
      error: null,
      checking: false
    };
  },
  methods: {
    showLicenceForm() {
      this.show = true;
    },
    checkGameKey(key) {
      this.error = null;
      this.checking = true;
      const url =
        "https://us-central1-lise-story.cloudfunctions.net/checkXsollaGameKeyEndpoint";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          project_id: this.$store.getters.appData.xsolla_project_id,
          gamekey: key,
          user_id: this.$store.getters.email,
          sku: this.$store.getters.xsollaSKU
        }),
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
            this.$modal.hide("xsolla-iframe");
            //this.choucroute = "Bonne clé, merci !!!";
          } else {
            this.error = "La clé entrée est invalide.";
          }
        })
        .catch(error => {
          this.checking = false;
          this.error =
            "Nous avons rencontré une erreur technique,  veuillez nous en excuser." +
            error;
        });
    }
  }
};
</script>

<style scoped lang="scss">
a#licence-form-show {
  font-size: 14px;
  color: #604e4e;
  text-decoration: underline;
}
.licence-form {
  font-size: 20px;
  font-family: "Roboto";
  background: #fff;
  padding: 10px 20px 20px;

  .form-group {
    // position: relative;
    // margin-bottom: 45px;
    // display: flex;
    // flex-direction: column;
    #input-licence-group {
      margin-top: 15px;
      display: flex;
      justify-content: space-evenly;
      flex-flow: wrap;
      button {
        color: #757575;
        font-weight: bolder;
        background-color: transparent;
        border-bottom: solid 1px;
        flex-grow: 1;
        padding: 10px 10px 10px 5px;
        // border: solid black 1px;
        // border-radius: 10%;
      }
      @import "@/theme/app/progress.scss";
    }
    input {
      padding: 10px 10px 10px 5px;
      border-bottom: 1px solid #757575;
      flex-grow: 2;
    }
    input::placeholder {
      font-size: 14px;
    }
    input:focus {
      outline: none;
    }
    label {
      color: #565353;
      font-size: calc(1vw + 1vh + 0.5vmin);
    }
    /* active state */
    input:focus ~ label,
    input:valid ~ label {
      top: -20px;
      font-size: 14px;
      color: #5264ae;
    }
  }
}
</style>
