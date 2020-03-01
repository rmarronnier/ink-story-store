export default {
  state: {
    user: undefined,
    portraits: {},
    storiesBought: ["empty"]
  },
  mutations: {
    setUser: (state, value) => (state.user = value),
    deleteSavedStoryState(state, storyId) {
      state.storyStates[storyId] = null;
    },
    addPortrait(state, portrait) {
      state.portraits[portrait.variable] = portrait.value;
    },
    updateRights(state, rights) {
      state.rights = rights;
    },
    addStoryBought(state, storyId) {
      state.storiesBought.push(storyId);
    }
  },
  actions: {},
  getters: {
    storyState: state => state.storyState,
    isUserLoggedIn: state => !(state.user == null),
    portraits: state => state.portraits
  }
};
