import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import storyStateSaver from "./plugins/story-state-saver";
import storyStateLoader from "./plugins/story-state-loader";
import Stories from "./stories/stories";
import User from "./user/user";
import App from "./app/app";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  key: "appShortName",
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    app: state.app
    // TODO : adds state.stories.downloaded
  })
});

export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production',

  modules: {
    stories: Stories,
    user: User,
    app: App
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [vuexLocal.plugin, storyStateSaver, storyStateLoader]
});
