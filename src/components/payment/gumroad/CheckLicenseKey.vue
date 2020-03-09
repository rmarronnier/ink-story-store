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
      error: null
    };
  },
  methods: {
    showLicenceForm() {
      this.show = true;
    },
    checkLicenseKey(key) {
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
          if (result.success) {
            this.$store.dispatch("buyStory");
            this.$modal.hide("ask-for-payment");
            //this.choucroute = "Bonne clé, merci !!!";
          } else {
            this.error = "La clé entrée est invalide.";
          }
        })
        .catch(error => {
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
  color: grey;
  text-decoration: none;
}
.licence-form {
  font-size: 20px;
  font-family: "Roboto";
  width: 600px;
  margin: 30px auto 0;
  display: block;
  background: #fff;
  padding: 10px 50px 50px;
  .form-group {
    // position: relative;
    // margin-bottom: 45px;
    display: flex;
    flex-direction: column;
    #input-licence-group {
      margin-top: 15px;
      display: flex;
      justify-content: space-evenly;
      button {
        border: solid black 1px;
        border-radius: 10%;
      }
    }
    input {
      font-size: 18px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 400px;
      border: none;
      border-bottom: 1px solid #757575;
    }
    input::placeholder {
      font-size: 14px;
    }
    input:focus {
      outline: none;
    }
    label {
      margin-bottom: 15px;
      color: #565353;
      font-size: 18px;
      font-weight: normal;
      pointer-events: none;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    /* active state */
    input:focus ~ label,
    input:valid ~ label {
      top: -20px;
      font-size: 14px;
      color: #5264ae;
    }

    /* BOTTOM BARS ================================= */
    .bar {
      position: relative;
      display: block;
      width: 300px;
    }
    .bar:before,
    .bar:after {
      content: "";
      height: 2px;
      width: 0;
      background: #5264ae;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    .bar:before {
      left: 50%;
    }
    .bar:after {
      right: 50%;
    }

    /* active state */
    input:focus ~ .bar:before,
    input:focus ~ .bar:after {
      width: 50%;
    }

    /* HIGHLIGHTER ================================== */
    .highlight {
      height: 60%;
      width: 100px;
      pointer-events: none;
      opacity: 0.5;
    }

    /* active state */
    input:focus ~ .highlight {
      -webkit-animation: inputHighlighter 0.3s ease;
      -moz-animation: inputHighlighter 0.3s ease;
      animation: inputHighlighter 0.3s ease;
    }

    /* ANIMATIONS ================ */
    @-webkit-keyframes inputHighlighter {
      from {
        background: #5264ae;
      }
      to {
        width: 0;
        background: transparent;
      }
    }
    @-moz-keyframes inputHighlighter {
      from {
        background: #5264ae;
      }
      to {
        width: 0;
        background: transparent;
      }
    }
    @keyframes inputHighlighter {
      from {
        background: #5264ae;
      }
      to {
        width: 0;
        background: transparent;
      }
    }
  }
}
</style>
