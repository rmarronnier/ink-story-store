/* eslint-disable no-console */

import { register } from "register-service-worker";
import store from "./store";

if (process.env.NODE_ENV != "production") {
  store.commit(`allAssetsCached`, true);
}

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
      store.commit(`allAssetsCached`, true);
      console.log("commiting allassetscached true value to vuex store");
    },
    updatefound() {
      store.commit(`allAssetsCached`, false);
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      // following is not tested yet (it should force the installed pwa to be updated without user action)
      setTimeout(() => {
        store.commit(`allAssetsCached`, true);
        window.location.reload(true);
      }, 1000);
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
