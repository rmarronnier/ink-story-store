export default {
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    appShortTitle: process.env.VUE_APP_SHORT_TITLE,
    networkOnLine: true,
    SWRegistrationForNewContent: null,
    showAddToHomeScreenModalForApple: false,
    refreshingApp: false,
    currentError: null
  },
  mutations: {
    setNetworkOnline: (state, value) => (state.networkOnLine = value),
    setSWRegistrationForNewContent: (state, value) =>
      (state.SWRegistrationForNewContent = value),
    setShowAddToHomeScreenModalForApple: (state, value) =>
      (state.showAddToHomeScreenModalForApple = value),
    setRefreshingApp: (state, value) => (state.refreshingApp = value),
    setCurrentError: (state, value) => (state.currentError = value)
  },

  actions: {
    // Needed when some components are rendered before service worker fetches cache assets
    updateVueInstance() {
      this.$forceUpdate();
    },
    /**
     * Closes "add to home screen" modal for apple
     */
    closeAddToHomeScreenModalForApple: async ({ commit }) => {
      localStorage.setItem("addToHomeIosPromptLastDate", Date.now());
      commit("setShowAddToHomeScreenModalForApple", false);
    },

    /**
     * Trigger service worker skipWating so the new service worker can take over.
     * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
     */
    serviceWorkerSkipWaiting({ state, commit }) {
      if (state.SWRegistrationForNewContent == null) return;

      commit("setRefreshingApp", true);
      state.SWRegistrationForNewContent.waiting.postMessage("skipWaiting");
    }
  },
  getters: {
    newContentAvailable: state => state.SWRegistrationForNewContent != null,
    networkOnLine: state => state.networkOnLine
  }
};
