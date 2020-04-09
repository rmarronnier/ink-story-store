//import engine from "@/story/engine";
//import isStoryLicensed from "@/drm/check-story-rights";
import getGlobalTagValue from "@/story/helpers";
import UI from "./ui/ui";

export default {
  modules: {
    ui: UI
  },
  state: {
    downloaded: null,
    inkEngine: null,
    currentStory: null,
    storyId: null
  },
  mutations: {
    saveStories(state, downloaded) {
      state.downloaded = downloaded;
    },
    saveInkEngine(state, inkEngine) {
      state.inkEngine = inkEngine;
    },
    changeStoryId(state, storyId) {
      state.storyId = storyId;
    },
    changeStoryEngine(state, storyEngine) {
      state.currentStory = storyEngine;
    },
    clearCurrentStory(state) {
      state.currentStory = null;
    },
    loadEngineState(state, engineState) {
      state.currentStory.state.LoadJson(engineState);
    },
    resetEngineState(state) {
      state.currentStory.ResetState();
    },
    changeVariable(state, variable) {
      state.currentStory.variablesState[variable.name] = variable.value;
    },
    makeChoice(state, choiceIndex) {
      state.currentStory.ChooseChoiceIndex(choiceIndex);
      // Clear choices
      state.ui.choices = null;
    },
    continueStory(state) {
      state.currentStory.Continue();
    }
  },
  actions: {
    downloadStories({ commit }) {
      import("@/story/json.js").then(downloaded => {
        commit("saveStories", downloaded.default);
      });
    },
    downloadInkEngine({ commit }) {
      import("@/story/engine.js").then(downloaded => {
        commit("saveInkEngine", downloaded.default);
      });
    },
    changeStory({ commit, state }, storyId) {
      commit("changeStoryId", storyId);
      commit(
        "changeStoryEngine",
        new state.inkEngine(state.downloaded[storyId])
      );
    },
    loadStory({ commit, dispatch, state }, storyId) {
      commit("clearCurrentStory");
      commit("clearParagraph");
      commit("clearSpeech");
      commit("clearPortrait");
      commit("clearBackgroundImage");
      commit("clearBackgroundSound");
      commit("clearChoices");
      commit("clearInput");
      commit("clearCover");
      commit("clearStyle");
      commit("clearTags");
      if (state.downloaded == null) {
        dispatch("downloadStories").then(() => {
          dispatch("changeStory", storyId);
        });
      } else {
        dispatch("changeStory", storyId);
      }
    },
    buyStory({ commit, state }) {
      commit("addStoryBought", state.storyId);
      let variable = { name: "storyBought", value: true };
      commit("changeVariable", variable);
    },

    changeVariable({ commit }, variable) {
      if (variable.value != null) {
        commit("changeVariable", variable);
      }
    },

    processCurrentText({ commit, dispatch, state }) {
      const currentText = state.currentStory.currentText.trim();
      // Check if it is not a regular paragraph
      if ([">>>", "!!!", ":::"].some(ident => currentText.includes(ident))) {
        // Check if an input is required
        if (currentText.includes(">>>")) {
          dispatch("processInput", currentText);
        }
        // Check if it is a cover
        if (currentText.includes("!!!")) {
          dispatch("processCover", currentText);
        }
        // Check if it is a speech
        if (currentText.includes(":::")) {
          dispatch("processSpeech", currentText);
        }
      } else {
        commit("clearSpeech");
        commit("clearPortrait");
        commit("clearInput");
        commit("clearCover");
        if (currentText.length > 0) {
          // console.log("non empty paragraphtext : " + currentText + "length : " + currentText.length);
          commit("changeParagraph", currentText);
        } else {
          // console.log("empty paragraphtext : " + currentText);
          dispatch("continueStory");
        }
      }
    },
    processTagsAndTextMarkup({ dispatch }) {
      dispatch("processTags");
      dispatch("processCurrentText");
    },
    submitInput({ commit, dispatch }, input) {
      dispatch("changeVariable", { name: input.variable, value: input.value });
      commit("clearInput");

      dispatch("continueStory");
    },
    continueStory({ commit, dispatch, state }) {
      var story = state.currentStory;
      commit("updateTags", story.currentTags);
      dispatch("processTags");
      if (story.canContinue) {
        commit("continueStory");
        commit("updateTags", story.currentTags);
        dispatch("processTagsAndTextMarkup");
      } else {
        if (story.state.didSafeExit) {
          dispatch("startOver");
        } else {
          dispatch("changeChoices", story.currentChoices);
        }
      }
      commit("storyUIready", true);
    },
    startOver({ commit, dispatch }) {
      commit("resetEngineState");
      dispatch("clearUI");
      //commit("storyUIready", false);
      dispatch("continueStory");
    }
  },
  getters: {
    downloaded: state => state.downloaded,
    currentStory: state => state.currentStory,
    paymentAsked: state => state.currentStory.variablesState["paymentAsked"],
    paymentTeaser: state => state.currentStory.variablesState["paymentTeaser"],
    isStoryBought: state => state.currentStory.variablesState["storyBought"],
    shouldShowPaymentAskedModal: state =>
      !state.currentStory.variablesState["storyBought"] &&
      state.currentStory.variablesState["paymentAsked"],
    isStoryLoaded: state => !(state.currentStory == null),
    storyId: state => state.storyId,
    storyAssetsURL: state => "/assets/stories/" + state.storyId,
    gumroadPermalink: state =>
      getGlobalTagValue(state.currentStory, "gumroad-permalink"),
    xsollaSKU: state => getGlobalTagValue(state.currentStory, "xsolla_sku"),
    storyAuthor: state => getGlobalTagValue(state.currentStory, "author"),
    storyTitle: state => getGlobalTagValue(state.currentStory, "title"),
    storyDescription: state =>
      getGlobalTagValue(state.currentStory, "description")
  }
};
