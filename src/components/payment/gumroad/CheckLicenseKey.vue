<template>
  <div id="licence-form">
    <a id="licence-form-show" @click="showLicenceForm"
      >Vous avez déjà acheté cette histoire ?</a
    >

    <div class="licence-form" v-if="show">
      <div class="form-group">
        <label for="license-key">
          Veuillez entrer votre clé de licence qui vous a été envoyée par
          Gumroad sur votre adresse email.
        </label>
        <div id="input-licence-group">
          <input
            type="text"
            autofocus
            placeholder="Exemple: 6780F25E-A1BD4634-AF81DCA9-6A22EEBE"
            name="license-key"
            v-model="key"
          />
          <button @click="checkLicenseKey(key)">Envoyer</button>
          <progress v-if="checking" class="pure-material-progress-circular" />
        </div>
      </div>

      <p class="error-message">{{ error }}</p>
      <a href="https://gumroad.com/license-key-lookup" target="_blank"
        >Clé de license oubliée ou perdue ?</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckLicenseKey",
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
    checkLicenseKey(key) {
      this.error = null;
      this.checking = true;
      const url =
        "https://us-central1-lise-story.cloudfunctions.net/checkGumroadLicenseKeyEndpoint";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          product_permalink: this.$store.getters.gumroadPermalink,
          license_key: key
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
a {
  font-size: 14px;
  color: #604e4e;
  text-decoration: none;
}
.licence-form {
  font-size: 20px;
  font-family: "Roboto";
  background: #fff;
  padding: 10px 50px 50px;
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
